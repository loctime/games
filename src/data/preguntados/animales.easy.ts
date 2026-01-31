import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const animalesEasyQuestions: PreguntadosQuestion[] = [
  {
    id: "animales_mas_grande",
    question: "¿Qué animal es el más grande del mundo?",
    options: ["Elefante", "Ballena azul", "Jirafa", "Tiburón blanco"],
    correctIndex: 1,
    category: "animales",
    difficulty: "easy",
    tags: ["océano", "tamaño"]
  },
  {
    id: "animales_desierto_joroba",
    question: "¿Qué animal vive en el desierto y tiene joroba?",
    options: ["Camello", "Caballo", "Vaca", "Cebra"],
    correctIndex: 0,
    category: "animales",
    difficulty: "easy",
    tags: ["desierto", "mamíferos"]
  },
  {
    id: "animales_ave_no_vuela",
    question: "¿Qué ave no puede volar?",
    options: ["Águila", "Pingüino", "Colibrí", "Búho"],
    correctIndex: 1,
    category: "animales",
    difficulty: "easy",
    tags: ["aves", "antártida"]
  },
  {
    id: "animales_cambia_color",
    question: "¿Qué animal cambia de color?",
    options: ["Serpiente", "Lagartija", "Camaleón", "Iguana"],
    correctIndex: 2,
    category: "animales",
    difficulty: "easy",
    tags: ["reptiles", "camuflaje"]
  },
  {
    id: "animales_australia_salta",
    question: "¿Qué animal vive en Australia y salta?",
    options: ["Canguro", "Koala", "Canguro", "Wombat"],
    correctIndex: 0,
    category: "animales",
    difficulty: "easy",
    tags: ["australia", "marsupiales"]
  }
]
