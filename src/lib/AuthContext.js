// src/lib/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './firebase'
import { getFamily, createFamily } from './db'

const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user,   setUser]   = useState(null)
  const [family, setFamily] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const fam = await getFamily(u.uid)
        setFamily(fam)
      } else {
        setFamily(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  async function register(email, password, familyName) {
    const { user: u } = await createUserWithEmailAndPassword(auth, email, password)
    await createFamily(u.uid, { email, familyName, children: [] })
    const fam = await getFamily(u.uid)
    setFamily(fam)
    return u
  }

  async function login(email, password) {
    const { user: u } = await signInWithEmailAndPassword(auth, email, password)
    const fam = await getFamily(u.uid)
    setFamily(fam)
    return u
  }

  async function logout() {
    await signOut(auth)
    setFamily(null)
  }

  async function refreshFamily() {
    if (user) {
      const fam = await getFamily(user.uid)
      setFamily(fam)
    }
  }

  return (
    <AuthContext.Provider value={{ user, family, loading, register, login, logout, refreshFamily }}>
      {children}
    </AuthContext.Provider>
  )
}
