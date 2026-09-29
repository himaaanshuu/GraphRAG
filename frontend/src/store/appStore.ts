/* GraphRAG Intelligence Engine - Store */

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      token: null,
      setToken: (token: string | null) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "graphrag-storage",
      storage: createJSONStorage(localStorage),
    }
  )
)