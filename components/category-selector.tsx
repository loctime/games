"use client"

import { motion } from "framer-motion"
import type { Category } from "@/lib/game-context"

interface CategorySelectorProps {
  selected: Category
  onSelect: (category: Category) => void
}

const categories: { id: Category; label: string; icon: string }[] = [
  { id: "personas", label: "Personas", icon: "👤" },
  { id: "objetos", label: "Objetos", icon: "📦" },
  { id: "animales", label: "Animales", icon: "🐾" },
  { id: "libre", label: "Libre", icon: "🎲" },
]

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`
            p-5 rounded-2xl flex flex-col items-center gap-2 transition-all
            ${selected === category.id
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground"
            }
          `}
        >
          <span className="text-3xl">{category.icon}</span>
          <span className="font-semibold">{category.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
