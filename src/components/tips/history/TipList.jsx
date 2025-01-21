import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

export default function TipList({ userId, venueId, dateRange, filters }) {
  const [expandedTip, setExpandedTip] = useState(null)

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            {/* Tip Header */}
            <div
              className="p-4 cursor-pointer hover:bg-gray-750"
              onClick={() => setExpandedTip(
                expandedTip === tip.id ? null : tip.id
              )}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-white">
                    {tip.horseName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {format(new Date(tip.date), 'PPP')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <TipOutcome outcome={tip.outcome} />
                  <motion.svg
                    animate={{ rotate: expandedTip === tip.id ? 180 : 0 }}
                    className="w-5 h-5 text-gray-400"
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
                  </motion.svg>
                </div>
              </div>
            </div>

            {/* Tip Details */}
            <AnimatePresence>
              {expandedTip === tip.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <DetailItem
                        label="Competition"
                        value={tip.competition}
                      />
                      <DetailItem
                        label="Venue"
                        value={tip.venue}
                      />
                      <DetailItem
                        label="Odds"
                        value={tip.odds}
                      />
                      <DetailItem
                        label="Return"
                        value={`$${tip.return}`}
                        isPositive={tip.return > 0}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function TipOutcome({ outcome }) {
  const colors = {
    win: 'bg-green-500',
    place: 'bg-blue-500',
    loss: 'bg-red-500'
  }

  return (
    <span className={`
      px-2 py-1 rounded-full text-xs font-medium text-white
      ${colors[outcome]}
    `}>
      {outcome.toUpperCase()}
    </span>
  )
}

function DetailItem({ label, value, isPositive }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`
        text-sm font-medium
        ${isPositive !== undefined
          ? isPositive
            ? 'text-green-500'
            : 'text-red-500'
          : 'text-white'
        }
      `}>
        {value}
      </p>
    </div>
  )
}
