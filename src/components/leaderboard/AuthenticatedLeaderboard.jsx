import { useState, useMemo } from 'react'
import useLeaderboardStore from '../../store/leaderboardStore'
import LeaderboardFilters from './LeaderboardFilters'
import LeaderboardTable from './LeaderboardTable'
import LeaderboardStats from './LeaderboardStats'
import LeaderboardExport from './LeaderboardExport'
import { competitionStates } from '../../data/dummyCompetitions'

export default function AuthenticatedLeaderboard() {
  const { 
    selectedPeriod,
    setSelectedPeriod,
    selectedCompetition,
    setSelectedCompetition,
    getLeaderboardData
  } = useLeaderboardStore()

  const [filters, setFilters] = useState({
    search: '',
    state: '',
    venue: '',
    subscription: ''
  })

  const leaderboardData = useMemo(() => {
    let data = getLeaderboardData()
    
    // Apply filters
    if (filters.search) {
      data = data.filter(entry => {
        const userDetails = useLeaderboardStore.getState().getUserDetails(entry.userId)
        return userDetails?.name.toLowerCase().includes(filters.search.toLowerCase())
      })
    }

    if (filters.state) {
      data = data.filter(entry => {
        const competitions = entry.competitions || []
        return competitions.some(compId => {
          const comp = useLeaderboardStore.getState().competitions.find(c => c.id === compId)
          return comp?.states.includes(filters.state)
        })
      })
    }

    if (filters.venue) {
      data = data.filter(entry => {
        const competitions = entry.competitions || []
        return competitions.some(compId => {
          const comp = useLeaderboardStore.getState().competitions.find(c => c.id === compId)
          return comp?.venue === filters.venue
        })
      })
    }

    if (filters.subscription) {
      data = data.filter(entry => {
        const userDetails = useLeaderboardStore.getState().getUserDetails(entry.userId)
        return userDetails?.subscription === filters.subscription
      })
    }
    
    return data
  }, [selectedPeriod, selectedCompetition, filters])

  return (
    <div className="space-y-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Leaderboard
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {selectedCompetition ? 'Competition' : 'Global'} rankings for {selectedPeriod}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <LeaderboardExport data={leaderboardData} />
        </div>
      </div>

      <LeaderboardStats data={leaderboardData} />

      <LeaderboardFilters
        filters={filters}
        onFilterChange={setFilters}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        states={Object.keys(competitionStates)}
      />

      <LeaderboardTable 
        data={leaderboardData}
        showDetailedStats={true}
      />
    </div>
  )
}
