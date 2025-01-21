import { competitionStates } from '../../data/dummyCompetitions'

export default function LeaderboardFilters({ 
  filters, 
  onFilterChange, 
  subscription,
  onStateRestriction 
}) {
  const allowedStates = {
    'MAIDEN': ['NSW', 'VIC'],
    'BENCHMARK': ['NSW', 'VIC', 'QLD'],
    'GROUP': Object.keys(competitionStates)
  }[subscription.plan]

  return (
    <div className="flex space-x-4">
      <select
        value={filters.type}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
        className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
      >
        <option value="all">All Types</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="venue">Venue-Specific</option>
      </select>

      <select
        value={filters.state}
        onChange={(e) => {
          const state = e.target.value
          if (allowedStates.includes(state)) {
            onFilterChange({ ...filters, state })
          } else {
            onStateRestriction()
          }
        }}
        className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
      >
        <option value="all">All States</option>
        {Object.keys(competitionStates).map(state => (
          <option 
            key={state} 
            value={state}
            disabled={!allowedStates.includes(state)}
          >
            {competitionStates[state].name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search competitions..."
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
      />
    </div>
  )
}
