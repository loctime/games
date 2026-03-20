"use client"

import type { ReactNode } from "react"
import { ArrowLeft } from "lucide-react"
import { useGame } from "@/lib/game-context"

interface NativeGameFrameProps {
  title: string
  icon: string
  children: ReactNode
}

export function NativeGameFrame({ title, icon, children }: NativeGameFrameProps) {
  const { setScreen } = useGame()

  return (
    <div className="fixed inset-y-0 left-0 right-0 mx-auto w-full max-w-md z-40 bg-background flex flex-col">
      {/* Same header as GameFrame */}
      <div className="flex items-center gap-3 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border shrink-0">
        <button
          onClick={() => setScreen("home")}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary active:scale-95 transition-transform"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="font-bold text-foreground">{title}</span>
        <span className="text-xl ml-1">{icon}</span>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
