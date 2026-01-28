"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Screen =
  | "home"
  | "headsup-setup"
  | "headsup-play"
  | "headsup-result"
  | "impostor-setup"
  | "impostor-reveal"
  | "impostor-debate"
  | "impostor-vote"
  | "impostor-result"

export type Category = "personas" | "objetos" | "animales" | "libre"

interface GameState {
  currentScreen: Screen
  // Heads Up state
  headsupCategory: Category
  headsupWords: string[]
  headsupCorrect: string[]
  headsupPassed: string[]
  headsupCurrentWord: string
  // Impostor state
  impostorCategory: Category
  impostorPlayers: number
  impostorWord: string
  impostorIndex: number
  currentPlayerIndex: number
  votes: number[]
}

interface GameContextType extends GameState {
  setScreen: (screen: Screen) => void
  setHeadsupCategory: (category: Category) => void
  startHeadsupGame: () => void
  markCorrect: () => void
  markPassed: () => void
  resetHeadsup: () => void
  setImpostorCategory: (category: Category) => void
  setImpostorPlayers: (players: number) => void
  startImpostorGame: () => void
  nextPlayer: () => void
  submitVote: (playerIndex: number) => void
  resetImpostor: () => void
}

const wordsByCategory: Record<Category, string[]> = {
  personas: [
    "MESSI", "SHAKIRA", "EINSTEIN", "PAPA FRANCISCO", "MICHAEL JACKSON",
    "FRIDA KAHLO", "MARADONA", "BEYONCÉ", "TAYLOR SWIFT", "ELON MUSK",
    "MADONNA", "CRISTIANO RONALDO", "RIHANNA", "BRAD PITT", "CHAYANNE"
  ],
  objetos: [
    "TELÉFONO", "HELADERA", "BICICLETA", "GUITARRA", "TELEVISOR",
    "SILLA", "COMPUTADORA", "CÁMARA", "RELOJ", "ESPEJO",
    "LÁMPARA", "MALETA", "PARAGUAS", "BILLETERA", "AURICULARES"
  ],
  animales: [
    "ELEFANTE", "JIRAFA", "DELFÍN", "PINGÜINO", "CANGURO",
    "COCODRILO", "MARIPOSA", "TIBURÓN", "LEÓN", "SERPIENTE",
    "ÁGUILA", "TORTUGA", "PULPO", "FLAMENCO", "KOALA"
  ],
  libre: [
    "PIZZA", "PLAYA", "CUMPLEAÑOS", "NETFLIX", "FÚTBOL",
    "NAVIDAD", "HOSPITAL", "UNIVERSIDAD", "AEROPUERTO", "CARNAVAL",
    "INSTAGRAM", "CONCIERTO", "GIMNASIO", "SUPERMERCADO", "KARAOKE"
  ],
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    currentScreen: "home",
    headsupCategory: "animales",
    headsupWords: [],
    headsupCorrect: [],
    headsupPassed: [],
    headsupCurrentWord: "",
    impostorCategory: "animales",
    impostorPlayers: 4,
    impostorWord: "",
    impostorIndex: -1,
    currentPlayerIndex: 0,
    votes: [],
  })

  const setScreen = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }

  const setHeadsupCategory = (category: Category) => {
    setState((prev) => ({ ...prev, headsupCategory: category }))
  }

  const startHeadsupGame = () => {
    const words = [...wordsByCategory[state.headsupCategory]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
    setState((prev) => ({
      ...prev,
      headsupWords: words.slice(1),
      headsupCurrentWord: words[0],
      headsupCorrect: [],
      headsupPassed: [],
      currentScreen: "headsup-play",
    }))
  }

  const markCorrect = () => {
    setState((prev) => {
      const newCorrect = [...prev.headsupCorrect, prev.headsupCurrentWord]
      const nextWord = prev.headsupWords[0] || ""
      const remainingWords = prev.headsupWords.slice(1)
      return {
        ...prev,
        headsupCorrect: newCorrect,
        headsupCurrentWord: nextWord,
        headsupWords: remainingWords,
      }
    })
  }

  const markPassed = () => {
    setState((prev) => {
      const newPassed = [...prev.headsupPassed, prev.headsupCurrentWord]
      const nextWord = prev.headsupWords[0] || ""
      const remainingWords = prev.headsupWords.slice(1)
      return {
        ...prev,
        headsupPassed: newPassed,
        headsupCurrentWord: nextWord,
        headsupWords: remainingWords,
      }
    })
  }

  const resetHeadsup = () => {
    setState((prev) => ({
      ...prev,
      headsupWords: [],
      headsupCorrect: [],
      headsupPassed: [],
      headsupCurrentWord: "",
    }))
  }

  const setImpostorCategory = (category: Category) => {
    setState((prev) => ({ ...prev, impostorCategory: category }))
  }

  const setImpostorPlayers = (players: number) => {
    setState((prev) => ({ ...prev, impostorPlayers: players }))
  }

  const startImpostorGame = () => {
    const words = wordsByCategory[state.impostorCategory]
    const randomWord = words[Math.floor(Math.random() * words.length)]
    const impostorIndex = Math.floor(Math.random() * state.impostorPlayers)
    setState((prev) => ({
      ...prev,
      impostorWord: randomWord,
      impostorIndex: impostorIndex,
      currentPlayerIndex: 0,
      votes: [],
      currentScreen: "impostor-reveal",
    }))
  }

  const nextPlayer = () => {
    setState((prev) => {
      const nextIndex = prev.currentPlayerIndex + 1
      if (nextIndex >= prev.impostorPlayers) {
        return { ...prev, currentScreen: "impostor-debate" }
      }
      return { ...prev, currentPlayerIndex: nextIndex }
    })
  }

  const submitVote = (playerIndex: number) => {
    setState((prev) => ({
      ...prev,
      votes: [...prev.votes, playerIndex],
    }))
  }

  const resetImpostor = () => {
    setState((prev) => ({
      ...prev,
      impostorWord: "",
      impostorIndex: -1,
      currentPlayerIndex: 0,
      votes: [],
    }))
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        setScreen,
        setHeadsupCategory,
        startHeadsupGame,
        markCorrect,
        markPassed,
        resetHeadsup,
        setImpostorCategory,
        setImpostorPlayers,
        startImpostorGame,
        nextPlayer,
        submitVote,
        resetImpostor,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
