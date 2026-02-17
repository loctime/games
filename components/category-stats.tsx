"use client"

import { motion } from "framer-motion"
import { Trophy, Target, Clock, Flame } from "lucide-react"
import { useGame } from "@/lib/game-context"
import type { Category } from "@/lib/game-context"

interface CategoryStatsProps {
  category: Category
  showDetails?: boolean
}

export function CategoryStats({ category, showDetails = false }: CategoryStatsProps) {
  const { playerProfile } = useGame()

  if (!playerProfile) return null

  const stats = playerProfile.categoryStats[category]
  const accuracy = stats.played > 0 ? Math.round((stats.correct / stats.played) * 100) : 0
  const crowns = playerProfile.categories.crowns[category]
  const isUnlocked = playerProfile.categories.unlocked.includes(category)

  const categoryInfo = {
    personas: { label: "Personas", icon: "👤", color: "blue" },
    objetos: { label: "Objetos", icon: "📦", color: "green" },
    animales: { label: "Animales", icon: "🐾", color: "orange" },
    libre: { label: "Libre", icon: "🎲", color: "purple" }
  }

  const info = categoryInfo[category]

  if (!showDetails) {
    return (
      <div className={`bg-secondary/20 rounded-xl p-3 ${!isUnlocked ? "opacity-50" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{info.icon}</span>
            <span className="font-semibold text-sm">{info.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {isUnlocked ? (
              <>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-bold">{crowns}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-primary" />
                  <span className="text-xs">{accuracy}%</span>
                </div>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">🔒</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-${info.color}-500/10 to-${info.color}-500/5 rounded-2xl p-4 border border-${info.color}-500/20 ${!isUnlocked ? "opacity-50" : ""}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{info.icon}</span>
          <div>
            <h3 className="font-bold text-foreground">{info.label}</h3>
            <p className="text-xs text-muted-foreground">
              {isUnlocked ? "Desbloqueada" : "Bloqueada"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-yellow-500">{crowns}</span>
          </div>
        </div>
      </div>

      {isUnlocked && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-1">
                <Target className="w-3 h-3 text-primary" />
                <span className="text-xs text-muted-foreground">Precisión</span>
              </div>
              <p className="font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">
                {stats.correct}/{stats.played} aciertos
              </p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-muted-foreground">Tiempo</span>
              </div>
              <p className="font-bold text-foreground">
                {stats.averageTime > 0 ? `${Math.round(stats.averageTime)}s` : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">promedio</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-1">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-muted-foreground">Racha</span>
              </div>
              <p className="font-bold text-foreground">{stats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">actual</p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-2">
              <div className="flex items-center gap-1 mb-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Mejor</span>
              </div>
              <p className="font-bold text-foreground">{stats.bestStreak}</p>
              <p className="text-xs text-muted-foreground">racha</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
