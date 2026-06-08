// src/components/Layout.js
import { useRouter } from 'next/router'
import { useAuth }   from '../lib/AuthContext'
import Head from 'next/head'

export default function Layout({ children, title = 'MonEcole', back }) {
  const { family, logout } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>{title} · MonEcole</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className="min-h-screen bg-[#f8f8f6]">
        {/* Nav */}
        <nav className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {back && (
                <button onClick={() => router.push(back)} className="text-gray-400 hover:text-gray-700 text-lg leading-none">
                  ←
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="text-lg">🏫</span>
                <span className="font-bold text-sm text-[#3C3489]">MonEcole</span>
                <span className="hidden sm:inline text-xs bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">EN 2025</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {family?.familyName && (
                <span className="text-xs text-gray-400 hidden sm:inline">{family.familyName}</span>
              )}
              <button
                onClick={() => router.push('/home')}
                className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                🏠
              </button>
              <button
                onClick={() => router.push('/parent')}
                className="text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"
              >
                Parent
              </button>
              <button
                onClick={handleLogout}
                className="text-xs px-2.5 py-1.5 border border-red-100 text-red-500 rounded-lg hover:bg-red-50"
              >
                Déco.
              </button>
            </div>
          </div>
        </nav>
        {/* Main */}
        <main>{children}</main>
        {/* Footer */}
        <footer className="text-center py-4 text-xs text-gray-300">
          MonEcole · Programme EN 2025 · Sécurisé · Pas de pub
        </footer>
      </div>
    </>
  )
}
