"use client"

import { useGame } from "@/lib/game-context"
import { GameFrame } from "@/components/game-frame"

export function IframeScreen() {
  const { currentIframeGame } = useGame()

  if (!currentIframeGame) return null

  return <GameFrame gameId={currentIframeGame} />
}
