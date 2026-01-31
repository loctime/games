import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const libreEasyQuestions: PreguntadosQuestion[] = [
  {
    id: "libre_anio_bisiesto",
    question: "¿Cuántos días tiene un año bisiesto?",
    options: ["364", "365", "366", "367"],
    correctIndex: 2,
    category: "libre",
    difficulty: "easy",
    tags: ["calendario", "matemáticas"]
  },
  {
    id: "libre_egipto_continente",
    question: "¿En qué continente está Egipto?",
    options: ["Asia", "Europa", "África", "América"],
    correctIndex: 2,
    category: "libre",
    difficulty: "easy",
    tags: ["geografía", "áfrica"]
  },
  {
    id: "libre_planeta_mas_grande",
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Tierra", "Marte", "Júpiter", "Saturno"],
    correctIndex: 2,
    category: "libre",
    difficulty: "easy",
    tags: ["astronomía", "planetas"]
  },
  {
    id: "libre_pelota_naranja",
    question: "¿Qué deporte se juega con una pelota naranja?",
    options: ["Fútbol", "Tenis", "Básquetbol", "Golf"],
    correctIndex: 2,
    category: "libre",
    difficulty: "easy",
    tags: ["deportes", "básquetbol"]
  },
  {
    id: "libre_verano_sur",
    question: "¿En qué mes comienza el verano en el hemisferio sur?",
    options: ["Septiembre", "Diciembre", "Marzo", "Junio"],
    correctIndex: 1,
    category: "libre",
    difficulty: "easy",
    tags: ["estaciones", "hemisferio sur"]
  }
]
