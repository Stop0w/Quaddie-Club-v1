import { motion, AnimatePresence } from 'framer-motion';
import { useOfflineSync } from '../../hooks/useOfflineSync';

export default function OfflineIndicator() {
  const { isOnline, isSyncing, pendingActions } = useOfflineSync();

  return (
    <AnimatePresence>
      {(!isOnline || isSyncing || pendingActions.length > 0) && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 bg-gray-900 z-50"
        >
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isOnline ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm text-white">You're offline</span>
                </>
              ) : isSyncing ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-sm text-white">Syncing changes...</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-white">
                    {pendingActions.length} changes pending
                  </span>
                </>
              )}
            </div>
            
            {pendingActions.length > 0 && isOnline && !isSyncing && (
              <button
                onClick={() => window.location.reload()}
                className="text-sm text-blue-400"
              >
                Sync Now
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
