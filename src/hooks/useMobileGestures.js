import { useState, useEffect, useCallback } from 'react'

export function useMobileGestures({
  onSwipe,
  onPinch,
  onPan,
  threshold = 50,
  preventScroll = false
}) {
  const [touchState, setTouchState] = useState({
    startX: 0,
    startY: 0,
    startDistance: 0,
    isPanning: false,
    isPinching: false
  })

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      setTouchState(prev => ({
        ...prev,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        isPanning: true
      }))
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches)
      setTouchState(prev => ({
        ...prev,
        startDistance: distance,
        isPinching: true
      }))
    }
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (preventScroll) {
      e.preventDefault()
    }

    if (touchState.isPanning && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchState.startX
      const deltaY = e.touches[0].clientY - touchState.startY

      // Determine swipe direction
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY)
          ? deltaX > 0 ? 'right' : 'left'
          : deltaY > 0 ? 'down' : 'up'

        onSwipe?.(direction, { deltaX, deltaY })
      }

      onPan?.({ deltaX, deltaY })
    } else if (touchState.isPinching && e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches)
      const scale = currentDistance / touchState.startDistance

      onPinch?.(scale)
    }
  }, [touchState, threshold, onSwipe, onPan, onPinch, preventScroll])

  const handleTouchEnd = useCallback(() => {
    setTouchState(prev => ({
      ...prev,
      isPanning: false,
      isPinching: false
    }))
  }, [])

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll })
    document.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, preventScroll])

  return {
    isPanning: touchState.isPanning,
    isPinching: touchState.isPinching
  }
}

// Helper function to calculate distance between two touch points
function getTouchDistance(touches) {
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY
  return Math.sqrt(dx * dx + dy * dy)
}
