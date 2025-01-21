import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function RaceList({ races, filters }) {
  // Filter races based on selected filters
  const filteredRaces = races.filter(race => {
    if (filters.venue !== 'all' && race.venue.id !== filters.venue) return false
    if (filters.type !== 'all' && race.type !== filters.type) return false
    if (filters.date && format(new Date(race.date), 'yyyy-MM-dd') !== filters.date) return false
    return true
  })

  // Group races by date
  const groupedRaces = filteredRaces.reduce((groups, race) => {
    const date = format(new Date(race.date), 'yyyy-MM-dd')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(race)
    return groups
  }, {})

  return (
    <div className="space-y-6">
      {Object.entries(groupedRaces).map(([date, races], groupIndex) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">
            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
          </h3>

          <div className="space-y-4">
            {races.map((race, index) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-white">
                        {race.name}
                      </h4>
                      <p className="text-gray-400">
                        {race.venue.name} • Race {race.number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        {format(new Date(race.time), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-400">
                        {race.distance}m • {race.type}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-gray-400">Prize: </span>
                        <span className="text-white">${race.prizeMoney.toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Runners: </span>
                        <span className="text-white">{race.runners}</span>
                      </div>
                    </div>

                    <Link
                      to={`/races/${race.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Progress Bar */}
                {race.timeToStart && (
                  <div className="bg-gray-700 h-1">
                    <div
                      className="bg-blue-500 h-1"
                      style={{
                        width: `${(race.timeToStart / (24 * 60 * 60)) * 100}%`
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {Object.keys(groupedRaces).length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400">No races found matching your filters</p>
        </motion.div>
      )}
    </div>
  )
}
