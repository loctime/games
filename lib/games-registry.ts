export type GameType = "native" | "iframe"

export interface GameEntry {
  id: string
  title: string
  icon: string
  description: string
  type: GameType
  /** Screen ID for native games (setScreen target) */
  screen?: string
  /** URL for iframe games */
  url?: string
  variant?: "primary" | "accent" | "secondary"
  group: "group" | "solo"
}

export const GAMES: GameEntry[] = [
  {
    id: "headsup",
    title: "Adivinar en la frente",
    icon: "🎭",
    description: "Adivina palabras con las pistas de tus amigos",
    type: "native",
    screen: "headsup-setup",
    variant: "primary",
    group: "group",
  },
  {
    id: "impostor",
    title: "Impostor",
    icon: "🕵️",
    description: "Encontrá al impostor entre los jugadores",
    type: "native",
    screen: "impostor-setup",
    variant: "accent",
    group: "group",
  },
  {
    id: "preguntados",
    title: "Preguntados",
    icon: "❓",
    description: "Trivia de preguntas y respuestas",
    type: "native",
    screen: "preguntados-setup",
    variant: "primary",
    group: "group",
  },
  {
    id: "rompecabeza",
    title: "Rompecoco",
    icon: "🧩",
    description: "Armá puzzles de imágenes",
    type: "iframe",
    url: process.env.NEXT_PUBLIC_ROMPECABEZA_URL ?? "",
    variant: "accent",
    group: "solo",
  },
  {
    id: "afkrpg",
    title: "AFK RPG",
    icon: "⚔️",
    description: "RPG idle: tu héroe pelea solo",
    type: "iframe",
    url: process.env.NEXT_PUBLIC_JUEGUETECLAUDE_URL ?? "",
    variant: "primary",
    group: "solo",
  },
  {
    id: "soulpet",
    title: "SoulPet",
    icon: "🐾",
    description: "Mascota virtual con alma propia",
    type: "iframe",
    url: process.env.NEXT_PUBLIC_SOULPET_URL ?? "",
    variant: "accent",
    group: "solo",
  },
  {
    id: "arrowz",
    title: "Arrowz",
    icon: "🏹",
    description: "Puzzle de flechas y caminos",
    type: "iframe",
    url: process.env.NEXT_PUBLIC_ARROWZ_URL ?? "",
    variant: "secondary",
    group: "solo",
  },
]

export function getGameById(id: string): GameEntry | undefined {
  return GAMES.find((g) => g.id === id)
}
