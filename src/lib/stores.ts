import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UserStore {
  user: { uid: string; email: string } | null
  setUser: (user: { uid: string; email: string } | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        setUser: (user: { uid: string; email: string } | null) => set({ user }),
        loading: true,
        setLoading: (loading: boolean) => set({ loading }),
      }),
      { name: 'userStoreStripe' }
    )
  )
)
