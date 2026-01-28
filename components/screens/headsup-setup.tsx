"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { CategorySelector } from "@/components/category-selector"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function HeadsupSetup() {
  const { setScreen, headsupCategory, setHeadsupCategory, startHeadsupGame } = useGame()

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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-5xl mb-4 block">🎭</span>
        <h1 className="text-3xl font-bold text-foreground">
          Adivinar en la frente
        </h1>
        <p className="text-muted-foreground mt-2">
          Elegí una categoría
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        <CategorySelector
          selected={headsupCategory}
          onSelect={setHeadsupCategory}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-6 pb-4"
      >
        <GameButton onClick={startHeadsupGame} fullWidth size="lg">
          Empezar
        </GameButton>
      </motion.div>
    </div>
  )
}
