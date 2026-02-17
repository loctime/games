"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Lock, Crown } from "lucide-react"
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
    playerProfile 
  } = useGame()

  const questionsOptions = [5, 10, 15]

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

      {/* Crown Status */}
      {playerProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-500/20 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-foreground">Coronas</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-yellow-500">{getTotalCrowns()}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        </motion.div>
      )}

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
        <GameButton onClick={startPreguntadosGame} fullWidth size="lg">
          Empezar
        </GameButton>
      </motion.div>
    </div>
  )
}
