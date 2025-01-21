import { useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children,
  snapPoints = ['25%', '50%', '90%']
}) {
  const controls = useAnimation()
  const sheetRef = useRef(null)
  const [currentSnap, setCurrentSnap] = useState(0)

  const handlers = useSwipeable({
    onSwipedUp: () => {
      const nextSnap = Math.min(currentSnap + 1, snapPoints.length - 1)
      setCurrentSnap(nextSnap)
      controls.start({ height: snapPoints[nextSnap] })
    },
    onSwipedDown: () => {
      const nextSnap = currentSnap - 1
      if (nextSnap < 0) {
        onClose()
      } else {
        setCurrentSnap(nextSnap)
        controls.start({ height: snapPoints[nextSnap] })
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            {...handlers}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl z-50
                       overflow-hidden shadow-xl"
            style={{ height: snapPoints[currentSnap] }}
          >
            {/* Drag Handle */}
            <div className="w-full h-12 flex items-center justify-center">
              <div className="w-12 h-1 bg-gray-700 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-4 pb-4 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
