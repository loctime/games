"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function ImpostorReveal() {
  const { currentPlayerIndex, impostorIndex, impostorWord, nextPlayer } = useGame()
  const [isRevealed, setIsRevealed] = useState(false)
  
  const isImpostor = currentPlayerIndex === impostorIndex

  const handleNext = () => {
    setIsRevealed(false)
    nextPlayer()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-5xl mb-4 block">📱</span>
        <h1 className="text-2xl font-bold text-foreground">
          Jugador {currentPlayerIndex + 1}
        </h1>
        <p className="text-muted-foreground mt-2">
          Pasá el celular al jugador
        </p>
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <GameButton onClick={() => setIsRevealed(true)} size="lg">
                Ver mi rol
              </GameButton>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 15 }}
              className={`
                w-full max-w-xs p-8 rounded-3xl text-center shadow-2xl
                ${isImpostor ? "bg-destructive" : "bg-primary"}
              `}
            >
              {isImpostor ? (
                <>
                  <span className="text-6xl mb-4 block">😈</span>
                  <h2 className="text-2xl font-black text-destructive-foreground">
                    Sos el impostor
                  </h2>
                  <p className="text-destructive-foreground/70 mt-2">
                    No sabés cuál es la palabra secreta
                  </p>
                </>
              ) : (
                <>
                  <span className="text-6xl mb-4 block">🟢</span>
                  <h2 className="text-lg font-semibold text-primary-foreground/80">
                    Tu palabra es:
                  </h2>
                  <p className="text-3xl font-black text-primary-foreground mt-2">
                    {impostorWord}
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-6 pb-4"
        >
          <GameButton onClick={handleNext} variant="secondary" fullWidth size="lg">
            Siguiente jugador
          </GameButton>
        </motion.div>
      )}
    </div>
  )
}
