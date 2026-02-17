import type { PowerUpType, PowerUpState, PowerUp } from './types'
import { POWER_UPS } from './types'

export class PowerUpManager {
  private state: PowerUpState

  constructor() {
    this.state = {
      available: ["fifty_fifty", "change_question", "extra_time"],
      usedInGame: {
        fifty_fifty: 0,
        change_question: 0,
        extra_time: 0
      },
      active: null
    }
  }

  canUsePowerUp(type: PowerUpType, playerPowerUps: number): boolean {
    const powerUp = POWER_UPS[type]
    const usedInGame = this.state.usedInGame[type]
    
    return (
      this.state.available.includes(type) &&
      playerPowerUps >= powerUp.cost &&
      usedInGame < powerUp.maxPerGame
    )
  }

  usePowerUp(type: PowerUpType, playerPowerUps: number): boolean {
    if (!this.canUsePowerUp(type, playerPowerUps)) {
      return false
    }

    this.state.usedInGame[type] += 1
    this.state.active = type
    
    return true
  }

  applyFiftyFifty(options: string[], correctIndex: number): number[] {
    // Eliminar 2 opciones incorrectas, dejando la correcta y una incorrecta
    const incorrectIndices = options
      .map((_, index) => index)
      .filter(index => index !== correctIndex)
    
    // Mezclar y tomar 2 incorrectas para eliminar
    const toRemove = incorrectIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
    
    // Devolver índices de opciones que quedan visibles
    return options
      .map((_, index) => index)
      .filter(index => !toRemove.includes(index))
  }

  getCost(type: PowerUpType): number {
    return POWER_UPS[type].cost
  }

  resetGame(): void {
    this.state.usedInGame = {
      fifty_fifty: 0,
      change_question: 0,
      extra_time: 0
    }
    this.state.active = null
  }

  getUsedCount(type: PowerUpType): number {
    return this.state.usedInGame[type]
  }

  getMaxCount(type: PowerUpType): number {
    return POWER_UPS[type].maxPerGame
  }

  getAvailablePowerUps(): PowerUpType[] {
    return this.state.available
  }
}

export const powerUpManager = new PowerUpManager()
