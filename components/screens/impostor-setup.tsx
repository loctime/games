"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { CategorySelector } from "@/components/category-selector"
import { PlayerSelector } from "@/components/player-selector"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function ImpostorSetup() {
  const {
    setScreen,
    impostorCategory,
    setImpostorCategory,
    impostorPlayers,
    setImpostorPlayers,
    startImpostorGame,
  } = useGame()

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
        className="text-center py-6"
      >
        <span className="text-5xl mb-4 block">🕵️</span>
        <h1 className="text-3xl font-bold text-foreground">
          Impostor
        </h1>
        <p className="text-muted-foreground mt-2">
          Configurá la partida
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Jugadores</h2>
        <PlayerSelector
          value={impostorPlayers}
          onChange={setImpostorPlayers}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Categoría</h2>
        <CategorySelector
          selected={impostorCategory}
          onSelect={setImpostorCategory}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-6 pb-4"
      >
        <GameButton onClick={startImpostorGame} fullWidth size="lg">
          Repartir roles
        </GameButton>
      </motion.div>
    </div>
  )
}
