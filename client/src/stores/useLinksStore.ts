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

let fetchPromise: Promise<void> | null = null

export const useLinksStore = create<LinksState>((set, get) => ({
  links: [],
  loading: false,
  error: null,

  fetchLinks: async () => {
    // Prevent duplicate concurrent calls
    if (fetchPromise) {
      return fetchPromise
    }

    fetchPromise = (async () => {
      const { loading } = get()
      if (loading) return

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
      } finally {
        fetchPromise = null
      }
    })()

    return fetchPromise
  },

  clearError: () => {
    set({ error: null })
  }
}))
