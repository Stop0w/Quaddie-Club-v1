import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

export default function TipCard({ tip, isVIP, showDetails }) {
  const [expanded, setExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Tip Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={tip.user.avatar}
              alt={tip.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-white">
                {tip.user.name}
              </h3>
              <p className="text-sm text-gray-400">
                {format(new Date(tip.timestamp), 'PPp')}
              </p>
            </div>
          </div>
          <TipOutcome outcome={tip.outcome} />
        </div>

        {/* Tip Content */}
        <div className="mt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white font-medium">
                {tip.horseName}
              </p>
              <p className="text-sm text-gray-400">
                {tip.raceName} • {tip.venue}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">
                ${tip.odds.toFixed(2)}
              </p>
              {showDetails && (
                <p className={`
                  text-sm font-medium
                  ${tip.return > 0 ? 'text-green-500' : 'text-red-500'}
                `}>
                  {tip.return > 0 ? '+' : ''}{tip.return.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-800 flex justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Comments ({tip.commentCount})
          </button>
          {isVIP && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-white text-sm"
            >
              {expanded ? 'Less Details' : 'More Details'}
            </button>
          )}
        </div>
        <button className="text-gray-400 hover:text-white text-sm">
          Share
        </button>
      </div>

      {/* Expanded Details (VIP Only) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-800 bg-gray-800/50">
              <VIPDetails tip={tip} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-gray-800">
              <Comments tipId={tip.id} />
            </div>
          </motion.div>
        )}
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
