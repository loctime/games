export type PowerUpType = "fifty_fifty" | "change_question" | "extra_time"

export interface PowerUp {
  id: PowerUpType
  name: string
  description: string
  cost: number
  icon: string
  maxPerGame: number
}

export interface PowerUpState {
  available: PowerUpType[]
  usedInGame: Record<PowerUpType, number>
  active: PowerUpType | null
}

export const POWER_UPS: Record<PowerUpType, PowerUp> = {
  fifty_fifty: {
    id: "fifty_fifty",
    name: "50/50",
    description: "Elimina 2 opciones incorrectas",
    cost: 1,
    icon: "✂️",
    maxPerGame: 3
  },
  change_question: {
    id: "change_question",
    name: "Cambiar Pregunta",
    description: "Reemplaza la pregunta actual",
    cost: 2,
    icon: "🔄",
    maxPerGame: 2
  },
  extra_time: {
    id: "extra_time",
    name: "Tiempo Extra",
    description: "Añade 15 segundos al reloj",
    cost: 1,
    icon: "⏰",
    maxPerGame: 3
  }
}
