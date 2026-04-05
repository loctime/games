"use client"

import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Award, Gamepad2, Zap } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function StatsScreen() {
  const { setScreen, playerProfile } = useGame()

  if (!playerProfile) return null

  const p = playerProfile as any
  const xpInLevel = p.totalXP % 1000
  const xpPercentage = xpInLevel / 10

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setScreen("home")}
        className="flex items-center gap-2 text-muted-foreground self-start mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Estadísticas</h1>
        <p className="text-muted-foreground">Tu progreso en la plataforma</p>
      </motion.div>

      {/* Level & XP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20 mb-6"
      >
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Nivel Global
        </h2>

        <div className="flex items-center gap-4 mb-3">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-black text-xl">{p.level}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{xpInLevel} / 1000 XP al siguiente nivel</p>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{p.totalXP}</div>
            <p className="text-sm text-muted-foreground">XP total</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{p.gamesPlayed}</div>
            <p className="text-sm text-muted-foreground">Partidas jugadas</p>
          </div>
        </div>
      </motion.div>

      {/* Games played */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 border border-border mb-6"
      >
        <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" />
          Juegos explorados
        </h2>

        {p.gamesUnique?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {p.gamesUnique.map((id: string) => (
              <span
                key={id}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {id}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Todavía no jugaste ningún juego externo.</p>
        )}
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Logros desbloqueados
        </h2>

        {p.achievements?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {p.achievements.map((id: string) => (
              <span
                key={id}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                {id}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Jugá más partidas para desbloquear logros.</p>
        )}
      </motion.div>
    </div>
  )
}
