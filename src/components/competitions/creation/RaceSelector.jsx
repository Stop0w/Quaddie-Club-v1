import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RaceSelector({ selectedRaces, onRaceSelect }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVenue, setSelectedVenue] = useState('all')

  // Dummy data - replace with API call
  const availableRaces = [
    { id: 1, name: 'Race 1', venue: 'Venue A', time: '14:00', date: '2024-01-20' },
    { id: 2, name: 'Race 2', venue: 'Venue B', time: '15:30', date: '2024-01-20' },
    { id: 3, name: 'Race 3', venue: 'Venue A', time: '16:00', date: '2024-01-20' },
    // Add more races
  ]

  const filteredRaces = availableRaces.filter(race => {
    const matchesSearch = race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         race.venue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVenue = selectedVenue === 'all' || race.venue === selectedVenue
    return matchesSearch && matchesVenue
  })

  const venues = [...new Set(availableRaces.map(race => race.venue))]

  const toggleRaceSelection = (raceId) => {
    const isSelected = selectedRaces.includes(raceId)
    if (isSelected) {
      onRaceSelect(selectedRaces.filter(id => id !== raceId))
    } else {
      onRaceSelect([...selectedRaces, raceId])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search races..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
        <select
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Venues</option>
          {venues.map(venue => (
            <option key={venue} value={venue}>{venue}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filteredRaces.map(race => (
          <motion.div
            key={race.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-4 rounded-lg cursor-pointer transition-colors
              ${selectedRaces.includes(race.id)
                ? 'bg-blue-600'
                : 'bg-gray-800 hover:bg-gray-700'
              }
            `}
            onClick={() => toggleRaceSelection(race.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">{race.name}</h3>
                <p className="text-sm text-gray-400">{race.venue}</p>
              </div>
              <div className="text-right">
                <p className="text-white">{race.time}</p>
                <p className="text-sm text-gray-400">
                  {new Date(race.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
        <p className="text-gray-400">
          {selectedRaces.length} races selected
        </p>
        <button
          onClick={() => onRaceSelect([])}
          className="text-sm text-gray-400 hover:text-white"
        >
          Clear Selection
        </button>
      </div>
    </div>
  )
}
