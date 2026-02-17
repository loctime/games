"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Trophy, Zap } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { PowerUpButton } from "@/components/power-up-button"
import { useGame } from "@/lib/game-context"
import { powerUpManager } from "@/src/lib/powerups/power-up-manager"
import type { PowerUpType } from "@/src/lib/powerups/types"

export function PreguntadosPlay() {
  const {
    preguntadosQuestions,
    preguntadosCurrentQuestionIndex,
    preguntadosSelectedAnswer,
    selectPreguntadosAnswer,
    nextPreguntadosQuestion,
    playerProfile,
    activePowerUp,
    fiftyFiftyOptions,
    questionStartTime,
    usePowerUp,
    changeQuestion,
    addExtraTime,
  } = useGame()

  const [timeLeft, setTimeLeft] = useState(30)
  const currentQuestion = preguntadosQuestions[preguntadosCurrentQuestionIndex]
  const isAnswered = preguntadosSelectedAnswer !== null
  const isCorrect = preguntadosSelectedAnswer === currentQuestion?.correctIndex

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || isAnswered) {
      if (!isAnswered) {
        selectPreguntadosAnswer(-1) // Auto-select wrong answer
      }
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev: number) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, isAnswered, selectPreguntadosAnswer])

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(30)
  }, [preguntadosCurrentQuestionIndex])

  const handlePowerUpUse = async (type: PowerUpType) => {
    if (type === "fifty_fifty" && currentQuestion) {
      const visibleOptions = powerUpManager.applyFiftyFifty(
        currentQuestion.options,
        currentQuestion.correctIndex
      )
      // Store visible options in state
    } else if (type === "change_question") {
      await changeQuestion()
    } else if (type === "extra_time") {
      setTimeLeft(prev => prev + 15)
    }
  }

  const getVisibleOptions = () => {
    if (activePowerUp === "fifty_fifty" && fiftyFiftyOptions) {
      return fiftyFiftyOptions.map(index => ({
        index,
        option: currentQuestion!.options[index],
        isCorrect: index === currentQuestion!.correctIndex
      }))
    }
    
    return currentQuestion?.options.map((option, index) => ({
      index,
      option,
      isCorrect: index === currentQuestion!.correctIndex
    })) || []
  }

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header with timer and power-ups */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">❓</span>
            <div>
              <h1 className="text-xl font-bold text-foreground">Preguntados</h1>
              <p className="text-sm text-muted-foreground">
                Pregunta {preguntadosCurrentQuestionIndex + 1} de {preguntadosQuestions.length}
              </p>
            </div>
          </div>
          
          {/* Timer */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${
            timeLeft <= 10 ? "bg-destructive/20 text-destructive" : "bg-secondary text-secondary-foreground"
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
        </div>

        {/* Power-ups */}
        <div className="flex justify-center gap-2">
          <PowerUpButton 
            type="fifty_fifty" 
            disabled={isAnswered}
            onUse={() => handlePowerUpUse("fifty_fifty")}
          />
          <PowerUpButton 
            type="change_question" 
            disabled={isAnswered}
            onUse={() => handlePowerUpUse("change_question")}
          />
          <PowerUpButton 
            type="extra_time" 
            disabled={isAnswered}
            onUse={() => handlePowerUpUse("extra_time")}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 flex flex-col justify-center"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = preguntadosSelectedAnswer === index
            const isCorrectAnswer = index === currentQuestion.correctIndex
            
            let variant: "primary" | "secondary" | "success" | "danger" = "primary"
            if (isAnswered) {
              if (isCorrectAnswer) {
                variant = "success"
              } else if (isSelected && !isCorrectAnswer) {
                variant = "danger"
              } else {
                variant = "secondary"
              }
            }

            return (
              <motion.button
                key={index}
                whileTap={{ scale: isAnswered ? 1 : 0.97 }}
                onClick={() => !isAnswered && selectPreguntadosAnswer(index)}
                disabled={isAnswered}
                className={`
                  w-full p-5 rounded-2xl text-left font-semibold transition-all
                  ${variant === "success" ? "bg-success text-success-foreground shadow-lg" : ""}
                  ${variant === "danger" ? "bg-destructive text-destructive-foreground" : ""}
                  ${variant === "secondary" ? "bg-secondary text-secondary-foreground opacity-60" : ""}
                  ${variant === "primary" ? "bg-primary text-primary-foreground shadow-lg active:shadow-md" : ""}
                  ${isAnswered ? "cursor-not-allowed" : ""}
                `}
              >
                <span className="text-lg">
                  {option}
                </span>
                {isAnswered && isCorrectAnswer && (
                  <span className="ml-2">✓</span>
                )}
                {isAnswered && isSelected && !isCorrectAnswer && (
                  <span className="ml-2">✗</span>
                )}
              </motion.button>
            )
          })}
        </div>

        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className={`text-xl font-bold mb-4 ${
              isCorrect ? "text-success" : "text-destructive"
            }`}>
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </p>
            <GameButton 
              onClick={nextPreguntadosQuestion} 
              fullWidth 
              size="lg"
            >
              {preguntadosCurrentQuestionIndex < preguntadosQuestions.length - 1 ? "Siguiente" : "Ver resultados"}
            </GameButton>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
