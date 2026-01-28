"use client"

import { GameProvider, useGame } from "@/lib/game-context"
import { HomeScreen } from "@/components/screens/home-screen"
import { HeadsupSetup } from "@/components/screens/headsup-setup"
import { HeadsupPlay } from "@/components/screens/headsup-play"
import { HeadsupResult } from "@/components/screens/headsup-result"
import { ImpostorSetup } from "@/components/screens/impostor-setup"
import { ImpostorReveal } from "@/components/screens/impostor-reveal"
import { ImpostorDebate } from "@/components/screens/impostor-debate"
import { ImpostorVote } from "@/components/screens/impostor-vote"
import { ImpostorResult } from "@/components/screens/impostor-result"

function GameScreens() {
  const { currentScreen } = useGame()

  switch (currentScreen) {
    case "home":
      return <HomeScreen />
    case "headsup-setup":
      return <HeadsupSetup />
    case "headsup-play":
      return <HeadsupPlay />
    case "headsup-result":
      return <HeadsupResult />
    case "impostor-setup":
      return <ImpostorSetup />
    case "impostor-reveal":
      return <ImpostorReveal />
    case "impostor-debate":
      return <ImpostorDebate />
    case "impostor-vote":
      return <ImpostorVote />
    case "impostor-result":
      return <ImpostorResult />
    default:
      return <HomeScreen />
  }
}

export default function Page() {
  return (
    <GameProvider>
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <GameScreens />
      </div>
    </GameProvider>
  )
}
