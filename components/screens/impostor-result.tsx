"use client"

import { motion } from "framer-motion"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function ImpostorResult() {
  const { 
    impostorIndex, 
    impostorWord, 
    votes, 
    impostorPlayers,
    setScreen, 
    resetImpostor,
    startImpostorGame 
  } = useGame()

  // Count votes
  const voteCounts = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  // Find who got the most votes
  const maxVotes = Math.max(...Object.values(voteCounts), 0)
  const votedOut = Object.entries(voteCounts).find(([_, count]) => count === maxVotes)?.[0]
  const votedOutIndex = votedOut ? parseInt(votedOut) : -1

  const impostorCaught = votedOutIndex === impostorIndex
  const wasTie = Object.values(voteCounts).filter(v => v === maxVotes).length > 1

  const handlePlayAgain = () => {
    resetImpostor()
    startImpostorGame()
  }

  const handleGoHome = () => {
    resetImpostor()
    setScreen("home")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        {wasTie ? (
          <>
            <span className="text-6xl mb-4 block">🤷</span>
            <h1 className="text-3xl font-bold text-foreground">
              ¡Empate!
            </h1>
            <p className="text-muted-foreground mt-2">
              No se pudo decidir
            </p>
          </>
        ) : impostorCaught ? (
          <>
            <span className="text-6xl mb-4 block">🎉</span>
            <h1 className="text-3xl font-bold text-success">
              ¡Atraparon al impostor!
            </h1>
            <p className="text-muted-foreground mt-2">
              El grupo gana
            </p>
          </>
        ) : (
          <>
            <span className="text-6xl mb-4 block">😈</span>
            <h1 className="text-3xl font-bold text-destructive">
              ¡El impostor escapó!
            </h1>
            <p className="text-muted-foreground mt-2">
              El impostor gana
            </p>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1"
      >
        <div className="bg-card rounded-3xl p-6 shadow-xl">
          <div className="text-center mb-6">
            <p className="text-muted-foreground text-sm mb-1">El impostor era</p>
            <h2 className="text-2xl font-bold text-destructive">
              Jugador {impostorIndex + 1}
            </h2>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-muted-foreground text-sm mb-1 text-center">La palabra secreta era</p>
            <h3 className="text-3xl font-black text-primary text-center">
              {impostorWord}
            </h3>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <p className="text-muted-foreground text-sm mb-4 text-center">Resultados de la votación</p>
            <div className="space-y-2">
              {Array.from({ length: impostorPlayers }, (_, i) => (
                <div
                  key={i}
                  className={`
                    flex items-center justify-between p-3 rounded-xl
                    ${i === impostorIndex ? "bg-destructive/20" : "bg-secondary/50"}
                  `}
                >
                  <span className={`font-medium ${i === impostorIndex ? "text-destructive" : "text-foreground"}`}>
                    Jugador {i + 1}
                    {i === impostorIndex && " 😈"}
                  </span>
                  <span className="text-muted-foreground">
                    {voteCounts[i] || 0} votos
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col gap-3 pt-6"
      >
        <GameButton onClick={handlePlayAgain} fullWidth size="lg">
          Jugar otra vez
        </GameButton>
        <GameButton onClick={handleGoHome} variant="secondary" fullWidth size="md">
          Volver al inicio
        </GameButton>
      </motion.div>
    </div>
  )
}
