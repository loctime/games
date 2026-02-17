"use client"

import { motion } from "framer-motion"
import { Trophy, Flame, Star, Zap } from "lucide-react"
import { useGame } from "@/lib/game-context"
import type { PlayerProfile } from "@/src/lib/player/types"

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

  const xpPercentage = (playerProfile.level.currentXP / playerProfile.level.xpToNext) * 100

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
              {playerProfile.level.level}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground">Nivel {playerProfile.level.level}</p>
            <p className="text-xs text-muted-foreground">
              {playerProfile.level.currentXP} / {playerProfile.level.xpToNext} XP
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-warning" />
          <span className="font-semibold text-warning">{playerProfile.powerUps}</span>
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
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-secondary/50 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className="w-3 h-3 text-orange-500" />
            <span className="text-xs text-muted-foreground">Racha</span>
          </div>
          <p className="font-bold text-foreground">{playerProfile.streak.current}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span className="text-xs text-muted-foreground">Partidas</span>
          </div>
          <p className="font-bold text-foreground">{playerProfile.gamesPlayed}</p>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-3 h-3 text-green-500" />
            <span className="text-xs text-muted-foreground">Aciertos</span>
          </div>
          <p className="font-bold text-foreground">
            {playerProfile.questionsAnswered > 0 
              ? Math.round((playerProfile.correctAnswers / playerProfile.questionsAnswered) * 100)
              : 0}%
          </p>
        </div>
      </div>
    </motion.div>
  )
}
