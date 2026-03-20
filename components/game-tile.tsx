"use client"

import { motion } from "framer-motion"

interface GameTileProps {
  icon: string | React.ReactNode
  title: string
  description?: string
  onClick: () => void
  variant?: "primary" | "accent" | "secondary"
  compact?: boolean
}

export function GameTile({ icon, title, description, onClick, variant = "primary", compact = false }: GameTileProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full rounded-2xl flex items-center gap-3 text-left
        transition-all duration-200 shadow-md active:shadow-sm
        ${compact ? "p-3" : "p-5 flex-col items-center text-center gap-2"}
        ${variant === "primary"
          ? "bg-primary text-primary-foreground"
          : variant === "accent"
          ? "bg-accent text-accent-foreground"
          : "bg-secondary text-secondary-foreground"
        }
      `}
    >
      <span className={compact ? "text-3xl shrink-0" : "text-5xl"}>{icon}</span>
      <div className={compact ? "flex-1 min-w-0" : ""}>
        <span className={`font-bold block ${compact ? "text-sm leading-tight" : "text-lg"}`}>{title}</span>
        {description && compact && (
          <span className="text-xs opacity-75 leading-tight block truncate">{description}</span>
        )}
      </div>
    </motion.button>
  )
}
