"use client"

import { motion } from "framer-motion"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function PreguntadosPlay() {
  const {
    preguntadosQuestions,
    preguntadosCurrentQuestionIndex,
    preguntadosSelectedAnswer,
    selectPreguntadosAnswer,
    nextPreguntadosQuestion,
  } = useGame()

  const currentQuestion = preguntadosQuestions[preguntadosCurrentQuestionIndex]
  const isAnswered = preguntadosSelectedAnswer !== null
  const isCorrect = preguntadosSelectedAnswer === currentQuestion?.correctIndex

  if (!currentQuestion) return null

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <span className="text-5xl mb-4 block">❓</span>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Preguntados
        </h1>
        <p className="text-muted-foreground">
          Pregunta {preguntadosCurrentQuestionIndex + 1} de {preguntadosQuestions.length}
        </p>
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
