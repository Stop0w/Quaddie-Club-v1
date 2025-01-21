import { useState } from 'react'
import { motion } from 'framer-motion'
import TipCard from './TipCard'
import { useFeed } from '../../hooks/useFeed'

export default function PlayerFeed({ isVIP }) {
  const { feed, isLoading, hasMore, loadMore } = useFeed()
  const [filter, setFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Updates' },
    { id: 'tips', label: 'Tips' },
    { id: 'results', label: 'Results' },
    { id: 'achievements', label: 'Achievements' }
  ]

  return (
    <div className="space-y-6">
      {/* Feed Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              ${filter === id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        {feed.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TipCard
              tip={item}
              isVIP={isVIP}
              showDetails={isVIP}
            />
          </motion.div>
        ))}

        {/* Load More Button */}
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  )
}
