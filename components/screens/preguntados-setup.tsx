"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { CategorySelector } from "@/components/category-selector"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function PreguntadosSetup() {
  const { 
    setScreen, 
    preguntadosCategory, 
    setPreguntadosCategory,
    preguntadosQuestionsCount,
    setPreguntadosQuestionsCount,
    startPreguntadosGame 
  } = useGame()

  const questionsOptions = [5, 10, 15]

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setScreen("home")}
        className="flex items-center gap-2 text-muted-foreground self-start"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-5xl mb-4 block">❓</span>
        <h1 className="text-3xl font-bold text-foreground">
          Preguntados
        </h1>
        <p className="text-muted-foreground mt-2">
          Trivia para jugar en grupo
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Categoría
          </h2>
          <CategorySelector
            selected={preguntadosCategory}
            onSelect={setPreguntadosCategory}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Número de preguntas
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {questionsOptions.map((count) => (
              <motion.button
                key={count}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreguntadosQuestionsCount(count)}
                className={`
                  p-4 rounded-2xl flex flex-col items-center gap-2 transition-all
                  ${preguntadosQuestionsCount === count
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground"
                  }
                `}
              >
                <span className="text-2xl font-bold">{count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-6 pb-4"
      >
        <GameButton onClick={startPreguntadosGame} fullWidth size="lg">
          Empezar
        </GameButton>
      </motion.div>
    </div>
  )
}
