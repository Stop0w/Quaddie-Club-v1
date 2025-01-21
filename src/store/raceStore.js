import { create } from 'zustand'

const useRaceStore = create((set, get) => ({
  // State
  upcomingRaces: [],
  isLoading: false,
  error: null,

  // Actions
  fetchUpcomingRaces: async () => {
    set({ isLoading: true, error: null })

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Dummy data for development
      const races = Array.from({ length: 20 }, (_, i) => ({
        id: `race_${i + 1}`,
        name: `Race ${i + 1}`,
        number: i + 1,
        date: new Date(Date.now() + (i * 24 * 60 * 60 * 1000)).toISOString(),
        time: new Date(Date.now() + (i * 24 * 60 * 60 * 1000) + (Math.random() * 12 * 60 * 60 * 1000)).toISOString(),
        venue: {
          id: `venue_${(i % 3) + 1}`,
          name: `Venue ${(i % 3) + 1}`
        },
        type: ['maiden', 'group', 'handicap'][Math.floor(Math.random() * 3)],
        distance: Math.floor(Math.random() * 1000) + 1000,
        prizeMoney: Math.floor(Math.random() * 50000) + 10000,
        runners: Math.floor(Math.random() * 10) + 5,
        timeToStart: Math.floor(Math.random() * 24 * 60 * 60)
      }))

      set({
        upcomingRaces: races,
        isLoading: false
      })
    } catch (error) {
      set({
        error: error.message,
        isLoading: false
      })
    }
  },

  getRaceById: (raceId) => {
    return get().upcomingRaces.find(race => race.id === raceId)
  },

  updateRace: async (raceId, updates) => {
    set({ isLoading: true, error: null })

    try {
      set(state => ({
        upcomingRaces: state.upcomingRaces.map(race =>
          race.id === raceId ? { ...race, ...updates } : race
        ),
        isLoading: false
      }))
    } catch (error) {
      set({
        error: error.message,
        isLoading: false
      })
    }
  },

  clearError: () => set({ error: null })
}))

export default useRaceStore
