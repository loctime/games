"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Zap, TrendingUp } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { PlayerProfile } from "@/components/player-profile"
import { useGame } from "@/lib/game-context"

export function PreguntadosResult() {
  const { preguntadosScore, preguntadosQuestions, setScreen, startPreguntadosGame, playerProfile } = useGame()

  const percentage = Math.round((preguntadosScore / preguntadosQuestions.length) * 100)
  
  let message = ""
  let emoji = ""
  let xpGained = 0
  
  if (percentage >= 80) {
    message = "¡Excelente!"
    emoji = "🏆"
    xpGained = preguntadosScore * 150 // 1.5x bonus para excelentes
  } else if (percentage >= 60) {
    message = "¡Muy bien!"
    emoji = "🎉"
    xpGained = preguntadosScore * 120 // 1.2x bonus para muy bien
  } else if (percentage >= 40) {
    message = "¡Bien hecho!"
    emoji = "👍"
    xpGained = preguntadosScore * 100 // XP normal
  } else {
    message = "¡Sigue intentando!"
    emoji = "💪"
    xpGained = preguntadosScore * 80 // 0.8x para mejorar
  }

  // Bonus por juego perfecto
  if (percentage === 100) {
    xpGained += 50
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-12 pb-8"
      >
        <span className="text-6xl mb-4 block">{emoji}</span>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {message}
        </h1>
        <p className="text-muted-foreground text-lg">
          Resultados de Preguntados
        </p>
      </motion.div>

      {/* XP Gained Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-warning" />
            <span className="font-semibold text-foreground">XP Ganado</span>
          </div>
          <div className="text-right">
            <p className="font-bold text-2xl text-warning">+{xpGained}</p>
            {percentage === 100 && (
              <p className="text-xs text-success">¡Perfecto! +50 bonus</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Updated Profile */}
      {playerProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <PlayerProfile />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center"
      >
        <div className="text-center mb-8">
          <div className="text-5xl font-black text-primary mb-2">
            {preguntadosScore}/{preguntadosQuestions.length}
          </div>
          <p className="text-xl text-muted-foreground">
            {percentage}% de aciertos
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GameButton 
              onClick={startPreguntadosGame} 
              fullWidth 
              size="lg"
              variant="primary"
            >
              Jugar otra vez
            </GameButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GameButton 
              onClick={() => setScreen("home")} 
              fullWidth 
              size="lg"
              variant="secondary"
            >
              Volver al inicio
            </GameButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
