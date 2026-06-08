// src/pages/home.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth }   from '../lib/AuthContext'
import { getDevoirs, getAllResults } from '../lib/db'
import Layout from '../components/Layout'

export default function HomePage() {
  const { user, family, loading } = useAuth()
  const router = useRouter()
  const [devoirs,  setDevoirs]  = useState([])
  const [stats,    setStats]    = useState({})

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading])

  useEffect(() => {
    if (!user || !family) return
    loadData()
  }, [user, family])

  async function loadData() {
    const [dvs, results] = await Promise.all([
      getDevoirs(user.uid),
      getAllResults(user.uid),
    ])
    setDevoirs(dvs.filter(d => !d.done))

    // Stats par enfant
    const s = {}
    for (const child of (family?.children || [])) {
      const r = results.filter(x => x.childId === child.id)
      if (r.length) {
        const avg = Math.round(r.reduce((a, b) => a + b.pct, 0) / r.length)
        s[child.id] = { avg, count: r.length }
      }
    }
    setStats(s)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Chargement...</div>

  const children = family?.children || []

  function goChild(child) {
    router.push(`/child/${child.id}`)
  }

  const COLORS = {
    jade: { bg: '#FBEAF0', text: '#72243E', btn: '#D4537E' },
    hugo: { bg: '#E1F5EE', text: '#085041', btn: '#1D9E75' },
    default: { bg: '#EEEDFE', text: '#3C3489', btn: '#534AB7' },
  }

  return (
    <Layout title="Accueil">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Bonjour, {family?.familyName || 'famille'} !
          </h2>
          <p className="text-sm text-gray-500 mt-1">Qui travaille aujourd'hui ?</p>
        </div>

        {/* Parent card */}
        <div
          onClick={() => router.push('/parent')}
          className="bg-white border border-gray-200 rounded-2xl p-4 mb-3 cursor-pointer card-hover flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#EEEDFE] flex items-center justify-center text-lg font-bold text-[#3C3489]">P</div>
          <div className="flex-1">
            <div className="font-semibold text-sm">Espace parent</div>
            <div className="text-xs text-gray-500">Suivi · Devoirs · Programme EN</div>
          </div>
          <div className="text-gray-300">›</div>
        </div>

        {/* Children cards */}
        <div className="space-y-3 mb-6">
          {children.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              <p>Aucun enfant enregistré.</p>
              <button onClick={() => router.push('/parent?tab=enfants')} className="mt-2 text-[#534AB7] underline">
                Ajouter un enfant →
              </button>
            </div>
          )}
          {children.map((child, i) => {
            const color = COLORS[child.color] || COLORS[i % 2 === 0 ? 'jade' : 'hugo']
            const st    = stats[child.id]
            return (
              <div
                key={child.id}
                onClick={() => goChild(child)}
                className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer card-hover"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: color.bg, color: color.text }}
                  >
                    {child.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{child.name}</div>
                    <div className="text-xs text-gray-500">{child.level} · {child.age} ans</div>
                  </div>
                  {st && (
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: color.btn }}>{st.avg}%</div>
                      <div className="text-xs text-gray-400">{st.count} exercices</div>
                    </div>
                  )}
                  <div className="text-gray-300">›</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Devoirs en attente */}
        {devoirs.length > 0 && (
          <div className="bg-[#EEEDFE] border border-[#AFA9EC] rounded-xl p-4">
            <div className="text-xs font-semibold text-[#3C3489] mb-3 flex items-center gap-2">
              📋 Devoirs en attente ({devoirs.length})
            </div>
            {devoirs.slice(0, 3).map(d => (
              <div key={d.id} className="text-xs text-[#534AB7] py-1 border-b border-[#CECBF6] last:border-0">
                <span className="font-medium">{d.childName}</span> — {d.titre}
                {d.date && <span className="text-[#7F77DD] ml-1">· {d.date}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Badge sécurisé */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 justify-center">
          🔒 Programme EN 2025 · IA sécurisée · Pas de pub
        </div>
      </div>
    </Layout>
  )
}
