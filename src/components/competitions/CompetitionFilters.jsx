import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CompetitionFilters({ filters, onChange }) {
  const [savedFilters, setSavedFilters] = useState([])

  const filterCategories = [
    {
      title: 'Membership Type',
      options: ['Free', 'Paid', 'VIP'],
      key: 'membershipType'
    },
    {
      title: 'Venue Type',
      options: ['In-Venue', 'Online', 'Hybrid'],
      key: 'venueType'
    },
    {
      title: 'Prize Type',
      options: ['In-Venue Prizes', 'Cash Prizes', 'VIP Prizes'],
      key: 'prizeType'
    },
    {
      title: 'Status',
      options: ['Upcoming', 'Active', 'Completed'],
      key: 'status'
    }
  ]

  const saveCurrentFilters = () => {
    setSavedFilters([...savedFilters, { ...filters, name: 'Saved Filter' }])
  }

  return (
    <div className="space-y-6">
      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Saved Filters</h3>
          <div className="space-y-2">
            {savedFilters.map((saved, index) => (
              <button
                key={index}
                onClick={() => onChange(saved)}
                className="w-full text-left px-3 py-2 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                {saved.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Categories */}
      {filterCategories.map((category) => (
        <div key={category.key}>
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            {category.title}
          </h3>
          <div className="space-y-2">
            {category.options.map((option) => (
              <label
                key={option}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  checked={filters[category.key]?.includes(option)}
                  onChange={(e) => {
                    const currentFilters = filters[category.key] || []
                    onChange({
                      ...filters,
                      [category.key]: e.target.checked
                        ? [...currentFilters, option]
                        : currentFilters.filter(f => f !== option)
                    })
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-700 bg-gray-900 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-white">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Save Filters Button */}
      <button
        onClick={saveCurrentFilters}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Save Current Filters
      </button>

      {/* Clear Filters */}
      <button
        onClick={() => onChange({})}
        className="w-full px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:text-white"
      >
        Clear All Filters
      </button>
    </div>
  )
}
