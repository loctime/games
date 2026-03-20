"use client"

import { GameProvider, useGame, type Screen } from "@/lib/game-context"
import { NativeGameFrame } from "@/components/native-game-frame"
import { HomeScreen } from "@/components/screens/home-screen"
import { AuthScreen } from "@/components/screens/auth-screen"
import { HeadsupSetup } from "@/components/screens/headsup-setup"
import { HeadsupPlay } from "@/components/screens/headsup-play"
import { HeadsupResult } from "@/components/screens/headsup-result"
import { ImpostorSetup } from "@/components/screens/impostor-setup"
import { ImpostorReveal } from "@/components/screens/impostor-reveal"
import { ImpostorDebate } from "@/components/screens/impostor-debate"
import { ImpostorVote } from "@/components/screens/impostor-vote"
import { ImpostorResult } from "@/components/screens/impostor-result"
import { PreguntadosSetup } from "@/components/screens/preguntados-setup"
import { PreguntadosPlay } from "@/components/screens/preguntados-play"
import { PreguntadosResult } from "@/components/screens/preguntados-result"
import { StatsScreen } from "@/components/screens/stats-screen"
import { IframeScreen } from "@/components/screens/iframe-screen"

const NATIVE_GAME_INFO: Partial<Record<Screen, { title: string; icon: string }>> = {
  "headsup-setup":      { title: "Adivinar en la Frente", icon: "🎭" },
  "headsup-play":       { title: "Adivinar en la Frente", icon: "🎭" },
  "headsup-result":     { title: "Adivinar en la Frente", icon: "🎭" },
  "impostor-setup":     { title: "Impostor", icon: "🕵️" },
  "impostor-reveal":    { title: "Impostor", icon: "🕵️" },
  "impostor-debate":    { title: "Impostor", icon: "🕵️" },
  "impostor-vote":      { title: "Impostor", icon: "🕵️" },
  "impostor-result":    { title: "Impostor", icon: "🕵️" },
  "preguntados-setup":  { title: "Preguntados", icon: "❓" },
  "preguntados-play":   { title: "Preguntados", icon: "❓" },
  "preguntados-result": { title: "Preguntados", icon: "❓" },
}

function renderScreen(screen: Screen) {
  switch (screen) {
    case "home":             return <HomeScreen />
    case "auth":             return <AuthScreen />
    case "headsup-setup":    return <HeadsupSetup />
    case "headsup-play":     return <HeadsupPlay />
    case "headsup-result":   return <HeadsupResult />
    case "impostor-setup":   return <ImpostorSetup />
    case "impostor-reveal":  return <ImpostorReveal />
    case "impostor-debate":  return <ImpostorDebate />
    case "impostor-vote":    return <ImpostorVote />
    case "impostor-result":  return <ImpostorResult />
    case "preguntados-setup":  return <PreguntadosSetup />
    case "preguntados-play":   return <PreguntadosPlay />
    case "preguntados-result": return <PreguntadosResult />
    case "stats":            return <StatsScreen />
    case "iframe-rompecabeza":
    case "iframe-afkrpg":
    case "iframe-soulpet":
    case "iframe-arrowz":    return <IframeScreen />
    default:                 return <HomeScreen />
  }
}

function GameScreens() {
  const { currentScreen } = useGame()
  const nativeGame = NATIVE_GAME_INFO[currentScreen]

  if (nativeGame) {
    return (
      <NativeGameFrame title={nativeGame.title} icon={nativeGame.icon}>
        {renderScreen(currentScreen)}
      </NativeGameFrame>
    )
  }

  return renderScreen(currentScreen)
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
