import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence } from 'framer-motion'
import useTipsStore from '../../store/tipsStore'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorFallback from '../common/ErrorFallback'

// Lazy load components
const HorseList = lazy(() => import('./HorseList'))
const RaceNavigation = lazy(() => import('./RaceNavigation'))

export default function TipsEntry() {
  const { 
    currentRace,
    isLoading,
    error,
    undo,
    redo
  } = useTipsStore()

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      // Navigate to next race
      if (currentRace < 7) {
        setCurrentRace(currentRace + 1)
      }
    },
    onSwipedRight: () => {
      // Navigate to previous race
      if (currentRace > 0) {
        setCurrentRace(currentRace - 1)
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [undo, redo])

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <div className="min-h-screen bg-black" {...swipeHandlers}>
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Components here */}
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
