export interface PlayerLevel {
  level: number
  currentXP: number
  xpToNext: number
  totalXP: number
}

export interface Streak {
  current: number
  best: number
  category: Record<Category, number>
}

export interface CategoryProgress {
  unlocked: Category[]
  crowns: Record<Category, number>
  requiredCrowns: {
    personas: 0
    objetos: 3
    animales: 5
    libre: 8
  }
}

export interface BasicStats {
  totalGames: number
  totalCorrect: number
  totalTime: number
  categoryStats: Record<Category, {
    played: number
    correct: number
    crowns: number
  }>
}

export interface CategoryStats {
  played: number
  correct: number
  totalTime: number
  averageTime: number
  crowns: number
  bestStreak: number
  currentStreak: number
}

export interface PlayerProfile {
  id: string
  created: Date
  lastPlayed: Date
  
  // Progresión
  level: PlayerLevel
  streak: Streak
  categories: CategoryProgress
  
  // Economía
  powerUps: number
  totalXP: number
  
  // Estadísticas
  gamesPlayed: number
  questionsAnswered: number
  correctAnswers: number
  bestStreak: number
  categoryStats: Record<Category, CategoryStats>
  
  // Preferencias
  favoriteCategory: Category
  difficulty: QuestionDifficulty
}

export type Category = "personas" | "objetos" | "animales" | "libre"
export type QuestionDifficulty = "easy" | "medium" | "hard"
