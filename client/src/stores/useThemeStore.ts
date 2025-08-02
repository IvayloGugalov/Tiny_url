import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'light',

  setTheme: (theme: Theme) => {
    // Update localStorage
    localStorage.setItem('theme', theme)

    // Update document attribute for CSS theming
    document.documentElement.setAttribute('data-theme', theme)

    // Update store state
    set({ theme })
  },

  toggleTheme: () => {
    const currentTheme = get().theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    get().setTheme(newTheme)
  },
}))

// Initialize theme on document when store is created
const initialTheme = useThemeStore.getState().theme
document.documentElement.setAttribute('data-theme', initialTheme)
