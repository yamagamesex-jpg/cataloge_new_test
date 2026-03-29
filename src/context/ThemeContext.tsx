import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeState } from '../types'

interface ThemeContextType extends ThemeState {
  setMode: (mode: ThemeState['mode']) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeState['mode']>('system')
  const [resolvedMode, setResolvedMode] = useState<ThemeState['resolvedMode']>('dark')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeState['mode'] | null
    if (savedMode) {
      setModeState(savedMode)
    }
  }, [])

  // Update resolved mode based on system preference and user choice
  useEffect(() => {
    const updateResolvedMode = () => {
      if (mode === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setResolvedMode(systemPrefersDark ? 'dark' : 'light')
      } else {
        setResolvedMode(mode)
      }
    }

    updateResolvedMode()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (mode === 'system') {
        updateResolvedMode()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mode])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    if (resolvedMode === 'dark') {
      root.classList.add('dark')
      root.style.setProperty('--background', '#0a0a0a')
      root.style.setProperty('--foreground', '#ffffff')
      root.style.setProperty('--card', 'rgba(255, 255, 255, 0.05)')
      root.style.setProperty('--card-hover', 'rgba(255, 255, 255, 0.1)')
      root.style.setProperty('--border', '#374151')
      root.style.setProperty('--primary', '#3b82f6')
      root.style.setProperty('--secondary', '#8b5cf6')
      root.style.setProperty('--accent', '#06b6d4')
    } else {
      root.classList.remove('dark')
      root.style.setProperty('--background', '#ffffff')
      root.style.setProperty('--foreground', '#000000')
      root.style.setProperty('--card', 'rgba(0, 0, 0, 0.05)')
      root.style.setProperty('--card-hover', 'rgba(0, 0, 0, 0.1)')
      root.style.setProperty('--border', '#e5e7eb')
      root.style.setProperty('--primary', '#2563eb')
      root.style.setProperty('--secondary', '#7c3aed')
      root.style.setProperty('--accent', '#0891b2')
    }
  }, [resolvedMode])

  const setMode = (newMode: ThemeState['mode']) => {
    setModeState(newMode)
    localStorage.setItem('theme-mode', newMode)
  }

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
  }

  const value: ThemeContextType = {
    mode,
    resolvedMode,
    setMode,
    toggleMode
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}