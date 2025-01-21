import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  resistance = 1.5
}) {
  const [startY, setStartY] = useState(0)
  const [pulling, setPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const controls = useAnimation()
  const haptics = useHapticFeedback()

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
      setPulling(true)
    }
  }

  const handleTouchMove = (e) => {
    if (!pulling) return

    const currentY = e.touches[0].clientY
    const distance = Math.max(0, (currentY - startY) / resistance)
    setPullDistance(distance)

    if (distance >= threshold) {
      haptics.light()
    }
  }

  const handleTouchEnd = async () => {
    if (!pulling) return

    setPulling(false)

    if (pullDistance >= threshold) {
      haptics.success()
      controls.start({ y: threshold / 2 })
      await onRefresh()
    }

    controls.start({ y: 0 })
    setPullDistance(0)
  }

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [pulling, startY, pullDistance])

  return (
    <div className="relative">
      {/* Pull Indicator */}
      <motion.div
        animate={controls}
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: -60 }}
      >
        <div className="flex items-center gap-2 text-gray-400">
          <motion.div
            animate={{ rotate: pullDistance >= threshold ? 180 : 0 }}
            className="w-5 h-5"
          >
            ↓
          </motion.div>
          <span className="text-sm">
            {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        animate={controls}
        style={{ y: pullDistance }}
      >
        {children}
      </motion.div>
    </div>
  )
}
