import { create } from 'zustand'
import { registerUser } from '../api'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  user: { id: string; email: string; name: string | null } | null
  login: (token: string) => void
  logout: () => void
  register: (email: string, name?: string) => Promise<void>
  checkAuthStatus: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('jwt'),
  isLoading: false,
  error: null,
  user: null,

  login: (token: string) => {
    localStorage.setItem('jwt', token)
    set({
      isAuthenticated: true,
      error: null
    })
  },

  logout: () => {
    localStorage.removeItem('jwt')
    set({
      isAuthenticated: false,
      error: null,
      user: null
    })
  },

  register: async (email: string, name?: string) => {
    set({ isLoading: true, error: null })

    try {
      const response = await registerUser(email, name)
      localStorage.setItem('jwt', response.token)
      set({
        isAuthenticated: true,
        isLoading: false,
        user: response.user,
        error: null
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      })
      throw error
    }
  },

  checkAuthStatus: async () => {
    set({ isLoading: true, error: null })

    try {
      // Check if we have a token
      const token = localStorage.getItem('jwt')
      if (!token) {
        set({
          isAuthenticated: false,
          isLoading: false
        })
        return
      }

      set({
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      localStorage.removeItem('jwt')
      set({
        isAuthenticated: false,
        isLoading: false
      })
    }
  },

  clearError: () => {
    set({ error: null })
  }
}))

useAuthStore.getState().checkAuthStatus()
