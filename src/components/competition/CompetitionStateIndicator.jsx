import { motion } from 'framer-motion'
import useCompetitionStore from '../../store/competitionStore'

export default function CompetitionStateIndicator({ competitionId }) {
  const { competitions, isLoading, lastUpdate } = useCompetitionStore()
  const competition = competitions.find(c => c.id === competitionId)

  if (!competition) return null

  return (
    <div className="fixed top-4 right-4 z-40">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className={`
            w-2 h-2 rounded-full
            ${isLoading ? 'bg-yellow-500' : 
              competition.status === 'open' ? 'bg-green-500' : 'bg-red-500'}
          `} />

          {/* Competition Status */}
          <div className="text-sm">
            <p className="text-white font-medium">
              {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
            </p>
            {lastUpdate && (
              <p className="text-xs text-gray-400">
                Updated {formatTimestamp(lastUpdate)}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000) // seconds

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return date.toLocaleDateString()
}
