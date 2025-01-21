import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

export default function TipHistory({ dateRange }) {
  const [selectedTip, setSelectedTip] = useState(null)

  // Dummy data - replace with real data
  const tips = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    horse: `Horse ${i + 1}`,
    race: `Race ${i + 1}`,
    venue: `Venue ${(i % 3) + 1}`,
    odds: (Math.random() * 5 + 1.5).toFixed(2),
    result: Math.random() > 0.3 ? 'win' : 'loss',
    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    profit: Math.random() > 0.3 ? Math.random() * 100 : -10
  }))

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Tip History</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Horse</th>
              <th className="px-6 py-3 font-medium">Race</th>
              <th className="px-6 py-3 font-medium">Venue</th>
              <th className="px-6 py-3 font-medium">Odds</th>
              <th className="px-6 py-3 font-medium">Result</th>
              <th className="px-6 py-3 font-medium">Profit/Loss</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {tips.map((tip) => (
              <motion.tr
                key={tip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-sm text-gray-300">
                  {format(new Date(tip.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">
                  {tip.horse}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {tip.race}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {tip.venue}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {tip.odds}
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${tip.result === 'win'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }
                  `}>
                    {tip.result.toUpperCase()}
                  </span>
                </td>
                <td className={`
                  px-6 py-4 text-sm font-medium
                  ${tip.profit > 0 ? 'text-green-500' : 'text-red-500'}
                `}>
                  {tip.profit > 0 ? '+' : ''}{tip.profit.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedTip(tip)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tip Details Modal */}
      <AnimatePresence>
        {selectedTip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 rounded-lg p-6 max-w-lg w-full"
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Tip Details
              </h3>
              {/* Add detailed tip information here */}
              <button
                onClick={() => setSelectedTip(null)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
