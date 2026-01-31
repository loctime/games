import type { PreguntadosQuestion, Category, QuestionDifficulty } from "./types"
import { allPreguntadosQuestions } from "../../data/preguntados"

interface SelectQuestionsOptions {
  category: Category
  count: number
  difficulty?: QuestionDifficulty
}

export function selectQuestions(options: SelectQuestionsOptions): PreguntadosQuestion[] {
  const { category, count, difficulty } = options
  
  let filteredQuestions = allPreguntadosQuestions.filter(
    question => question.category === category
  )
  
  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(
      question => question.difficulty === difficulty
    )
  }
  
  const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5)
  
  return shuffled.slice(0, count)
}
