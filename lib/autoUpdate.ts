// Sistema di aggiornamento automatico ogni 6 ore
// Come richiesto dal PRD: "Aggiornamento Dati - Ogni 6 ore"

export interface UpdateInfo {
  lastUpdate: Date
  nextUpdate: Date
  isUpdating: boolean
  error: string | null
}

export class AutoUpdateManager {
  private static instance: AutoUpdateManager
  private updateCallbacks: (() => void)[] = []
  private updateInterval: NodeJS.Timeout | null = null
  private updateInfo: UpdateInfo = {
    lastUpdate: new Date(),
    nextUpdate: this.calculateNextUpdate(),
    isUpdating: false,
    error: null
  }

  private constructor() {
    this.startAutoUpdate()
  }

  public static getInstance(): AutoUpdateManager {
    if (!AutoUpdateManager.instance) {
      AutoUpdateManager.instance = new AutoUpdateManager()
    }
    return AutoUpdateManager.instance
  }

  private calculateNextUpdate(): Date {
    const now = new Date()
    const nextUpdate = new Date(now.getTime() + 6 * 60 * 60 * 1000) // 6 ore
    return nextUpdate
  }

  private startAutoUpdate(): void {
    // Aggiorna ogni 6 ore (6 * 60 * 60 * 1000 ms)
    this.updateInterval = setInterval(() => {
      this.performUpdate()
    }, 6 * 60 * 60 * 1000)
  }

  public async performUpdate(): Promise<void> {
    if (this.updateInfo.isUpdating) return

    this.updateInfo.isUpdating = true
    this.updateInfo.error = null

    try {
      // Notifica tutti i callback registrati
      for (const callback of this.updateCallbacks) {
        try {
          await callback()
        } catch (error) {
          console.error('Errore durante aggiornamento:', error)
          this.updateInfo.error = error instanceof Error ? error.message : 'Errore sconosciuto'
        }
      }

      this.updateInfo.lastUpdate = new Date()
      this.updateInfo.nextUpdate = this.calculateNextUpdate()
    } catch (error) {
      console.error('Errore generale durante aggiornamento:', error)
      this.updateInfo.error = error instanceof Error ? error.message : 'Errore sconosciuto'
    } finally {
      this.updateInfo.isUpdating = false
    }
  }

  public registerUpdateCallback(callback: () => void | Promise<void>): void {
    this.updateCallbacks.push(callback)
  }

  public unregisterUpdateCallback(callback: () => void | Promise<void>): void {
    const index = this.updateCallbacks.indexOf(callback)
    if (index > -1) {
      this.updateCallbacks.splice(index, 1)
    }
  }

  public getUpdateInfo(): UpdateInfo {
    return { ...this.updateInfo }
  }

  public getTimeUntilNextUpdate(): number {
    const now = new Date()
    return Math.max(0, this.updateInfo.nextUpdate.getTime() - now.getTime())
  }

  public formatTimeUntilNextUpdate(): string {
    const timeLeft = this.getTimeUntilNextUpdate()
    if (timeLeft === 0) return 'Aggiornamento in corso...'

    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }
}

import React from 'react'

// Hook React per utilizzare il sistema di aggiornamento automatico
export function useAutoUpdate() {
  const [updateInfo, setUpdateInfo] = React.useState<UpdateInfo>({
    lastUpdate: new Date(),
    nextUpdate: new Date(Date.now() + 6 * 60 * 60 * 1000),
    isUpdating: false,
    error: null
  })

  React.useEffect(() => {
    const manager = AutoUpdateManager.getInstance()
    
    // Aggiorna le informazioni ogni minuto
    const interval = setInterval(() => {
      setUpdateInfo(manager.getUpdateInfo())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const triggerUpdate = React.useCallback(async () => {
    const manager = AutoUpdateManager.getInstance()
    await manager.performUpdate()
    setUpdateInfo(manager.getUpdateInfo())
  }, [])

  return {
    updateInfo,
    triggerUpdate,
    timeUntilNextUpdate: AutoUpdateManager.getInstance().formatTimeUntilNextUpdate()
  }
} 