import { motion, AnimatePresence } from 'framer-motion'
import useTipsStore from '../../store/tipsStore'

export default function UseSamePicksIndicator() {
  const { useSameSelections, affectedCompetitions } = useTipsStore()

  return (
    <AnimatePresence>
      {useSameSelections && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-4 right-4 bg-blue-600/90 backdrop-blur-sm 
                     rounded-lg p-4 shadow-lg z-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-medium">Synced Selections</h3>
                <p className="text-sm text-blue-200">
                  Picks will be applied to {affectedCompetitions.length} competitions
                </p>
              </div>
            </div>
            <button 
              onClick={() => useTipsStore.getState().showSyncDetails()}
              className="text-white text-sm underline"
            >
              View Details
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
