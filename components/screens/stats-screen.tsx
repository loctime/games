"use client"

import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Award, Target } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { CategoryStats } from "@/components/category-stats"
import { useGame } from "@/lib/game-context"
import type { Category } from "@/lib/game-context"

export function StatsScreen() {
  const { setScreen, playerProfile } = useGame()

  if (!playerProfile) return null

  const totalAccuracy = playerProfile.questionsAnswered > 0 
    ? Math.round((playerProfile.correctAnswers / playerProfile.questionsAnswered) * 100)
    : 0

  const averageTime = Object.values(playerProfile.categoryStats)
    .reduce((sum, stats) => sum + stats.averageTime, 0) / 4

  const categories: Category[] = ["personas", "objetos", "animales", "libre"]

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
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Estadísticas
        </h1>
        <p className="text-muted-foreground">
          Tu progreso detallado
        </p>
      </motion.div>

      {/* Global Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 border border-primary/20 mb-6"
      >
        <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Rendimiento General
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalAccuracy}%</div>
            <p className="text-sm text-muted-foreground">Precisión total</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{playerProfile.gamesPlayed}</div>
            <p className="text-sm text-muted-foreground">Partidas jugadas</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{playerProfile.streak.best}</div>
            <p className="text-sm text-muted-foreground">Mejor racha</p>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {averageTime > 0 ? `${Math.round(averageTime)}s` : "N/A"}
            </div>
            <p className="text-sm text-muted-foreground">Tiempo promedio</p>
          </div>
        </div>
      </motion.div>

      {/* Category Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 space-y-4"
      >
        <h2 className="font-bold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5" />
          Estadísticas por Categoría
        </h2>
        
        <div className="space-y-3">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <CategoryStats category={category} showDetails={true} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Logros
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🏆</div>
            <p className="font-semibold text-sm">Experto</p>
            <p className="text-xs text-muted-foreground">
              {totalAccuracy >= 80 ? "¡Desbloqueado!" : `${80 - totalAccuracy}% para desbloquear`}
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <p className="font-semibold text-sm">En llamas</p>
            <p className="text-xs text-muted-foreground">
              {playerProfile.streak.best >= 10 ? "¡Desbloqueado!" : `${10 - playerProfile.streak.best} racha para desbloquear`}
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <p className="font-semibold text-sm">Veloz</p>
            <p className="text-xs text-muted-foreground">
              {averageTime > 0 && averageTime <= 10 ? "¡Desbloqueado!" : "Tiempo < 10s para desbloquear"}
            </p>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">👑</div>
            <p className="font-semibold text-sm">Coleccionista</p>
            <p className="text-xs text-muted-foreground">
              {Object.values(playerProfile.categories.crowns).reduce((sum, c) => sum + c, 0) >= 10 ? "¡Desbloqueado!" : "10 coronas para desbloquear"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
