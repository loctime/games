"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useGame } from "@/lib/game-context"
import { useAuth } from "@/lib/auth-context"
import { getGameById } from "@/lib/games-registry"
import { saveUserProgress } from "@/lib/firestore-service"
import { toast } from "sonner"

interface GameFrameProps {
  gameId: string
}

export function GameFrame({ gameId }: GameFrameProps) {
  const { setScreen } = useGame()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const game = getGameById(gameId)

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (!event.data || event.data.type !== "CONTROLGAMES_SCORE") return
      const { gameId: msgGameId, score, label } = event.data
      if (msgGameId !== gameId) return

      const displayLabel = label ?? game?.title ?? gameId
      toast.success(`${displayLabel}: ${score} puntos`)

      if (user) {
        saveUserProgress(user.uid, { [`${gameId}Score`]: score }).catch(() => {})
      }
    },
    [gameId, game?.title, user]
  )

  useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  if (!game?.url) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <p className="text-muted-foreground">URL del juego no configurada</p>
        <button onClick={() => setScreen("home")} className="mt-4 text-primary underline">
          Volver
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border shrink-0">
        <button
          onClick={() => setScreen("home")}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary active:scale-95 transition-transform"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="font-bold text-foreground">{game.title}</span>
        <span className="text-xl ml-1">{game.icon}</span>
      </div>

      {/* Loading overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 top-[56px] bg-background flex items-center justify-center z-10"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl">{game.icon}</span>
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Cargando {game.title}…</p>
          </div>
        </motion.div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={game.url}
        className="flex-1 w-full border-0"
        title={game.title}
        allow="autoplay; fullscreen"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
