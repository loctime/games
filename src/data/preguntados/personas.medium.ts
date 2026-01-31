import type { PreguntadosQuestion } from "../../lib/preguntados/types"

export const personasMediumQuestions: PreguntadosQuestion[] = [
  {
    id: "personas_velazquez_meninas",
    question: "¿Quién pintó 'Las Meninas'?",
    options: ["Picasso", "Dalí", "Velázquez", "Goya"],
    correctIndex: 2,
    category: "personas",
    difficulty: "medium",
    tags: ["arte", "pintura"]
  },
  {
    id: "personas_marie_curie_nobel",
    question: "¿Quién fue la primera mujer en ganar un Premio Nobel?",
    options: ["Marie Curie", "Rosa Parks", "Frida Kahlo", "Ada Lovelace"],
    correctIndex: 0,
    category: "personas",
    difficulty: "medium",
    tags: ["ciencia", "mujeres"]
  }
]
