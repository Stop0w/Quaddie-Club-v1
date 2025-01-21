import create from 'zustand'
import { persist } from 'zustand/middleware'

const useNavigationStore = create(
  persist(
    (set, get) => ({
      // Current navigation state
      currentContext: null,
      navigationHistory: [],
      recentlyViewed: [],
      breadcrumbTrail: [],

      // Navigation actions
      setCurrentContext: (context) => {
        set({ currentContext: context })
      },

      addToHistory: (path) => {
        set((state) => ({
          navigationHistory: [
            path,
            ...state.navigationHistory.filter((p) => p !== path)
          ].slice(0, 10)
        }))
      },

      addToRecentlyViewed: (item) => {
        set((state) => ({
          recentlyViewed: [
            item,
            ...state.recentlyViewed.filter((i) => i.path !== item.path)
          ].slice(0, 5)
        }))
      },

      updateBreadcrumbs: (path) => {
        const segments = path.split('/').filter(Boolean)
        const breadcrumbs = segments.map((segment, index) => ({
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: '/' + segments.slice(0, index + 1).join('/')
        }))
        set({ breadcrumbTrail: breadcrumbs })
      },

      // Navigation helpers
      getContextForPath: (path) => {
        // Logic to determine context from path
        const segments = path.split('/')
        return segments[1] || 'home'
      },

      // Clear navigation state
      clearNavigation: () => {
        set({
          currentContext: null,
          navigationHistory: [],
          recentlyViewed: [],
          breadcrumbTrail: []
        })
      }
    }),
    {
      name: 'navigation-storage',
      getStorage: () => localStorage
    }
  )
)

export default useNavigationStore
