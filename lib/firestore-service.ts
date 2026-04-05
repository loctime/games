import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

export interface PlayerProfile {
  uid: string
  displayName: string
  level: number
  totalXP: number
  gamesPlayed: number
  gamesUnique: string[]
  achievements: string[]
  lastPlayed: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface GameStats {
  gameId: string
  gamesPlayed: number
  totalScore: number
  bestScore: number
  lastScore: number
  lastPlayed: Timestamp
}

function playerRef(uid: string) {
  return doc(db, "apps", "juegos", "players", uid)
}

function gameStatsRef(uid: string, gameId: string) {
  return doc(db, "apps", "juegos", "players", uid, "gameStats", gameId)
}

export async function getPlayer(uid: string): Promise<PlayerProfile | null> {
  try {
    const snap = await getDoc(playerRef(uid))
    if (!snap.exists()) return null
    return snap.data() as PlayerProfile
  } catch (err) {
    console.error("getPlayer error:", err)
    throw err
  }
}

export async function createPlayer(uid: string, displayName: string): Promise<PlayerProfile> {
  try {
    const now = serverTimestamp()
    const profile = {
      uid,
      displayName,
      level: 1,
      totalXP: 0,
      gamesPlayed: 0,
      gamesUnique: [],
      achievements: [],
      lastPlayed: now,
      createdAt: now,
      updatedAt: now,
    }
    await setDoc(playerRef(uid), profile)
    return { ...profile, lastPlayed: now, createdAt: now, updatedAt: now } as unknown as PlayerProfile
  } catch (err) {
    console.error("createPlayer error:", err)
    throw err
  }
}

export async function getOrCreatePlayer(uid: string, displayName: string): Promise<PlayerProfile> {
  try {
    const existing = await getPlayer(uid)
    if (existing) return existing
    return await createPlayer(uid, displayName)
  } catch (err) {
    console.error("getOrCreatePlayer error:", err)
    throw err
  }
}

export async function addXPAndSave(
  uid: string,
  xpToAdd: number,
  gameId: string,
  score: number
): Promise<void> {
  try {
    const profile = await getPlayer(uid)
    if (!profile) throw new Error(`Player ${uid} not found`)

    const newTotalXP = profile.totalXP + xpToAdd
    const newLevel = Math.floor(newTotalXP / 1000) + 1
    const newGamesPlayed = profile.gamesPlayed + 1
    const newGamesUnique = profile.gamesUnique.includes(gameId)
      ? profile.gamesUnique
      : [...profile.gamesUnique, gameId]

    await setDoc(
      playerRef(uid),
      {
        totalXP: newTotalXP,
        level: newLevel,
        gamesPlayed: newGamesPlayed,
        gamesUnique: newGamesUnique,
        lastPlayed: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    const statsSnap = await getDoc(gameStatsRef(uid, gameId))
    const existing = statsSnap.exists() ? (statsSnap.data() as GameStats) : null

    await setDoc(
      gameStatsRef(uid, gameId),
      {
        gameId,
        gamesPlayed: (existing?.gamesPlayed ?? 0) + 1,
        totalScore: (existing?.totalScore ?? 0) + score,
        bestScore: Math.max(existing?.bestScore ?? 0, score),
        lastScore: score,
        lastPlayed: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (err) {
    console.error("addXPAndSave error:", err)
    throw err
  }
}

export async function getGameStats(uid: string, gameId: string): Promise<GameStats | null> {
  try {
    const snap = await getDoc(gameStatsRef(uid, gameId))
    if (!snap.exists()) return null
    return snap.data() as GameStats
  } catch (err) {
    console.error("getGameStats error:", err)
    throw err
  }
}
