import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ParticipantList({ competition }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('joinDate')

  const filteredParticipants = competition.participants
    .filter(participant => 
      participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'joinDate') {
        return new Date(b.joinDate) - new Date(a.joinDate)
      }
      if (sortBy === 'rank') {
        return a.rank - b.rank
      }
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search participants..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
        >
          <option value="joinDate">Join Date</option>
          <option value="rank">Current Rank</option>
        </select>
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredParticipants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-900 rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Link
                    to={`/profile/${participant.id}`}
                    className="text-white font-medium hover:text-blue-500"
                  >
                    {participant.name}
                  </Link>
                  <p className="text-sm text-gray-400">
                    Joined {new Date(participant.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Current Rank</p>
                  <p className="text-lg font-medium text-white">
                    #{participant.rank}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Points</p>
                  <p className="text-lg font-medium text-white">
                    {participant.points}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
