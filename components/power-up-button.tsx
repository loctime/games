"use client"

import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { POWER_UPS } from "@/src/lib/powerups/types"
import type { PowerUpType } from "@/src/lib/powerups/types"

interface PowerUpButtonProps {
  type: PowerUpType
  disabled?: boolean
  onUse?: () => void
}

export function PowerUpButton({ type, disabled = false, onUse }: PowerUpButtonProps) {
  const { playerProfile, usePowerUp } = useGame()
  
  if (!playerProfile) return null

  const powerUp = POWER_UPS[type]
  const canUse = playerProfile.powerUps >= powerUp.cost && !disabled

  const handleUse = () => {
    if (canUse) {
      const success = usePowerUp(type)
      if (success && onUse) {
        onUse()
      }
    }
  }

  return (
    <motion.button
      whileTap={{ scale: canUse ? 0.95 : 1 }}
      whileHover={{ scale: canUse ? 1.05 : 1 }}
      onClick={handleUse}
      disabled={!canUse}
      className={`
        relative p-3 rounded-xl transition-all duration-200
        ${canUse 
          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl" 
          : "bg-secondary text-secondary-foreground opacity-50 cursor-not-allowed"
        }
      `}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl">{powerUp.icon}</span>
        <span className="text-xs font-semibold">{powerUp.name}</span>
        <div className="flex items-center gap-1">
          <span className="text-xs">{powerUp.cost}</span>
          <span className="text-xs">⚡</span>
        </div>
      </div>
      
      {!canUse && playerProfile.powerUps < powerUp.cost && (
        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
          <span className="text-xs text-white">
            Necesitas {powerUp.cost} ⚡
          </span>
        </div>
      )}
    </motion.button>
  )
}
