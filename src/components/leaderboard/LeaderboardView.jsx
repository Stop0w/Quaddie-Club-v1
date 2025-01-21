import { useState, useEffect } from 'react'
import useLeaderboardStore from '../../store/leaderboardStore'
import useAuthStore from '../../store/authStore'
import { competitions, competitionStates } from '../../data/dummyCompetitions'
import LeaderboardFilters from './LeaderboardFilters'
import LeaderboardTable from './LeaderboardTable'
import SubscriptionRestrictionModal from '../common/SubscriptionRestrictionModal'

const PERIODS = [
  { id: 'today', label: "Today's Races" },
  { id: 'lastWeek', label: "Last Week" },
  { id: 'thisMonth', label: "This Month" },
  { id: 'monthly', label: "Monthly" },
  { id: 'allTime', label: "All Time" }
]

export default function LeaderboardView() {
  const { user } = useAuthStore()
  const [selectedCompetition, setSelectedCompetition] = useState(competitions[0]?.id)
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[0].id)
  const [filters, setFilters] = useState({
    type: 'all', // public, private, venue-specific
    state: 'all',
    venue: 'all',
    search: ''
  })
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const { getLeaderboardData, subscribeToUpdates, unsubscribeFromUpdates } = useLeaderboardStore()

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToUpdates(selectedCompetition)
    return () => unsubscribe()
  }, [selectedCompetition])

  // Check subscription restrictions
  const handleStateFilter = (state) => {
    const subscription = user.subscription.plan
    const allowedStates = {
      'MAIDEN': ['NSW', 'VIC'],
      'BENCHMARK': ['NSW', 'VIC', 'QLD'],
      'GROUP': Object.keys(competitionStates)
    }

    if (!allowedStates[subscription].includes(state)) {
      setShowSubscriptionModal(true)
      return
    }

    setFilters(prev => ({ ...prev, state }))
  }

  // Filter competitions based on subscription
  const availableCompetitions = competitions.filter(comp => {
    if (user.subscription.plan === 'MAIDEN') {
      return comp.states.every(state => ['NSW', 'VIC'].includes(state))
    }
    if (user.subscription.plan === 'BENCHMARK') {
      return comp.states.every(state => ['NSW', 'VIC', 'QLD'].includes(state))
    }
    return true
  })

  return (
    <div className="space-y-8">
      {/* Competition List Section */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">Leaderboard</h2>
          <LeaderboardFilters 
            filters={filters}
            onFilterChange={setFilters}
            subscription={user.subscription}
            onStateRestriction={() => setShowSubscriptionModal(true)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="pb-4">Competition</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">States</th>
                <th className="pb-4">Players</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {availableCompetitions.map((comp) => (
                <tr key={comp.id} className="border-t border-gray-800">
                  <td className="py-3">{comp.name}</td>
                  <td className="py-3">{comp.type}</td>
                  <td className="py-3">{comp.status}</td>
                  <td className="py-3">{comp.states.join(', ')}</td>
                  <td className="py-3">{comp.players.length}</td>
                  <td className="py-3">{comp.role}</td>
                  <td className="py-3 space-x-2">
                    <button 
                      className="bg-[#0066FF] hover:bg-blue-600 px-3 py-1 rounded text-sm"
                      onClick={() => setSelectedCompetition(comp.id)}
                    >
                      View
                    </button>
                    {comp.role === 'Admin' && (
                      <>
                        <button className="bg-[#0066FF] hover:bg-blue-600 px-3 py-1 rounded text-sm">
                          Invite
                        </button>
                        {user.subscription.plan === 'GROUP' && (
                          <button className="bg-[#0066FF] hover:bg-blue-600 px-3 py-1 rounded text-sm">
                            Customise
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competition Leaderboard Section */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="mb-6">
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="bg-[#0066FF] text-white px-4 py-2 rounded w-full"
          >
            {availableCompetitions.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white">
            {competitions.find(c => c.id === selectedCompetition)?.name}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-blue-400 hover:text-blue-300">
              Share Results
            </button>
            {user.subscription.plan === 'GROUP' && (
              <button className="text-sm text-blue-400 hover:text-blue-300">
                Export Data
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {PERIODS.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`
                px-4 py-2 rounded text-sm font-medium
                ${selectedPeriod === period.id
                  ? 'bg-[#00E6E6] text-black'
                  : 'bg-[#0066FF] text-white hover:bg-blue-600'
                }
              `}
            >
              {period.label}
            </button>
          ))}
        </div>

        <LeaderboardTable 
          data={getLeaderboardData()}
          currentUserId={user.id}
          subscription={user.subscription}
        />
      </div>

      <SubscriptionRestrictionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentPlan={user.subscription.plan}
      />
    </div>
  )
}
