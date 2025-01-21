import { create } from 'zustand'
import { 
  leaderboards, 
  globalLeaderboard, 
  leaderboardPeriods 
} from '../data/dummyLeaderboardData'
import { dummyUsers } from '../data/dummyUsers'

const useLeaderboardStore = create((set, get) => ({
  leaderboards,
  globalLeaderboard,
  selectedPeriod: leaderboardPeriods.TODAY,
  selectedCompetition: null,
  isLoading: false,
  error: null,

  setSelectedPeriod: (period) => {
    set({ selectedPeriod: period })
  },

  setSelectedCompetition: (competitionId) => {
    set({ selectedCompetition: competitionId })
  },

  getLeaderboardData: () => {
    const { selectedPeriod, selectedCompetition } = get()
    
    if (selectedCompetition) {
      return leaderboards[selectedCompetition]?.[selectedPeriod] || []
    }
    
    return globalLeaderboard[selectedPeriod] || []
  },

  // Helper to get user details for leaderboard entries
  getUserDetails: (userId) => {
    const user = dummyUsers.find(u => u.id === userId)
    return user ? {
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
      subscription: user.subscription.plan
    } : null
  }
}))

export default useLeaderboardStore
