"use client"

import { motion } from "framer-motion"
import { GameTile } from "@/components/game-tile"
import { useGame } from "@/lib/game-context"

export function HomeScreen() {
  const { setScreen } = useGame()

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-12 pb-8"
      >
        <h1 className="text-5xl font-black text-foreground tracking-tight">
          Pasala
        </h1>
        <p className="text-muted-foreground mt-3 text-lg leading-relaxed text-balance">
          Juegos rápidos para jugar en grupo con un solo celular
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col gap-5 justify-center max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GameTile
            icon="🎭"
            title="Adivinar en la frente"
            variant="primary"
            onClick={() => setScreen("headsup-setup")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GameTile
            icon="🕵️"
            title="Impostor"
            variant="accent"
            onClick={() => setScreen("impostor-setup")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GameTile
            icon="❓"
            title="Preguntados"
            variant="primary"
            onClick={() => setScreen("preguntados-setup")}
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-muted-foreground text-sm pb-6"
      >
        Toca un juego para comenzar
      </motion.p>
    </div>
  )
}
