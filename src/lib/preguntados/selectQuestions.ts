import type { PreguntadosQuestion, Category, QuestionDifficulty } from "./types"
import { allPreguntadosQuestions } from "../../data/preguntados"

interface SelectQuestionsOptions {
  category: Category
  count: number
  difficulty?: QuestionDifficulty
}

interface DifficultyMix {
  easy: number
  medium: number
  hard: number
}

function filterQuestionsByCategory(questions: PreguntadosQuestion[], category: Category): PreguntadosQuestion[] {
  return questions.filter(question => question.category === category)
}

function filterQuestionsByDifficulty(questions: PreguntadosQuestion[], difficulty: QuestionDifficulty): PreguntadosQuestion[] {
  return questions.filter(question => question.difficulty === difficulty)
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

function getQuestionsByDifficulty(questions: PreguntadosQuestion[]): Record<QuestionDifficulty, PreguntadosQuestion[]> {
  const byDifficulty: Record<QuestionDifficulty, PreguntadosQuestion[]> = {
    easy: [],
    medium: [],
    hard: []
  }
  
  questions.forEach(question => {
    byDifficulty[question.difficulty].push(question)
  })
  
  return byDifficulty
}

function selectMixedQuestions(
  questionsByDifficulty: Record<QuestionDifficulty, PreguntadosQuestion[]>,
  count: number,
  mix: DifficultyMix
): PreguntadosQuestion[] {
  const total = mix.easy + mix.medium + mix.hard
  const selected: PreguntadosQuestion[] = []
  
  const easyCount = Math.floor((count * mix.easy) / total)
  const mediumCount = Math.floor((count * mix.medium) / total)
  const hardCount = count - easyCount - mediumCount
  
  const shuffledEasy = shuffleArray(questionsByDifficulty.easy).slice(0, easyCount)
  const shuffledMedium = shuffleArray(questionsByDifficulty.medium).slice(0, mediumCount)
  const shuffledHard = shuffleArray(questionsByDifficulty.hard).slice(0, hardCount)
  
  selected.push(...shuffledEasy, ...shuffledMedium, ...shuffledHard)
  
  return shuffleArray(selected)
}

export function selectQuestions(options: SelectQuestionsOptions): PreguntadosQuestion[] {
  const { category, count, difficulty } = options
  
  const categoryQuestions = filterQuestionsByCategory(allPreguntadosQuestions, category)
  
  if (categoryQuestions.length === 0) {
    return []
  }
  
  if (difficulty) {
    const difficultyQuestions = filterQuestionsByDifficulty(categoryQuestions, difficulty)
    const shuffled = shuffleArray(difficultyQuestions)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }
  
  const questionsByDifficulty = getQuestionsByDifficulty(categoryQuestions)
  const defaultMix: DifficultyMix = { easy: 0.6, medium: 0.3, hard: 0.1 }
  
  const mixedQuestions = selectMixedQuestions(questionsByDifficulty, count, defaultMix)
  
  if (mixedQuestions.length >= count) {
    return mixedQuestions.slice(0, count)
  }
  
  const allShuffled = shuffleArray(categoryQuestions)
  return allShuffled.slice(0, Math.min(count, allShuffled.length))
}
