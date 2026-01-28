"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function ImpostorDebate() {
  const { setScreen, impostorPlayers } = useGame()
  const [timeLeft, setTimeLeft] = useState(impostorPlayers * 20) // 20 seconds per player

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-6xl mb-4 block">💬</span>
        <h1 className="text-3xl font-bold text-foreground">
          Debate
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 flex flex-col items-center justify-center"
      >
        <div className="bg-card rounded-3xl p-8 shadow-xl text-center w-full max-w-sm">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-lg text-foreground leading-relaxed text-balance">
            Todos digan una palabra relacionada con el tema
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            El impostor debe disimular
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground text-sm mb-2">Tiempo restante</p>
          <span className={`text-5xl font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
            {formatTime(timeLeft)}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-6 pb-4"
      >
        <GameButton onClick={() => setScreen("impostor-vote")} fullWidth size="lg">
          Votar
        </GameButton>
      </motion.div>
    </div>
  )
}
