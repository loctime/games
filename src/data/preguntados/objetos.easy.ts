import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const objetosEasyQuestions: PreguntadosQuestion[] = [
  {
    id: "objetos_telefono_distancia",
    question: "¿Qué objeto se usa para comunicarse a distancia?",
    options: ["Teléfono", "Televisor", "Radio", "Computadora"],
    correctIndex: 0,
    category: "objetos",
    difficulty: "easy",
    tags: ["comunicación", "tecnología"]
  },
  {
    id: "objetos_heladera_fria",
    question: "¿En qué electrodoméstico se guarda la comida fría?",
    options: ["Horno", "Microondas", "Heladera", "Lavarropas"],
    correctIndex: 2,
    category: "objetos",
    difficulty: "easy",
    tags: ["cocina", "electrodomésticos"]
  },
  {
    id: "objetos_guitarra_cuerdas",
    question: "¿Qué objeto musical tiene 6 cuerdas?",
    options: ["Violín", "Guitarra", "Piano", "Batería"],
    correctIndex: 1,
    category: "objetos",
    difficulty: "easy",
    tags: ["música", "instrumentos"]
  },
  {
    id: "objetos_camara_fotos",
    question: "¿Qué se usa para tomar fotos?",
    options: ["Binoculares", "Cámara", "Telescopio", "Lupa"],
    correctIndex: 1,
    category: "objetos",
    difficulty: "easy",
    tags: ["fotografía", "tecnología"]
  },
  {
    id: "objetos_reloj_hora",
    question: "¿Qué objeto indica la hora?",
    options: ["Brújula", "Termómetro", "Reloj", "Barómetro"],
    correctIndex: 2,
    category: "objetos",
    difficulty: "easy",
    tags: ["tiempo", "medición"]
  }
]
