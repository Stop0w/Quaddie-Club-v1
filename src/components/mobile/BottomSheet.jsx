import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGestures } from '../../hooks/useGestures'

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children,
  snapPoints = ['25%', '50%', '90%'],
  initialSnap = 0
}) {
  const [currentSnap, setCurrentSnap] = useState(initialSnap)
  const sheetRef = useRef(null)
  const gesture = useGestures(sheetRef)

  useEffect(() => {
    if (gesture.direction === 'down' && gesture.velocity > 0.5) {
      if (currentSnap === 0) {
        onClose()
      } else {
        setCurrentSnap(prev => Math.max(0, prev - 1))
      }
    } else if (gesture.direction === 'up' && gesture.velocity > 0.5) {
      setCurrentSnap(prev => Math.min(snapPoints.length - 1, prev + 1))
    }
  }, [gesture])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ 
              y: `${100 - parseInt(snapPoints[currentSnap])}%`,
              transition: { type: 'spring', damping: 20 }
            }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-50 overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            {/* Drag Handle */}
            <div className="w-full h-12 flex items-center justify-center">
              <div className="w-12 h-1 bg-gray-700 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-4 pb-4 overflow-y-auto">
              {children}
            </div>

            {/* Safe Area Spacing */}
            <div className="h-[env(safe-area-inset-bottom)]" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
