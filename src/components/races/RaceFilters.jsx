import { useState } from 'react'
import { motion } from 'framer-motion'
import { useVenues } from '../../hooks/useVenues'

export default function RaceFilters({ filters, onChange }) {
  const { venues } = useVenues()
  const [isExpanded, setIsExpanded] = useState(false)

  const raceTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'maiden', label: 'Maiden' },
    { id: 'group', label: 'Group' },
    { id: 'handicap', label: 'Handicap' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {/* Venue Filter */}
          <select
            value={filters.venue}
            onChange={(e) => onChange({ ...filters, venue: e.target.value })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">All Venues</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>

          {/* Race Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            {raceTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={filters.date || ''}
            onChange={(e) => onChange({ ...filters, date: e.target.value })}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white"
        >
          <span className="sr-only">
            {isExpanded ? 'Hide advanced filters' : 'Show advanced filters'}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-gray-800"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Distance Range */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Distance Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              {/* Prize Money */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Minimum Prize Money
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
