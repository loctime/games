"use client"

import { motion } from "framer-motion"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function PreguntadosResult() {
  const { preguntadosScore, preguntadosQuestions, setScreen, startPreguntadosGame } = useGame()

  const percentage = Math.round((preguntadosScore / preguntadosQuestions.length) * 100)
  
  let message = ""
  let emoji = ""
  
  if (percentage >= 80) {
    message = "¡Excelente!"
    emoji = "🏆"
  } else if (percentage >= 60) {
    message = "¡Muy bien!"
    emoji = "🎉"
  } else if (percentage >= 40) {
    message = "¡Bien hecho!"
    emoji = "👍"
  } else {
    message = "¡Sigue intentando!"
    emoji = "💪"
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
