"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useGame } from "@/lib/game-context"
import { useAuth } from "@/lib/auth-context"
import { getGameById } from "@/lib/games-registry"
import { addXPAndSave, getOrCreatePlayer } from "@/lib/firestore-service"
import { toast } from "sonner"

interface GameFrameProps {
  gameId: string
}

export function GameFrame({ gameId }: GameFrameProps) {
  const { setScreen, playerProfile } = useGame()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const game = getGameById(gameId)

  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      if (!event.data) return

      // Evento legacy — mantener compatibilidad con Rompecoco y otros
      if (event.data.type === "CONTROLGAMES_SCORE") {
        const { gameId: msgGameId, score, label } = event.data
        if (msgGameId !== gameId) return
        const displayLabel = label ?? game?.title ?? gameId
        toast.success(`${displayLabel}: ${score} puntos`)
        return
      }

      // Nuevo sistema de plataforma global
      if (event.data.type === "CG_EVENT") {
        const { gameId: eventGameId, score = 0, metadata } = event.data
        if (!user) return

        try {
          const player = await getOrCreatePlayer(
            user.uid,
            user.displayName ?? "Jugador"
          )

          const isFirstTime = !player.gamesUnique.includes(eventGameId)
          let xp = 100
          if (isFirstTime) xp += 200
          if (metadata?.perfect === true) xp += 100

          await addXPAndSave(user.uid, xp, eventGameId, score)

          const gameLabel = game?.title ?? eventGameId
          toast.success(`+${xp} XP — ${gameLabel}`)
        } catch (err) {
          console.error("CG_EVENT processing error:", err)
        }
      }
    },
    [gameId, game?.title, user]
  )

  useEffect(() => {
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  const handleIframeLoad = useCallback(async () => {
    setLoading(false)
    if (user && iframeRef.current?.contentWindow && game?.url) {
      try {
        const idToken = await user.getIdToken()
        iframeRef.current.contentWindow.postMessage(
          { type: "CONTROLGAMES_AUTH", idToken, uid: user.uid },
          game.url
        )
      } catch {
        // Token fetch failed silently — user stays as guest
      }
    }
  }, [gameId, user, game?.url])


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
        <div className="flex-1" />
        {playerProfile && user && (
          <>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {(playerProfile as any).level}
            </div>
            <div className="text-xs text-muted-foreground max-w-20 truncate">
              {user.email}
            </div>
          </>
        )}
      </div>

      {/* XP Bar */}
      {playerProfile && (
        <div className="h-px bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((playerProfile as any).totalXP % 1000) / 10}%` }}
          />
        </div>
      )}

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
        onLoad={handleIframeLoad}
      />
    </div>
  )
}
