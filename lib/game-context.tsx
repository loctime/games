"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { PreguntadosQuestion } from "../src/lib/preguntados/types"
import { selectQuestions } from "../src/lib/preguntados/selectQuestions"
import type { PlayerProfile, QuestionDifficulty } from "../src/lib/player/types"
import { profileManager } from "../src/lib/player/profile-manager"
import { powerUpManager } from "../src/lib/powerups/power-up-manager"
import { ScoringSystem } from "../src/lib/trivia/scoring"
import type { PowerUpType } from "../src/lib/powerups/types"

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
  | "preguntados-setup"
  | "preguntados-play"
  | "preguntados-result"
  | "stats"

export type Category = "personas" | "objetos" | "animales" | "libre"

interface Question {
  question: string
  options: string[]
  correctIndex: number
  category: Category
}

interface PreguntadosGameState {
  preguntadosQuestions: PreguntadosQuestion[]
  preguntadosCurrentQuestionIndex: number
  preguntadosScore: number
  preguntadosSelectedAnswer: number | null
}

interface GameState {
  currentScreen: Screen
  // Player profile
  playerProfile: PlayerProfile | null
  loadingProfile: boolean
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
  // Preguntados state
  preguntadosCategory: Category
  preguntadosQuestionsCount: number
  preguntadosQuestions: PreguntadosQuestion[]
  preguntadosCurrentQuestionIndex: number
  preguntadosScore: number
  preguntadosSelectedAnswer: number | null
  // Power-ups state
  activePowerUp: PowerUpType | null
  fiftyFiftyOptions: number[] | null
  questionStartTime: number
}

