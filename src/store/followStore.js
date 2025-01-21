import { create } from 'zustand'

const useFollowStore = create((set, get) => ({
  followedPlayers: [],
  notifications: {
    enabled: true,
    types: {
      newTips: true,
      results: true,
      performance: true
    }
  },

  followPlayer: async (playerId) => {
    // Implementation
  },

  unfollowPlayer: async (playerId) => {
    // Implementation
  },

  getPlayerTips: async (playerId) => {
    // Implementation
  },

  updateNotificationSettings: (settings) => {
    set({ notifications: { ...get().notifications, ...settings }})
  },

  comparePlayersPerformance: (playerIds) => {
    // Implementation
  }
}))

export default useFollowStore
