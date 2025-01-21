import { create } from 'zustand'

const useSyncStore = create((set, get) => ({
  // State
  syncQueue: [],
  isSyncing: false,
  lastSyncTime: null,
  syncErrors: [],

  // Actions
  queueSync: (action) => {
    set(state => ({
      syncQueue: [...state.syncQueue, {
        id: Date.now(),
        action,
        timestamp: new Date().toISOString(),
        attempts: 0
      }]
    }))
  },

  processSyncQueue: async () => {
    const state = get()
    if (state.isSyncing || state.syncQueue.length === 0) return

    set({ isSyncing: true })

    try {
      const queue = [...state.syncQueue]
      const processed = []
      const failed = []

      for (const item of queue) {
        try {
          await item.action()
          processed.push(item.id)
        } catch (error) {
          failed.push({
            ...item,
            error: error.message,
            attempts: item.attempts + 1
          })
        }
      }

      set(state => ({
        syncQueue: [
          ...state.syncQueue.filter(item => 
            !processed.includes(item.id) && 
            !failed.find(f => f.id === item.id)
          ),
          ...failed.filter(item => item.attempts < 3)
        ],
        lastSyncTime: new Date().toISOString(),
        syncErrors: failed.map(item => ({
          id: item.id,
          error: item.error,
          timestamp: new Date().toISOString()
        }))
      }))
    } finally {
      set({ isSyncing: false })
    }
  },

  clearSyncQueue: () => {
    set({ syncQueue: [], syncErrors: [] })
  }
}))

export default useSyncStore
