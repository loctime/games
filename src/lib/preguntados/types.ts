export type QuestionDifficulty = "easy" | "medium" | "hard"

export type Category = "personas" | "objetos" | "animales" | "libre"

export interface PreguntadosQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  category: Category
  difficulty: QuestionDifficulty
  tags?: string[]
}
