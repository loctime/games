"use client"

import { motion } from "framer-motion"
import { Lock, Crown } from "lucide-react"
import type { Category } from "@/lib/game-context"
import { useGame } from "@/lib/game-context"

interface CategorySelectorProps {
  selected: Category
  onSelect: (category: Category) => void
  showLocked?: boolean
}

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "personas", label: "Personas", icon: "👤" },
  { id: "objetos", label: "Objetos", icon: "📦" },
  { id: "animales", label: "Animales", icon: "🐾" },
  { id: "libre", label: "Libre", icon: "🎲" },
]

export function CategorySelector({ selected, onSelect, showLocked = false }: CategorySelectorProps) {
  const { playerProfile } = useGame()

  const isCategoryUnlocked = (category: Category) => {
    if (!playerProfile) return category === "personas"
    return playerProfile.categories.unlocked.includes(category)
  }

  const getCategoryRequiredCrowns = (category: Category) => {
    if (!playerProfile) return 0
    return playerProfile.categories.requiredCrowns[category]
  }

  const getTotalCrowns = () => {
    if (!playerProfile) return 0
    return Object.values(playerProfile.categories.crowns).reduce((sum, crowns) => sum + crowns, 0)
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => {
        const isUnlocked = isCategoryUnlocked(category.id)
        const requiredCrowns = getCategoryRequiredCrowns(category.id)
        const totalCrowns = getTotalCrowns()
        const canUnlock = totalCrowns >= requiredCrowns

        if (!showLocked && !isUnlocked) return null

        return (
          <motion.button
            key={category.id}
            whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
            onClick={() => isUnlocked && onSelect(category.id)}
            disabled={!isUnlocked}
            className={`
              p-5 rounded-2xl flex flex-col items-center gap-2 transition-all relative
              ${isUnlocked
                ? selected === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                : canUnlock
                  ? "bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500"
                  : "bg-secondary/30 text-muted-foreground cursor-not-allowed"
              }
            `}
          >
            {!isUnlocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4" />
              </div>
            )}
            
            <span className="text-3xl">{category.icon}</span>
            <span className="font-semibold">{category.label}</span>
            
            {!isUnlocked && (
              <div className="flex items-center gap-1 text-xs">
                <Crown className="w-3 h-3" />
                <span>{requiredCrowns}</span>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
