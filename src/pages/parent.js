// src/pages/parent.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth }   from '../lib/AuthContext'
import {
  addChild, updateChild,
  addDevoir, getDevoirs, toggleDevoir, deleteDevoir,
  getAllResults,
} from '../lib/db'
import { SUBJECTS } from '../lib/questions'
import Layout from '../components/Layout'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

const PROGRAM = {
  jade: [
    { subj:'Maths 6e', items:[['ok','Nombres entiers · opérations'],['ok','Multiplication posée'],['wip','Fractions · décimaux (en cours)'],['wip','Géométrie : angles, périmètres'],['todo','Données : tableaux, graphiques']] },
    { subj:'Français 6e', items:[['ok','Lecture textes variés'],['ok','Grammaire : classes de mots, conjugaison'],['wip','Accord sujet-verbe · GN (en cours)'],['wip','Rédaction : récit de création (en cours)'],['todo','Figures de style · argumentation']] },
    { subj:'Anglais LV1', items:[['ok','Se présenter, famille, goûts'],['wip','Vocabulaire : école, maison (en cours)'],['todo','Structures : I like, Have got, présent simple']] },
    { subj:'Histoire-Géo', items:[['ok','Préhistoire, premières civilisations'],['wip','Grèce antique : cité, démocratie (en cours)'],['todo','Rome · Géo : milieux naturels']] },
    { subj:'Sciences', items:[['ok','Biodiversité et classification'],['wip','La cellule : unité du vivant (en cours)'],['todo','Matière, énergie · Système solaire']] },
  ],
  hugo: [
    { subj:'Maths CE2', items:[['ok','Nombres jusqu\'à 10 000'],['ok','Calcul mental : doubles, moitiés'],['ok','Tables ×2 à ×5'],['wip','Tables ×6 à ×9 (en cours)'],['wip','Fractions ½ ¼ ¾ (nouveau 2025)'],['todo','Multiplication posée · Périmètres']] },
    { subj:'Français CE2', items:[['ok','Fluence lecture à voix haute'],['ok','Homophones a/à · est/et'],['ok','Accord sujet-verbe'],['wip','Pluriels -al/-aux · Passé composé (en cours)'],['todo','Vocabulaire : familles de mots, synonymes']] },
    { subj:'Questionner le monde', items:[['ok','Chronologie, siècles'],['ok','États de la matière'],['wip','Classification êtres vivants (en cours)'],['todo','Continents, océans, corps humain']] },
  ],
}

