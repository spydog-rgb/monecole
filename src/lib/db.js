// src/lib/db.js
import {
  doc, getDoc, setDoc, updateDoc, addDoc,
  collection, query, where, orderBy, limit,
  getDocs, serverTimestamp, increment,
} from 'firebase/firestore'
import { db } from './firebase'

// ─── Famille ─────────────────────────────────────────────────────────────────
export async function getFamily(uid) {
  const snap = await getDoc(doc(db, 'families', uid))
  return snap.exists() ? snap.data() : null
}

export async function createFamily(uid, data) {
  await setDoc(doc(db, 'families', uid), {
    ...data,
    createdAt: serverTimestamp(),
    children: [],
  })
}

// ─── Enfants ──────────────────────────────────────────────────────────────────
export async function addChild(familyId, child) {
  const ref  = doc(db, 'families', familyId)
  const snap = await getDoc(ref)
  const fam  = snap.data()
  const id   = Date.now().toString()
  const newChild = { id, ...child }
  await updateDoc(ref, { children: [...(fam.children || []), newChild] })
  return newChild
}

export async function updateChild(familyId, childId, data) {
  const ref  = doc(db, 'families', familyId)
  const snap = await getDoc(ref)
  const fam  = snap.data()
  const children = (fam.children || []).map(c => c.id === childId ? { ...c, ...data } : c)
  await updateDoc(ref, { children })
}

// ─── Résultats ────────────────────────────────────────────────────────────────
export async function saveResult(familyId, childId, result) {
  await addDoc(collection(db, 'results'), {
    familyId,
    childId,
    ...result,
    date: serverTimestamp(),
  })
}

export async function getResults(familyId, childId, limitN = 50) {
  const q = query(
    collection(db, 'results'),
    where('familyId', '==', familyId),
    where('childId',  '==', childId),
    orderBy('date', 'desc'),
    limit(limitN),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getAllResults(familyId, limitN = 100) {
  const q = query(
    collection(db, 'results'),
    where('familyId', '==', familyId),
    orderBy('date', 'desc'),
    limit(limitN),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ─── Devoirs ──────────────────────────────────────────────────────────────────
export async function addDevoir(familyId, devoir) {
  const ref = await addDoc(collection(db, 'devoirs'), {
    familyId,
    ...devoir,
    done: false,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function getDevoirs(familyId) {
  const q = query(
    collection(db, 'devoirs'),
    where('familyId', '==', familyId),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function toggleDevoir(devoirId, done) {
  await updateDoc(doc(db, 'devoirs', devoirId), { done })
}

export async function deleteDevoir(devoirId) {
  const { deleteDoc } = await import('firebase/firestore')
  await deleteDoc(doc(db, 'devoirs', devoirId))
}
