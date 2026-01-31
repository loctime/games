import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const personasEasyQuestions: PreguntadosQuestion[] = [
  {
    id: "personas_papa_argentino",
    question: "¿Quién fue el Papa argentino?",
    options: ["Francisco", "Juan Pablo II", "Benedicto XVI", "Pablo VI"],
    correctIndex: 0,
    category: "personas",
    difficulty: "easy",
    tags: ["religión", "argentina"]
  },
  {
    id: "personas_messi_la_pulga",
    question: "¿Qué futbolista argentino es conocido como 'La Pulga'?",
    options: ["Maradona", "Messi", "Di María", "Aguero"],
    correctIndex: 1,
    category: "personas",
    difficulty: "easy",
    tags: ["fútbol", "deportes"]
  },
  {
    id: "personas_einstein_relatividad",
    question: "¿Qué científico desarrolló la teoría de la relatividad?",
    options: ["Newton", "Einstein", "Galileo", "Tesla"],
    correctIndex: 1,
    category: "personas",
    difficulty: "easy",
    tags: ["ciencia", "física"]
  }
]