export default function ParentPage() {
  const { user, family, refreshFamily } = useAuth()
  const router = useRouter()
  const [tab,      setTab]      = useState(router.query.tab || 'bord')
  const [devoirs,  setDevoirs]  = useState([])
  const [results,  setResults]  = useState([])
  const [newChild, setNewChild] = useState({ name:'', level:'6e', age:'', color:'jade' })
  const [newDev,   setNewDev]   = useState({ childId:'', childName:'', titre:'', desc:'', mat:'', date:'', prio:'normal' })
  const [showChildForm, setShowChildForm] = useState(false)
  const [showDevForm,   setShowDevForm]   = useState(false)
  const [saving,   setSaving]   = useState(false)

  useEffect(() => { if (user) loadData() }, [user])

  async function loadData() {
    const [dvs, res] = await Promise.all([
      getDevoirs(user.uid),
      getAllResults(user.uid, 200),
    ])
    setDevoirs(dvs)
    setResults(res)
  }

  const children = family?.children || []

  // ── Stats ──────────────────────────────────────────────────────────────────
  function childStats(childId) {
    const r = results.filter(x => x.childId === childId)
    if (!r.length) return null
    const avg    = Math.round(r.reduce((a,b)=>a+b.pct,0)/r.length)
    const bySubj = {}
    r.forEach(x => {
      if (!bySubj[x.subject]) bySubj[x.subject] = []
      bySubj[x.subject].push(x.pct)
    })
    const radarData = Object.entries(bySubj).map(([k,v]) => ({
      subj: k.slice(0,6),
      val:  Math.round(v.reduce((a,b)=>a+b,0)/v.length),
    }))
    const lineData = r.slice(0,10).reverse().map((x,i) => ({
      i: i+1,
      pct: x.pct,
      subj: (x.subjectLabel||x.subject).slice(0,8),
    }))
    return { avg, count:r.length, radarData, lineData, bySubj }
  }

  // ── Add child ──────────────────────────────────────────────────────────────
  async function handleAddChild(e) {
    e.preventDefault()
    setSaving(true)
    await addChild(user.uid, newChild)
    await refreshFamily()
    setNewChild({ name:'', level:'6e', age:'', color:'jade' })
    setShowChildForm(false)
    setSaving(false)
  }

  // ── Add devoir ─────────────────────────────────────────────────────────────
  async function handleAddDevoir(e) {
    e.preventDefault()
    setSaving(true)
    const child = children.find(c=>c.id===newDev.childId)
    await addDevoir(user.uid, { ...newDev, childName: child?.name || '' })
    await loadData()
    setNewDev({ childId:'', childName:'', titre:'', desc:'', mat:'', date:'', prio:'normal' })
    setShowDevForm(false)
    setSaving(false)
  }

  const DOT = { ok:'bg-green-500', wip:'bg-amber-400', todo:'bg-red-400' }

  const COLOR = (c) => c?.color === 'jade'
    ? { bg:'#FBEAF0', text:'#72243E', mid:'#D4537E' }
    : c?.color === 'hugo'
    ? { bg:'#E1F5EE', text:'#085041', mid:'#1D9E75' }
    : { bg:'#EEEDFE', text:'#3C3489', mid:'#534AB7' }

  return (
    <Layout title="Espace parent" back="/home">
      <div className="max-w-lg mx-auto px-4 py-4">
        {/* Tabs */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {[['bord','📊 Tableau'],['enfants','👶 Enfants'],['devoirs','📋 Devoirs'],['prog','🏫 Programme'],['alertes','⚠️ Alertes']].map(([k,l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium ${tab===k?'bg-[#EEEDFE] text-[#3C3489] border-[#AFA9EC]':'text-gray-500 border-gray-200 hover:bg-gray-50'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* ── TABLEAU DE BORD ── */}
        {tab === 'bord' && (
          <div className="space-y-4">
            {/* Global stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-[#534AB7]">{results.length}</div>
                <div className="text-xs text-gray-500 mt-0.5">Exercices total</div>
              </div>
              {children.slice(0,2).map(c => {
                const st = childStats(c.id)
                const co = COLOR(c)
                return (
                  <div key={c.id} className="rounded-xl p-3 text-center" style={{background:co.bg}}>
                    <div className="text-xl font-bold" style={{color:co.mid}}>{st?.avg ?? '—'}{st ? '%' : ''}</div>
                    <div className="text-xs mt-0.5" style={{color:co.text}}>{c.name}</div>
                  </div>
                )
              })}
            </div>

            {/* Per-child stats */}
            {children.map(c => {
              const st  = childStats(c.id)
              const co  = COLOR(c)
              if (!st)  return (
                <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{background:co.bg,color:co.text}}>{c.name[0]}</div>
                    <div className="font-semibold text-sm">{c.name} — {c.level}</div>
                  </div>
                  <div className="text-xs text-gray-400">Aucun exercice fait pour l'instant.</div>
                </div>
              )
              return (
                <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{background:co.bg,color:co.text}}>{c.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm">{c.name} — {c.level}</div>
                      <div className="text-xs text-gray-400">{st.count} exercices</div>
                    </div>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${st.avg>=80?'bg-green-100 text-green-700':st.avg>=60?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'}`}>
                      {st.avg>=80?'Très bien':st.avg>=60?'Bien':'À encourager'}
                    </span>
                  </div>
                  {/* Progress par matière */}
                  {Object.entries(st.bySubj).map(([k,v]) => {
                    const avg = Math.round(v.reduce((a,b)=>a+b,0)/v.length)
                    return (
                      <div key={k} className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs text-gray-500 w-28 flex-shrink-0">{(k.slice(0,14))}</span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full progress-fill rounded-full" style={{width:`${avg}%`,background:co.mid}}/>
                        </div>
                        <span className="text-xs font-medium w-7 text-right" style={{color:co.mid}}>{avg}%</span>
                      </div>
                    )
                  })}
                  {/* Line chart */}
                  {st.lineData.length > 2 && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">Évolution</div>
                      <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={st.lineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                          <YAxis domain={[0,100]} tick={{fontSize:9}} width={20}/>
                          <Tooltip formatter={v=>`${v}%`} contentStyle={{fontSize:10}}/>
                          <Line type="monotone" dataKey="pct" stroke={co.mid} strokeWidth={2} dot={{r:3}}/>
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Recent activity */}
            {results.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 text-xs font-semibold text-gray-600">Activité récente</div>
                {results.slice(0,8).map(r => {
                  const child = children.find(c=>c.id===r.childId)
                  const co    = COLOR(child)
                  return (
                    <div key={r.id} className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-50 last:border-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                           style={{background:co.bg,color:co.text}}>
                        {child?.name?.[0] || '?'}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium">{r.subjectLabel || r.subject}</div>
                        <div className="text-xs text-gray-400">
                          {r.date?.toDate?.()?.toLocaleDateString('fr-FR',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) || ''}
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.pct>=80?'bg-green-100 text-green-700':r.pct>=60?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'}`}>
                        {r.score}/{r.total}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
            <button
              onClick={() => sendPrompt?.('Génère un rapport de progression complet pour mes enfants')}
              className="w-full py-2.5 bg-[#534AB7] text-white rounded-xl text-sm font-medium"
            >
              Générer un rapport IA ↗
            </button>
          </div>
        )}

        {/* ── ENFANTS ── */}
        {tab === 'enfants' && (
          <div className="space-y-3">
            {children.map(c => {
              const co = COLOR(c)
              return (
                <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{background:co.bg,color:co.text}}>
                    {c.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.level} · {c.age} ans</div>
                  </div>
                  <button
                    onClick={() => router.push(`/child/${c.id}`)}
                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                  >
                    Voir →
                  </button>
                </div>
              )
            })}
            <button
              onClick={() => setShowChildForm(!showChildForm)}
              className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:bg-gray-50"
            >
              + Ajouter un enfant
            </button>
            {showChildForm && (
              <form onSubmit={handleAddChild} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="text-sm font-semibold mb-1">Nouvel enfant</div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Prénom</label>
                  <input required value={newChild.name} onChange={e=>setNewChild(p=>({...p,name:e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7]" placeholder="ex : Emma"/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Niveau</label>
                    <select value={newChild.level} onChange={e=>setNewChild(p=>({...p,level:e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      {['CE1','CE2','CM1','CM2','6e','5e','4e','3e'].map(l=><option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Âge</label>
                    <input required type="number" min="5" max="18" value={newChild.age} onChange={e=>setNewChild(p=>({...p,age:e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="8"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Couleur</label>
                  <div className="flex gap-2">
                    {[['jade','#D4537E'],['hugo','#1D9E75'],['brand','#534AB7']].map(([k,c])=>(
                      <button type="button" key={k} onClick={()=>setNewChild(p=>({...p,color:k}))}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${newChild.color===k?'border-gray-800 scale-110':'border-transparent'}`}
                        style={{background:c}}/>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={saving} className="flex-1 py-2 bg-[#534AB7] text-white rounded-lg text-sm font-medium disabled:opacity-50">
                    {saving?'Enregistrement...':'Ajouter'}
                  </button>
                  <button type="button" onClick={()=>setShowChildForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500">
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── DEVOIRS ── */}
        {tab === 'devoirs' && (
          <div className="space-y-3">
            {devoirs.length === 0 && !showDevForm && (
              <div className="text-center py-6 text-gray-400 text-sm">Aucun devoir enregistré.</div>
            )}
            {devoirs.map(d => {
              const child = children.find(c=>c.id===d.childId)
              const co    = COLOR(child)
              return (
                <div key={d.id} className={`bg-white border rounded-xl p-3 ${d.done?'opacity-60':''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{d.titre}</div>
                      {d.desc && <div className="text-xs text-gray-500 mt-0.5">{d.desc}</div>}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.done?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>
                      {d.done?'Fait':'À faire'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background:co.bg,color:co.text}}>
                      {child?.name || d.childName || 'Enfant'}
                    </span>
                    {d.mat && <span className="text-xs px-2 py-0.5 rounded-full bg-[#EEEDFE] text-[#3C3489]">{d.mat}</span>}
                    {d.prio==='urgent' && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">Urgent</span>}
                    {d.date && <span className="text-xs text-gray-400">→ {d.date}</span>}
                    <div className="flex gap-2 ml-auto">
                      <button onClick={()=>toggleDevoir(d.id,!d.done).then(loadData)} className="text-xs text-gray-400 hover:text-gray-700">
                        {d.done?'↩ Rouvrir':'✓ Marquer fait'}
                      </button>
                      <button onClick={()=>deleteDevoir(d.id).then(loadData)} className="text-xs text-red-400 hover:text-red-600">🗑</button>
                    </div>
                  </div>
                </div>
              )
            })}
            <button onClick={()=>setShowDevForm(!showDevForm)}
              className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-sm text-gray-500 hover:bg-gray-50">
              + Ajouter un devoir
            </button>
            {showDevForm && (
              <form onSubmit={handleAddDevoir} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="text-sm font-semibold">Nouveau devoir</div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Pour quel enfant ?</label>
                  <select required value={newDev.childId} onChange={e=>setNewDev(p=>({...p,childId:e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">-- Choisir --</option>
                    {children.map(c=><option key={c.id} value={c.id}>{c.name} ({c.level})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Matière</label>
                  <select value={newDev.mat} onChange={e=>setNewDev(p=>({...p,mat:e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">-- Choisir --</option>
                    {['Maths','Français','Anglais','Histoire-Géo','Sciences','Culture générale','Autre'].map(m=><option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Titre du devoir</label>
                  <input required value={newDev.titre} onChange={e=>setNewDev(p=>({...p,titre:e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="ex : Tables ×7 et ×8"/>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Instructions</label>
                  <textarea value={newDev.desc} onChange={e=>setNewDev(p=>({...p,desc:e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" rows={2}
                    placeholder="ex : Exercices p.34 jusqu'à 100%..."/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Date limite</label>
                    <input type="date" value={newDev.date} onChange={e=>setNewDev(p=>({...p,date:e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"/>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Priorité</label>
                    <select value={newDev.prio} onChange={e=>setNewDev(p=>({...p,prio:e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option value="normal">Normale</option>
                      <option value="urgent">Urgente</option>
                      <option value="option">Optionnelle</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={saving} className="flex-1 py-2 bg-[#534AB7] text-white rounded-lg text-sm font-medium disabled:opacity-50">
                    {saving?'Enregistrement...':'Enregistrer'}
                  </button>
                  <button type="button" onClick={()=>setShowDevForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-500">
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── PROGRAMME EN ── */}
        {tab === 'prog' && (
          <div>
            {children.map(c => {
              const key  = c.level?.startsWith('6') ? 'jade' : 'hugo'
              const prog = PROGRAM[key] || []
              const co   = COLOR(c)
              return (
                <div key={c.id} className="mb-6">
                  <div className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{background:co.bg,color:co.text}}>{c.name[0]}</span>
                    {c.name} — {c.level} · Programme EN 2025
                  </div>
                  {prog.map((p,pi) => (
                    <div key={pi} className="bg-white border border-gray-100 rounded-xl p-3 mb-2">
                      <div className="text-xs font-semibold text-gray-700 mb-2">{p.subj}</div>
                      {p.items.map(([status, label], i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500 py-1 border-b border-gray-50 last:border-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${DOT[status]}`}/>
                          {label}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )
            })}
            <div className="flex items-center gap-4 text-xs text-gray-400 p-3 bg-gray-50 rounded-xl">
              <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"/>Maîtrisé</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1"/>En cours</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1"/>À venir</span>
            </div>
          </div>
        )}

        {/* ── ALERTES ── */}
        {tab === 'alertes' && (
          <div className="space-y-3">
            {children.map(c => {
              const st = childStats(c.id)
              const co = COLOR(c)
              if (!st) return null
              const weak = Object.entries(st.bySubj)
                .map(([k,v])=>({ subj:k, avg:Math.round(v.reduce((a,b)=>a+b,0)/v.length) }))
                .sort((a,b)=>a.avg-b.avg)
              return (
                <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{background:co.bg,color:co.text}}>{c.name[0]}</span>
                    <span className="font-semibold text-sm">{c.name}</span>
                  </div>
                  {weak.map(w => (
                    <div key={w.subj} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${w.avg<60?'bg-red-400':w.avg<75?'bg-amber-400':'bg-green-500'}`}/>
                      <span className="text-xs flex-1 text-gray-600">{w.subj}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${w.avg<60?'bg-red-100 text-red-700':w.avg<75?'bg-amber-100 text-amber-700':'bg-green-100 text-green-700'}`}>
                        {w.avg}%
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}
            {results.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                Les alertes apparaîtront ici après les premiers exercices.
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
