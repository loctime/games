"use client"

import { motion } from "framer-motion"
import { Trophy, Gamepad2, Zap } from "lucide-react"
import { useGame } from "@/lib/game-context"

export function PlayerProfile() {
  const { playerProfile, loadingProfile } = useGame()

  if (loadingProfile || !playerProfile) {
    return (
      <div className="bg-secondary/20 rounded-2xl p-4 animate-pulse">
        <div className="h-4 bg-secondary rounded w-24 mb-2"></div>
        <div className="h-3 bg-secondary rounded w-16"></div>
      </div>
    )
  }

  const p = playerProfile as any
  const xpInLevel = p.totalXP % 1000
  const xpPercentage = xpInLevel / 10

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              {p.level}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Nivel {p.level}</p>
            <p className="text-xs text-muted-foreground">
              {xpInLevel} / 1000 XP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-warning" />
          <span className="font-semibold text-warning">{p.totalXP} XP</span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-3">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="bg-secondary/50 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Partidas</span>
          </div>
          <p className="font-bold text-foreground">{p.gamesPlayed}</p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Gamepad2 className="w-3 h-3 text-green-500" />
            <span className="text-xs text-muted-foreground">Juegos</span>
          </div>
          <p className="font-bold text-foreground">{p.gamesUnique?.length ?? 0}</p>
        </div>
      </div>
    </motion.div>
  )
}
