"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Check } from "lucide-react"
import { GameButton } from "@/components/game-button"
import { useGame } from "@/lib/game-context"

export function ImpostorVote() {
  const { impostorPlayers, submitVote, votes, setScreen } = useGame()
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [currentVoter, setCurrentVoter] = useState(0)
  const [showVotePrompt, setShowVotePrompt] = useState(true)

  const handleVote = () => {
    if (selectedPlayer === null) return
    
    submitVote(selectedPlayer)
    setSelectedPlayer(null)
    
    if (currentVoter + 1 >= impostorPlayers) {
      setScreen("impostor-result")
    } else {
      setCurrentVoter(currentVoter + 1)
      setShowVotePrompt(true)
    }
  }

  if (showVotePrompt) {
    return (
      <div className="min-h-screen bg-background flex flex-col p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <span className="text-5xl mb-4 block">🗳️</span>
          <h1 className="text-2xl font-bold text-foreground">
            Jugador {currentVoter + 1}
          </h1>
          <p className="text-muted-foreground mt-2">
            Es tu turno de votar
          </p>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <GameButton onClick={() => setShowVotePrompt(false)} size="lg">
            Votar ahora
          </GameButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <h1 className="text-2xl font-bold text-foreground">
          ¿Quién es el impostor?
        </h1>
        <p className="text-muted-foreground mt-2">
          Jugador {currentVoter + 1}, elegí tu voto
        </p>
      </motion.div>

      <div className="flex-1 overflow-auto">
        <div className="grid gap-3">
          {Array.from({ length: impostorPlayers }, (_, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedPlayer(i)}
              disabled={i === currentVoter}
              className={`
                p-5 rounded-2xl flex items-center gap-4 transition-all
                ${i === currentVoter 
                  ? "bg-muted/50 opacity-50 cursor-not-allowed" 
                  : selectedPlayer === i
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-card-foreground"
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${selectedPlayer === i ? "bg-primary-foreground/20" : "bg-secondary"}
              `}>
                {selectedPlayer === i ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </div>
              <span className="text-xl font-semibold">
                Jugador {i + 1}
              </span>
              {i === currentVoter && (
                <span className="ml-auto text-sm">(Vos)</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-6 pb-4"
      >
        <GameButton 
          onClick={handleVote} 
          fullWidth 
          size="lg"
          disabled={selectedPlayer === null}
        >
          Confirmar voto
        </GameButton>
      </motion.div>
    </div>
  )
}
