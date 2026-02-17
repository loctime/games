"use client"

import { motion } from "framer-motion"

interface GameTileProps {
  icon: string | React.ReactNode
  title: string
  onClick: () => void
  variant?: "primary" | "accent" | "secondary"
}

export function GameTile({ icon, title, onClick, variant = "primary" }: GameTileProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full p-8 rounded-3xl flex flex-col items-center justify-center gap-4
        transition-all duration-200 shadow-lg active:shadow-md
        ${variant === "primary" 
          ? "bg-primary text-primary-foreground" 
          : variant === "accent"
          ? "bg-accent text-accent-foreground"
          : "bg-secondary text-secondary-foreground"
        }
      `}
    >
      <span className="text-6xl">{icon}</span>
      <span className="text-xl font-bold">{title}</span>
    </motion.button>
  )
}
