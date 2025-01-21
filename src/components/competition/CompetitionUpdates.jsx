import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCompetitionStore from '../../store/competitionStore'

export default function CompetitionUpdates({ competitionId }) {
  const { 
    updates, 
    subscribeToUpdates,
    fetchCompetitionUpdates 
  } = useCompetitionStore()

  useEffect(() => {
    fetchCompetitionUpdates(competitionId)
    const unsubscribe = subscribeToUpdates(competitionId)
    return unsubscribe
  }, [competitionId])

  const competitionUpdates = updates
    .filter(update => update.competitionId === competitionId)
    .slice(0, 5) // Show last 5 updates

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 pointer-events-none">
      <AnimatePresence>
        {competitionUpdates.map((update) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-4 mb-2 shadow-lg pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                {update.type === 'UPDATE' ? '📊' : '🔄'}
              </div>
              <div>
                <h4 className="font-medium">Competition Update</h4>
                <p className="text-sm text-gray-300">
                  {formatUpdate(update)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function formatUpdate(update) {
  switch (update.type) {
    case 'UPDATE':
      const changes = []
      if (update.data.odds) changes.push(`Odds updated to ${update.data.odds}`)
      if (update.data.participants) changes.push(`${update.data.participants} participants`)
      if (update.data.status) changes.push(`Status: ${update.data.status}`)
      return changes.join(' • ')
    default:
      return 'Competition details updated'
  }
}
