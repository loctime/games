import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface UserProgress {
  totalXP?: number
  gamesPlayed?: number
  correctAnswers?: number
  [key: string]: unknown
}

export async function saveUserProgress(uid: string, data: UserProgress): Promise<void> {
  const ref = doc(db, "apps", "juegos", "users", uid)
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

export async function getUserProgress(uid: string): Promise<UserProgress | null> {
  const ref = doc(db, "apps", "juegos", "users", uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return snap.data() as UserProgress
}