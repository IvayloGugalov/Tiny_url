import { create } from 'zustand'
import { fetchLinks } from '../api'

interface Link {
  id: string
  target: string
  clicks: number
  createdAt: string
}

interface LinksState {
  links: Link[]
  loading: boolean
  error: string | null
  fetchLinks: () => Promise<void>
  clearError: () => void
}

export const useLinksStore = create<LinksState>((set, get) => ({
  links: [],
  loading: false,
  error: null,

  fetchLinks: async () => {
    set({ loading: true, error: null })
    
    try {
      const data = await fetchLinks()
      set({ 
        links: data, 
        loading: false 
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load links'
      set({ 
        error: errorMessage, 
        loading: false 
      })
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))
