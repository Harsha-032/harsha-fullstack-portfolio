import { createContext, useContext, useState, useEffect } from 'react'

const THEMES = {
  cosmic: {
    name: 'cosmic',
    label: 'Cosmic Night',
    ui: {
      accent: 'text-[#22d3ee]',
      textHover: 'hover:text-[#22d3ee]',
      borderFocus: 'focus-within:border-[#22d3ee]/50',
      badgeText: 'text-[#22d3ee]',
      badgeBg: 'bg-[#22d3ee]/10',
      badgeBorder: 'border-[#22d3ee]/20',
    },
    sky: {
      start: '#4DA1FF',
      mid: '#1F4A63',
      end: '#0a1118',
      lightPrimary: '#fffdf0',
      lightSecondary: '#add8e6',
    },
    terrain: {
      valley: [0.10, 0.35, 0.14],
      lush: [0.18, 0.48, 0.22],
      mid: [0.25, 0.55, 0.28],
      rock: [0.35, 0.38, 0.42],
      snow: [0.95, 0.98, 1.0],
    },
    river: {
      color: '#29b3d9',
      emissive: '#062f40',
    },
  },
  crimson: {
    name: 'crimson',
    label: 'Crimson Dusk',
    ui: {
      accent: 'text-rose-400',
      textHover: 'hover:text-rose-400',
      borderFocus: 'focus-within:border-rose-500/50',
      badgeText: 'text-rose-400',
      badgeBg: 'bg-rose-500/10',
      badgeBorder: 'border-rose-500/20',
    },
    sky: {
      start: '#ff7b54',
      mid: '#93202b',
      end: '#1a0b0e',
      lightPrimary: '#ffe1d1',
      lightSecondary: '#d66a6a',
    },
    terrain: {
      valley: [0.35, 0.15, 0.10],
      lush: [0.45, 0.20, 0.15],
      mid: [0.55, 0.25, 0.18],
      rock: [0.40, 0.35, 0.30],
      snow: [1.0, 0.9, 0.85],
    },
    river: {
      color: '#ff593b',
      emissive: '#4a0b00',
    },
  },
  cyber: {
    name: 'cyber',
    label: 'Toxic Cyber',
    ui: {
      accent: 'text-emerald-400',
      textHover: 'hover:text-emerald-400',
      borderFocus: 'focus-within:border-emerald-500/50',
      badgeText: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10',
      badgeBorder: 'border-emerald-500/20',
    },
    sky: {
      start: '#23d770',
      mid: '#0f4c27',
      end: '#05120a',
      lightPrimary: '#e0ffe5',
      lightSecondary: '#1f833a',
    },
    terrain: {
      valley: [0.05, 0.20, 0.08],
      lush: [0.08, 0.30, 0.10],
      mid: [0.12, 0.40, 0.15],
      rock: [0.15, 0.20, 0.18],
      snow: [0.7, 1.0, 0.8],
    },
    river: {
      color: '#00ff66',
      emissive: '#003b14',
    },
  },
}

const ThemeContext = createContext({
  activeTheme: THEMES.cosmic,
  setTheme: () => {},
})

function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hc-theme')
      if (saved && THEMES[saved]) return saved
    }
    return 'cosmic'
  })

  const setTheme = (name) => {
    if (THEMES[name]) {
      setThemeState(name)
      localStorage.setItem('hc-theme', name)
    }
  }

  return (
    <ThemeContext.Provider value={{ activeTheme: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

export { THEMES, ThemeProvider, useTheme }
