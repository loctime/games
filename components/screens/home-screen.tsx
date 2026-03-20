"use client"

import { motion } from "framer-motion"
import { BarChart3, LogIn, LogOut, User } from "lucide-react"
import { GameTile } from "@/components/game-tile"
import { PlayerProfile } from "@/components/player-profile"
import { useGame } from "@/lib/game-context"
import { useAuth } from "@/lib/auth-context"
import { GAMES } from "@/lib/games-registry"

export function HomeScreen() {
  const { setScreen, loadingProfile, launchIframeGame } = useGame()
  const { user, signOut, loading: authLoading } = useAuth()

  const groupGames = GAMES.filter((g) => g.group === "group" && g.type === "native")
  const soloGames = GAMES.filter((g) => g.group === "solo" && g.type === "iframe")

  const handleGameClick = (gameId: string, screen?: string) => {
    if (screen) {
      setScreen(screen as Parameters<typeof setScreen>[0])
    } else {
      launchIframeGame(gameId)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-10 pb-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-black text-foreground tracking-tight"
        >
          ControlGames
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {authLoading ? (
            <div className="w-9 h-9 rounded-xl bg-secondary animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-secondary rounded-xl px-3 py-2 max-w-[140px]">
                <User className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs text-foreground font-medium truncate">
                  {user.displayName ?? user.email?.split("@")[0] ?? "Usuario"}
                </span>
              </div>
              <button
                onClick={signOut}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-secondary active:scale-95 transition-transform"
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setScreen("auth")}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-xl px-3 py-2 text-sm font-bold active:scale-95 transition-transform"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
          )}
        </motion.div>
      </div>

      {/* Player Profile */}
      {!loadingProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-5 pt-3 pb-1"
        >
          <PlayerProfile />
        </motion.div>
      )}

      <div className="flex-1 flex flex-col px-5 pb-6 gap-6 mt-4">
        {/* Juegos en grupo */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Juegos en Grupo
          </p>
          <div className="flex flex-col gap-3">
            {groupGames.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                <GameTile
                  icon={game.icon}
                  title={game.title}
                  description={game.description}
                  variant={game.variant}
                  onClick={() => handleGameClick(game.id, game.screen)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Juegos individuales */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Juegos Individuales
          </p>
          <div className="grid grid-cols-2 gap-3">
            {soloGames.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.07 }}
              >
                <GameTile
                  icon={game.icon}
                  title={game.title}
                  description={game.description}
                  variant={game.variant}
                  compact
                  onClick={() => handleGameClick(game.id, game.screen)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <GameTile
            icon={<BarChart3 className="w-5 h-5" />}
            title="Estadísticas"
            variant="secondary"
            compact
            onClick={() => setScreen("stats")}
          />
        </motion.div>
      </div>
    </div>
  )
}
