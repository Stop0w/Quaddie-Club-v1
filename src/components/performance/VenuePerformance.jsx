import { motion } from 'framer-motion'

export default function VenuePerformance({ data }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Venue Performance</h3>
      
      <div className="space-y-4">
        {data.venues.map((venue, index) => (
          <motion.div
            key={venue.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-white">{venue.name}</h4>
              <span className="text-sm text-gray-400">
                {venue.totalRaces} races
              </span>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-500">
                    {venue.winRate}% Win Rate
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-500">
                    ROI: {venue.roi}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${venue.winRate}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
