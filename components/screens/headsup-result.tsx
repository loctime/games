"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function HeadsupResult() {
  const { headsupCorrect, headsupPassed, setScreen, resetHeadsup, startHeadsupGame } = useGame()

  const handlePlayAgain = () => {
    resetHeadsup()
    startHeadsupGame()
  }

  const handleGoHome = () => {
    resetHeadsup()
    setScreen("home")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <span className="text-6xl mb-4 block">🎉</span>
        <h1 className="text-4xl font-black text-foreground">
          {headsupCorrect.length}
        </h1>
        <p className="text-muted-foreground text-xl mt-1">
          palabras correctas
        </p>
      </motion.div>

      <div className="flex-1 overflow-auto">
        {headsupCorrect.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-success font-bold mb-3 flex items-center gap-2">
              <Check className="w-5 h-5" />
              Correctas ({headsupCorrect.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {headsupCorrect.map((word, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-success/20 text-success rounded-xl text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {headsupPassed.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-destructive font-bold mb-3 flex items-center gap-2">
              <X className="w-5 h-5" />
              Pasadas ({headsupPassed.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {headsupPassed.map((word, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-destructive/20 text-destructive rounded-xl text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 pt-6"
      >
        <GameButton onClick={handlePlayAgain} fullWidth size="lg">
          Jugar otra vez
        </GameButton>
        <GameButton onClick={handleGoHome} variant="secondary" fullWidth size="md">
          Volver al inicio
        </GameButton>
      </motion.div>
    </div>
  )
}
