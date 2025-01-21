import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCompetitionStore from '../../store/competitionStore'

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)
  const { activeCompetition } = useCompetitionStore()

  const actions = [
    {
      id: 'submit-tips',
      label: 'Submit Tips',
      icon: '🎯',
      action: () => {/* Implementation */},
      condition: activeCompetition?.status === 'open'
    },
    {
      id: 'view-leaderboard',
      label: 'View Leaderboard',
      icon: '🏆',
      action: () => {/* Implementation */},
      condition: true
    },
    {
      id: 'share-results',
      label: 'Share Results',
      icon: '📤',
      action: () => {/* Implementation */},
      condition: activeCompetition?.status === 'completed'
    },
    {
      id: 'sync-picks',
      label: 'Sync Picks',
      icon: '🔄',
      action: () => {/* Implementation */},
      condition: true
    }
  ]

  return (
    <>
      {/* Quick Action Button */}
      <motion.button
        className="fixed right-4 bottom-20 z-50 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-xl">⚡</span>
      </motion.button>

      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Actions Menu */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-36 right-4 z-50 bg-gray-900 rounded-lg shadow-xl p-2 min-w-[200px]"
            >
              {actions
                .filter(action => action.condition)
                .map((action, index) => (
                  <motion.button
                    key={action.id}
                    className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    onClick={() => {
                      action.action()
                      setIsOpen(false)
                    }}
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span>{action.label}</span>
                  </motion.button>
                ))
              }
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
