// src/pages/index.js  – Login + Register
import { useState } from 'react'
import { useRouter }  from 'next/router'
import { useAuth }    from '../lib/AuthContext'

export default function LoginPage() {
  const { login, register } = useAuth()
  const router = useRouter()
  const [mode,    setMode]    = useState('login')   // 'login' | 'register'
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [name,    setName]    = useState('')
  const [err,     setErr]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    setLoading(true)
    try {
      if (mode === 'register') {
        await register(email, pass, name)
      } else {
        await login(email, pass)
      }
      router.push('/home')
    } catch (e) {
      setErr(e.message.includes('wrong-password') ? 'Mot de passe incorrect.'
           : e.message.includes('user-not-found')  ? 'Compte introuvable.'
           : e.message.includes('email-already')   ? 'Email déjà utilisé.'
           : 'Erreur : ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">🏫</span>
            <h1 className="text-2xl font-bold text-[#3C3489]">MonEcole</h1>
          </div>
          <p className="text-sm text-gray-500">Programme EN 2025 · IA Claude · Sécurisé</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['login','register'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setErr('') }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                  ${mode === m
                    ? 'bg-[#EEEDFE] text-[#3C3489] border border-[#AFA9EC]'
                    : 'text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
              >
                {m === 'login' ? 'Se connecter' : 'Créer un compte'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nom de famille</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="ex : Famille Dupont"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7]"
                />
              </div>
            )}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="parent@email.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Mot de passe</label>
              <input
                type="password"
                required
                minLength={6}
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Minimum 6 caractères"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#534AB7]"
              />
            </div>
            {err && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">
                {err}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#534AB7] text-white rounded-lg text-sm font-medium hover:bg-[#3C3489] transition-colors disabled:opacity-50"
            >
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : 'Créer le compte'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Espace sécurisé · Pas de pub · Contenu adapté aux enfants
        </p>
      </div>
    </div>
  )
}
