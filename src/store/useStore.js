import { create } from 'zustand'
import { dummyUsers } from '../data/dummyUsers'
import { competitions } from '../data/dummyCompetitions'
import { races } from '../data/dummyRaceData'
import { leaderboards } from '../data/dummyLeaderboardData'

const useStore = create((set, get) => ({
  // Auth State
  user: null,
  isAuthenticated: false,
  
  // Competition State
  competitions: competitions,
  activeCompetition: null,
  selectedRaces: {},
  
  // Race State
  races: races,
  
  // Leaderboard State
  leaderboards: leaderboards,
  
  // Actions
  login: (email, password) => {
    const user = dummyUsers.find(u => 
      u.email === email && u.password === password
    )
    if (user) {
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  
  setActiveCompetition: (competitionId) => {
    const competition = competitions.find(c => c.id === competitionId)
    set({ activeCompetition: competition })
  },
  
  // "Use Same Picks" functionality
  useSamePicks: (sourceCompetitionId, targetCompetitionIds) => {
    const { selectedRaces } = get()
    const sourcePicks = selectedRaces[sourceCompetitionId] || {}
    
    const updatedPicks = { ...selectedRaces }
    targetCompetitionIds.forEach(targetId => {
      updatedPicks[targetId] = { ...sourcePicks }
    })
    
    set({ selectedRaces: updatedPicks })
  },
  
  // Selection management
  selectHorse: (competitionId, raceId, horseNumber) => {
    set(state => ({
      selectedRaces: {
        ...state.selectedRaces,
        [competitionId]: {
          ...state.selectedRaces[competitionId],
          [raceId]: horseNumber
        }
      }
    }))
  },
  
  // Competition management
  createCompetition: (competitionData) => {
    set(state => ({
      competitions: [...state.competitions, {
        id: `comp_${Date.now()}`,
        ...competitionData,
        status: 'Open',
        players: [],
        createdAt: new Date().toISOString()
      }]
    }))
  }
}))

export default useStore