interface GameContextType extends GameState {
  setScreen: (screen: Screen) => void
  // Player profile actions
  loadProfile: () => Promise<void>
  updateProfile: (profile: PlayerProfile) => Promise<void>
  // Heads Up actions
  setHeadsupCategory: (category: Category) => void
  startHeadsupGame: () => void
  markCorrect: () => void
  markPassed: () => void
  resetHeadsup: () => void
  // Impostor actions
  setImpostorCategory: (category: Category) => void
  setImpostorPlayers: (players: number) => void
  startImpostorGame: () => void
  nextPlayer: () => void
  submitVote: (playerIndex: number) => void
  resetImpostor: () => void
  // Preguntados actions
  setPreguntadosCategory: (category: Category) => void
  setPreguntadosQuestionsCount: (count: number) => void
  startPreguntadosGame: () => void
  selectPreguntadosAnswer: (answerIndex: number) => void
  nextPreguntadosQuestion: () => void
  resetPreguntados: () => void
  // Power-up actions
  usePowerUp: (type: PowerUpType) => boolean
  resetPowerUps: () => void
  changeQuestion: () => Promise<void>
  addExtraTime: () => void
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
    playerProfile: null,
    loadingProfile: true,
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
    preguntadosCategory: "animales",
    preguntadosQuestionsCount: 5,
    preguntadosQuestions: [],
    preguntadosCurrentQuestionIndex: 0,
    preguntadosScore: 0,
    preguntadosSelectedAnswer: null,
    activePowerUp: null,
    fiftyFiftyOptions: null,
    questionStartTime: 0,
  })

  const setScreen = (screen: Screen) => {
    setState((prev) => ({ ...prev, currentScreen: screen }))
  }

  // Player profile functions
  const loadProfile = async () => {
    setState(prev => ({ ...prev, loadingProfile: true }))
    
    try {
      let profile = await profileManager.getProfile()
      
      if (!profile) {
        profile = await profileManager.createProfile()
      }
      
      setState(prev => ({ ...prev, playerProfile: profile, loadingProfile: false }))
    } catch (error) {
      console.error('Error loading profile:', error)
      setState(prev => ({ ...prev, loadingProfile: false }))
    }
  }

  const updateProfile = async (profile: PlayerProfile) => {
    try {
      await profileManager.saveProfile(profile)
      setState(prev => ({ ...prev, playerProfile: profile }))
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  // Power-up functions
  const usePowerUp = (type: PowerUpType): boolean => {
    if (!state.playerProfile) return false
    
    if (powerUpManager.canUsePowerUp(type, state.playerProfile.powerUps)) {
      const cost = powerUpManager.getCost(type)
      const updatedProfile = profileManager.usePowerUp(state.playerProfile)
      
      if (updatedProfile.powerUps < state.playerProfile.powerUps) {
        updateProfile(updatedProfile)
        powerUpManager.usePowerUp(type, state.playerProfile.powerUps)
        
        setState(prev => ({ ...prev, activePowerUp: type }))
        return true
      }
    }
    
    return false
  }

  const resetPowerUps = () => {
    powerUpManager.resetGame()
    setState(prev => ({ 
      ...prev, 
      activePowerUp: null, 
      fiftyFiftyOptions: null 
    }))
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

  const setPreguntadosCategory = (category: Category) => {
    setState((prev) => ({ ...prev, preguntadosCategory: category }))
  }

  const setPreguntadosQuestionsCount = (count: number) => {
    setState((prev) => ({ ...prev, preguntadosQuestionsCount: count }))
  }

  const startPreguntadosGame = () => {
    const questions = selectQuestions({
      category: state.preguntadosCategory,
      count: state.preguntadosQuestionsCount
    })
    setState((prev) => ({
      ...prev,
      preguntadosQuestions: questions,
      preguntadosCurrentQuestionIndex: 0,
      preguntadosScore: 0,
      preguntadosSelectedAnswer: null,
      questionStartTime: Date.now(),
      currentScreen: "preguntados-play",
    }))
  }

  const selectPreguntadosAnswer = (answerIndex: number) => {
    setState((prev) => ({ ...prev, preguntadosSelectedAnswer: answerIndex }))
  }

  const nextPreguntadosQuestion = async () => {
    if (!state.playerProfile) return
    
    const currentQuestion = state.preguntadosQuestions[state.preguntadosCurrentQuestionIndex]
    const isCorrect = state.preguntadosSelectedAnswer === currentQuestion?.correctIndex
    
    if (currentQuestion) {
      const timeTaken = (Date.now() - state.questionStartTime) / 1000
      const scoreCalculation = ScoringSystem.calculateScore(
        isCorrect,
        timeTaken,
        30, // 30 segundos por pregunta
        state.playerProfile.streak.current,
        currentQuestion.difficulty,
        currentQuestion.category,
        state.preguntadosQuestions.length,
        state.preguntadosScore
      )
      
      let updatedProfile = profileManager.addXP(state.playerProfile, scoreCalculation.totalXP)
      updatedProfile = profileManager.updateStreak(updatedProfile, isCorrect, currentQuestion.category)
      updatedProfile = profileManager.updateCategoryStats(updatedProfile, currentQuestion.category, isCorrect, timeTaken)
      
      // Check for crown award
      if (isCorrect) {
        updatedProfile = profileManager.checkAndAwardCrown(
          updatedProfile, 
          currentQuestion.category, 
          updatedProfile.categoryStats[currentQuestion.category].currentStreak
        )
        
        // Check for category unlock
        const totalCrowns = profileManager.getTotalCrowns(updatedProfile)
        if (totalCrowns >= 3 && !updatedProfile.categories.unlocked.includes('objetos')) {
          updatedProfile = profileManager.unlockCategory(updatedProfile, 'objetos')
        }
        if (totalCrowns >= 5 && !updatedProfile.categories.unlocked.includes('animales')) {
          updatedProfile = profileManager.unlockCategory(updatedProfile, 'animales')
        }
        if (totalCrowns >= 8 && !updatedProfile.categories.unlocked.includes('libre')) {
          updatedProfile = profileManager.unlockCategory(updatedProfile, 'libre')
        }
      }
      
      if (isCorrect) {
        updatedProfile.questionsAnswered += 1
        updatedProfile.correctAnswers += 1
      } else {
        updatedProfile.questionsAnswered += 1
      }
      
      await updateProfile(updatedProfile)
    }
    
    setState((prev) => {
      const nextIndex = prev.preguntadosCurrentQuestionIndex + 1
      
      if (nextIndex >= prev.preguntadosQuestions.length) {
        return {
          ...prev,
          currentScreen: "preguntados-result",
        }
      }
      
      return {
        ...prev,
        preguntadosCurrentQuestionIndex: nextIndex,
        preguntadosSelectedAnswer: null,
        questionStartTime: Date.now(),
        activePowerUp: null,
        fiftyFiftyOptions: null,
      }
    })
  }

  const changeQuestion = async () => {
    if (!state.playerProfile) return
    
    // Get new question from same category
    const newQuestions = selectQuestions({
      category: state.preguntadosCategory,
      count: 1
    })
    
    if (newQuestions.length > 0) {
      setState((prev) => ({
        ...prev,
        preguntadosQuestions: [
          ...prev.preguntadosQuestions.slice(0, prev.preguntadosCurrentQuestionIndex),
          newQuestions[0],
          ...prev.preguntadosQuestions.slice(prev.preguntadosCurrentQuestionIndex + 1)
        ],
        preguntadosSelectedAnswer: null,
        questionStartTime: Date.now(),
        activePowerUp: null,
        fiftyFiftyOptions: null,
      }))
    }
  }

  const addExtraTime = () => {
    // This will be handled in the component with local state
    console.log('Extra time added')
  }

  const resetPreguntados = () => {
    resetPowerUps()
    setState((prev) => ({
      ...prev,
      preguntadosQuestions: [],
      preguntadosCurrentQuestionIndex: 0,
      preguntadosScore: 0,
      preguntadosSelectedAnswer: null,
    }))
  }

  // Load profile on mount
  useEffect(() => {
    loadProfile()
  }, [])

  return (
    <GameContext.Provider
      value={{
        ...state,
        setScreen,
        loadProfile,
        updateProfile,
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
        setPreguntadosCategory,
        setPreguntadosQuestionsCount,
        startPreguntadosGame,
        selectPreguntadosAnswer,
        nextPreguntadosQuestion,
        resetPreguntados,
        usePowerUp,
        resetPowerUps,
        changeQuestion,
        addExtraTime,
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
