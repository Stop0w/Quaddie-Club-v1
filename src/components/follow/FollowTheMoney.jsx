import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import PlayerSearch from './PlayerSearch'
import PerformanceFilters from './PerformanceFilters'
import PlayersList from './PlayersList'
import SubscriptionPrompt from '../common/SubscriptionPrompt'

export default function FollowTheMoney() {
  const { user } = useAuthStore()
  const [activeFilter, setActiveFilter] = useState(null)
  const [dateRange, setDateRange] = useState('all-time')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false)

  const dateRanges = [
    { id: 'last-week', label: 'Last Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'this-year', label: 'This Year' },
    { id: 'all-time', label: 'All Time' },
    { id: 'spring-carnival', label: 'Spring Carnival' }
  ]

  const filters = [
    { id: 'state', label: 'State' },
    { id: 'track', label: 'Track' },
    { id: 'strike-rate', label: 'Strike Rate' },
    { id: 'highest-total', label: 'Highest Total' },
    { id: 'persona', label: 'Persona' }
  ]

  const handleFollowPlayer = (playerId) => {
    if (!user) {
      setShowSubscriptionPrompt(true)
      return
    }
    // Handle follow logic
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl text-white mb-6">Follow The Money</h2>
      
      <div className="mb-6">
        <PlayerSearch 
          value={searchQuery}
          onChange={setSearchQuery}
          isAuthenticated={!!user}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg text-white mb-3">Use race stats to find an edge</h3>
        
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="w-full bg-[#0066FF] text-white px-4 py-2 rounded mb-4"
        >
          {dateRanges.map(range => (
            <option key={range.id} value={range.id}>{range.label}</option>
          ))}
        </select>

        <div className="flex gap-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={`
                px-4 py-2 rounded text-sm font-medium
                ${activeFilter === filter.id
                  ? 'bg-[#00E6E6] text-black'
                  : 'bg-[#0066FF] text-white hover:bg-blue-600'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <PlayersList 
        dateRange={dateRange}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        onFollowPlayer={handleFollowPlayer}
        isAuthenticated={!!user}
      />

      <SubscriptionPrompt 
        isOpen={showSubscriptionPrompt}
        onClose={() => setShowSubscriptionPrompt(false)}
        feature="following players"
      />
    </div>
  )
}
