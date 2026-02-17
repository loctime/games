"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Crown, Zap } from "lucide-react"
import { CategorySelector } from "@/components/category-selector"
import { GameButton } from "@/components/game-button"
import { PlayerProfile } from "@/components/player-profile"
import { useGame } from "@/lib/game-context"
import type { Category } from "@/lib/game-context"

export function PreguntadosSetup() {
  const { 
    setScreen, 
    preguntadosCategory, 
    setPreguntadosCategory,
    preguntadosQuestionsCount,
    setPreguntadosQuestionsCount,
    startPreguntadosGame,
    playerProfile,
    updateProfile
  } = useGame()

  const questionsOptions = [5, 10, 15]
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  const isCategoryUnlocked = (category: Category) => {
    if (!playerProfile) return category === "personas"
    return playerProfile.categories.unlocked.includes(category)
  }

  const getCategoryRequiredCrowns = (category: Category) => {
    if (!playerProfile) return 0
    return playerProfile.categories.requiredCrowns[category]
  }

  const getTotalCrowns = () => {
    if (!playerProfile) return 0
    return Object.values(playerProfile.categories.crowns).reduce((sum, crowns) => sum + crowns, 0)
  }

  const handleStartGame = () => {
    if (playerProfile) {
      const updatedProfile = {
        ...playerProfile,
        difficulty: selectedDifficulty
      }
      updateProfile(updatedProfile)
    }
    startPreguntadosGame()
  }

  const getDifficultyColor = (diff: 'easy' | 'medium' | 'hard') => {
    switch(diff) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
    }
  }

  const getDifficultyLabel = (diff: 'easy' | 'medium' | 'hard') => {
    switch(diff) {
      case 'easy': return 'Fácil'
      case 'medium': return 'Normal'
      case 'hard': return 'Difícil'
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setScreen("home")}
        className="flex items-center gap-2 text-muted-foreground self-start"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </motion.button>

      {/* Player Profile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <PlayerProfile />
      </motion.div>

      {/* Power-ups Indicator */}
      {playerProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-warning/10 to-orange-500/10 rounded-2xl p-4 border border-warning/20 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              <span className="font-semibold text-foreground">Power-ups disponibles</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl text-warning">{playerProfile.powerUps}</p>
              <p className="text-xs text-muted-foreground">Usa sabiamente</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Crown Status */}
      {playerProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-500/20 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-foreground">Coronas</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl text-yellow-500">{getTotalCrowns()}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Difficulty Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Dificultad
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <motion.button
              key={diff}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDifficulty(diff)}
              className={`
                p-4 rounded-xl font-bold transition-all duration-200
                ${selectedDifficulty === diff
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              <div className={`text-2xl mb-1 ${getDifficultyColor(diff)}`}>
                {diff === 'easy' ? '😊' : diff === 'medium' ? '😐' : '😰'}
              </div>
              <div>{getDifficultyLabel(diff)}</div>
              <div className="text-xs text-muted-foreground">
                {diff === 'easy' ? '100 XP' : diff === 'medium' ? '150 XP' : '200 XP'}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-5xl mb-4 block">❓</span>
        <h1 className="text-3xl font-bold text-foreground">
          Preguntados
        </h1>
        <p className="text-muted-foreground mt-2">
          Trivia para jugar en grupo
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Categoría
          </h2>
          <CategorySelector
            selected={preguntadosCategory}
            onSelect={setPreguntadosCategory}
            showLocked={true}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Número de preguntas
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {questionsOptions.map((count) => (
              <motion.button
                key={count}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreguntadosQuestionsCount(count)}
                className={`
                  p-4 rounded-2xl flex flex-col items-center gap-2 transition-all
                  ${preguntadosQuestionsCount === count
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground"
                  }
                `}
              >
                <span className="text-2xl font-bold">{count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-6 pb-4"
      >
        <GameButton onClick={handleStartGame} fullWidth={true}>
          Empezar ({getDifficultyLabel(selectedDifficulty)})
        </GameButton>
      </motion.div>
    </div>
  )
}
