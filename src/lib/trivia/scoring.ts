import type { Category, QuestionDifficulty } from '../player/types'

export interface ScoreCalculation {
  baseXP: number
  streakBonus: number
  difficultyMultiplier: number
  speedBonus: number
  perfectBonus: number
  totalXP: number
}

export class ScoringSystem {
  static calculateScore(
    correct: boolean,
    timeTaken: number,
    timeLimit: number,
    streak: number,
    difficulty: QuestionDifficulty,
    category: Category,
    questionsInGame: number,
    correctInGame: number
  ): ScoreCalculation {
    if (!correct) {
      return {
        baseXP: 0,
        streakBonus: 0,
        difficultyMultiplier: 1,
        speedBonus: 0,
        perfectBonus: 0,
        totalXP: 0
      }
    }

    // XP base por respuesta correcta
    const baseXP = 100

    // Bonus por racha (cada 5 victorias)
    const streakBonus = Math.floor(streak / 5) * 10

    // Multiplicador por dificultad
    const difficultyMultiplier = this.getDifficultyMultiplier(difficulty)

    // Bonus por velocidad (si responde en menos de 5 segundos)
    const speedBonus = timeTaken < 5 ? 10 : 0

    // Bonus por juego perfecto (si es la última pregunta y todo fue correcto)
    const perfectBonus = (correctInGame === questionsInGame - 1 && correctInGame > 0) ? 50 : 0

    const totalXP = Math.floor((baseXP + streakBonus + speedBonus + perfectBonus) * difficultyMultiplier)

    return {
      baseXP,
      streakBonus,
      difficultyMultiplier,
      speedBonus,
      perfectBonus,
      totalXP
    }
  }

  static getDifficultyMultiplier(difficulty: QuestionDifficulty): number {
    switch (difficulty) {
      case 'easy': return 1
      case 'medium': return 1.5
      case 'hard': return 2
      default: return 1
    }
  }

  static calculateStreakMultiplier(streak: number): number {
    // Cada 5 victorias, 0.2x extra de multiplicador (máximo 2x)
    const multiplier = 1 + (Math.floor(streak / 5) * 0.2)
    return Math.min(multiplier, 2)
  }

  static getXPToNextLevel(level: number): number {
    return level * 1000
  }

  static getTotalXPForLevel(level: number): number {
    // Nivel 1 = 0 XP, Nivel 2 = 1000 XP, Nivel 3 = 2000 XP, etc.
    return (level - 1) * 1000
  }
}
