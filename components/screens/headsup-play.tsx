"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function HeadsupPlay() {
  const { headsupCurrentWord, markCorrect, markPassed, setScreen } = useGame()
  const [timeLeft, setTimeLeft] = useState(60)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleCorrect = useCallback(() => {
    markCorrect()
    setIsRevealed(false)
  }, [markCorrect])

  const handlePass = useCallback(() => {
    markPassed()
    setIsRevealed(false)
  }, [markPassed])

  useEffect(() => {
    if (timeLeft <= 0 || !headsupCurrentWord) {
      setScreen("headsup-result")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, headsupCurrentWord, setScreen])

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta || 0
      
      if (beta < -30) {
        handleCorrect()
      } else if (beta > 50) {
        handlePass()
      }
    }

    if (typeof DeviceOrientationEvent !== "undefined") {
      window.addEventListener("deviceorientation", handleOrientation)
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [handleCorrect, handlePass])

  const progress = (timeLeft / 60) * 100

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Timer bar */}
      <div className="h-2 bg-secondary">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Timer display */}
      <div className="text-center py-4">
        <span className={`text-4xl font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
          {timeLeft}
        </span>
      </div>

      {/* Word display */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={headsupCurrentWord}
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {!isRevealed ? (
              <button
                onClick={() => setIsRevealed(true)}
                className="p-8 bg-card rounded-3xl shadow-xl"
              >
                <p className="text-muted-foreground mb-2">Toca para revelar</p>
                <span className="text-4xl">🤫</span>
              </button>
            ) : (
              <div className="p-8 bg-card rounded-3xl shadow-xl">
                <h1 className="text-4xl font-black text-foreground tracking-tight text-balance">
                  {headsupCurrentWord}
                </h1>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="text-center text-muted-foreground text-sm px-6 pb-4">
        <p>Inclinar arriba = correcto</p>
        <p>Inclinar abajo = pasar</p>
      </div>

      {/* Fallback buttons */}
      <div className="flex gap-4 p-6">
        <GameButton onClick={handleCorrect} variant="success" fullWidth size="lg">
          <Check className="w-6 h-6" />
          Correcto
        </GameButton>
        <GameButton onClick={handlePass} variant="danger" fullWidth size="lg">
          <X className="w-6 h-6" />
          Pasar
        </GameButton>
      </div>
    </div>
  )
}
