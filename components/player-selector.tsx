"use client"

import { Minus, Plus } from "lucide-react"
import { motion } from "framer-motion"

interface PlayerSelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function PlayerSelector({ value, onChange, min = 3, max = 10 }: PlayerSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center disabled:opacity-40"
      >
        <Minus className="w-6 h-6" />
      </motion.button>
      <div className="text-center">
        <span className="text-5xl font-bold text-foreground">{value}</span>
        <p className="text-muted-foreground text-sm mt-1">jugadores</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center disabled:opacity-40"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
