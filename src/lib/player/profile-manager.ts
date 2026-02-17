import type { PlayerProfile, PlayerLevel, Category, QuestionDifficulty, CategoryStats } from './types'

const DB_NAME = 'PasalaTriviaDB'
const DB_VERSION = 1
const STORE_NAME = 'playerProfile'

class ProfileManager {
  private db: IDBDatabase | null = null

  async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
    })
  }

  private createDefaultCategoryStats = (): Record<Category, CategoryStats> => ({
    personas: {
      played: 0,
      correct: 0,
      totalTime: 0,
      averageTime: 0,
      crowns: 0,
      bestStreak: 0,
      currentStreak: 0
    },
    objetos: {
      played: 0,
      correct: 0,
      totalTime: 0,
      averageTime: 0,
      crowns: 0,
      bestStreak: 0,
      currentStreak: 0
    },
    animales: {
      played: 0,
      correct: 0,
      totalTime: 0,
      averageTime: 0,
      crowns: 0,
      bestStreak: 0,
      currentStreak: 0
    },
    libre: {
      played: 0,
      correct: 0,
      totalTime: 0,
      averageTime: 0,
      crowns: 0,
      bestStreak: 0,
      currentStreak: 0
    }
  })

  async createProfile(): Promise<PlayerProfile> {
    const now = new Date()
    const profile: PlayerProfile = {
      id: 'player-1',
      created: now,
      lastPlayed: now,
      
      level: {
        level: 1,
        currentXP: 0,
        xpToNext: 1000,
        totalXP: 0
      },
      
      streak: {
        current: 0,
        best: 0,
        category: {
          personas: 0,
          objetos: 0,
          animales: 0,
          libre: 0
        }
      },
      
      categories: {
        unlocked: ['personas'],
        crowns: {
          personas: 0,
          objetos: 0,
          animales: 0,
          libre: 0
        },
        requiredCrowns: {
          personas: 0,
          objetos: 3,
          animales: 5,
          libre: 8
        }
      },
      
      powerUps: 3, // 3 power-ups gratis al inicio
      totalXP: 0,
      
      gamesPlayed: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      bestStreak: 0,
      categoryStats: this.createDefaultCategoryStats(),
      
      favoriteCategory: 'personas',
      difficulty: 'easy'
    }

    await this.saveProfile(profile)
    return profile
  }

  async getProfile(): Promise<PlayerProfile | null> {
    if (!this.db) await this.initDB()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get('player-1')

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || null)
    })
  }

  async saveProfile(profile: PlayerProfile): Promise<void> {
    if (!this.db) await this.initDB()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      const request = store.put(profile)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  calculateLevel(xp: number): PlayerLevel {
    const xpPerLevel = 1000
    const level = Math.floor(xp / xpPerLevel) + 1
    const currentXP = xp % xpPerLevel
    const xpToNext = xpPerLevel

    return {
      level,
      currentXP,
      xpToNext,
      totalXP: xp
    }
  }

  addXP(profile: PlayerProfile, xp: number): PlayerProfile {
    const newTotalXP = profile.totalXP + xp
    const newLevel = this.calculateLevel(newTotalXP)
    
    return {
      ...profile,
      totalXP: newTotalXP,
      level: newLevel,
      lastPlayed: new Date()
    }
  }

  updateStreak(profile: PlayerProfile, won: boolean, category: Category): PlayerProfile {
    const newStreak = { ...profile.streak }
    
    if (won) {
      newStreak.current += 1
      newStreak.category[category] += 1
      if (newStreak.current > newStreak.best) {
        newStreak.best = newStreak.current
      }
    } else {
      newStreak.current = 0
    }

    return {
      ...profile,
      streak: newStreak,
      bestStreak: Math.max(profile.bestStreak, newStreak.best)
    }
  }

  checkAndAwardCrown(profile: PlayerProfile, category: Category, correctAnswers: number): PlayerProfile {
    // Una corona se gana con 5 respuestas correctas seguidas en una categoría
    const CATEGORY_CROWN_THRESHOLD = 5
    
    if (correctAnswers >= CATEGORY_CROWN_THRESHOLD) {
      return this.addCrown(profile, category)
    }
    
    return profile
  }

  getCategoryProgress(profile: PlayerProfile, category: Category, correctAnswers: number): {
    current: number
    required: number
    percentage: number
    crowns: number
  } {
    const CATEGORY_CROWN_THRESHOLD = 5
    const crowns = profile.categories.crowns[category]
    const required = CATEGORY_CROWN_THRESHOLD
    const current = (correctAnswers % required) || 0
    const percentage = (current / required) * 100
    
    return { current, required, percentage, crowns }
  }

  getTotalCrowns(profile: PlayerProfile): number {
    return Object.values(profile.categories.crowns).reduce((sum, crowns) => sum + crowns, 0)
  }

  canUnlockCategory(profile: PlayerProfile, category: Category): boolean {
    if (profile.categories.unlocked.includes(category)) return true
    
    const requiredCrowns = profile.categories.requiredCrowns[category]
    const totalCrowns = this.getTotalCrowns(profile)
    
    return totalCrowns >= requiredCrowns
  }

  unlockCategory(profile: PlayerProfile, category: Category): PlayerProfile {
    if (profile.categories.unlocked.includes(category)) return profile
    
    return {
      ...profile,
      categories: {
        ...profile.categories,
        unlocked: [...profile.categories.unlocked, category]
      }
    }
  }

  addCrown(profile: PlayerProfile, category: Category): PlayerProfile {
    return {
      ...profile,
      categories: {
        ...profile.categories,
        crowns: {
          ...profile.categories.crowns,
          [category]: profile.categories.crowns[category] + 1
        }
      }
    }
  }

  usePowerUp(profile: PlayerProfile): PlayerProfile {
    if (profile.powerUps <= 0) return profile
    
    return {
      ...profile,
      powerUps: profile.powerUps - 1
    }
  }

  addPowerUps(profile: PlayerProfile, count: number): PlayerProfile {
    return {
      ...profile,
      powerUps: profile.powerUps + count
    }
  }

  updateCategoryStats(
    profile: PlayerProfile, 
    category: Category, 
    correct: boolean, 
    timeTaken: number
  ): PlayerProfile {
    const currentStats = profile.categoryStats[category]
    const newStats: CategoryStats = {
      ...currentStats,
      played: currentStats.played + 1,
      totalTime: currentStats.totalTime + timeTaken,
      averageTime: (currentStats.totalTime + timeTaken) / (currentStats.played + 1),
      correct: correct ? currentStats.correct + 1 : currentStats.correct,
      currentStreak: correct ? currentStats.currentStreak + 1 : 0,
      bestStreak: correct 
        ? Math.max(currentStats.bestStreak, currentStats.currentStreak + 1) 
        : currentStats.bestStreak
    }

    return {
      ...profile,
      categoryStats: {
        ...profile.categoryStats,
        [category]: newStats
      }
    }
  }

  getCategoryAccuracy(profile: PlayerProfile, category: Category): number {
    const stats = profile.categoryStats[category]
    return stats.played > 0 ? (stats.correct / stats.played) * 100 : 0
  }
}

export const profileManager = new ProfileManager()
