import { useState, useEffect } from 'react'

export function useGestures(element, options = {}) {
  const [gesture, setGesture] = useState({
    direction: null,
    distance: 0,
    velocity: 0
  })

  useEffect(() => {
    if (!element.current) return

    let startX = 0
    let startY = 0
    let startTime = 0

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      startTime = Date.now()
    }

    const handleTouchMove = (e) => {
      if (!startTime) return

      const deltaX = e.touches[0].clientX - startX
      const deltaY = e.touches[0].clientY - startY
      const deltaTime = Date.now() - startTime
      
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const velocity = distance / deltaTime

      let direction = null
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }

      setGesture({ direction, distance, velocity })
    }

    const handleTouchEnd = () => {
      startTime = 0
      if (options.onGestureEnd) {
        options.onGestureEnd(gesture)
      }
    }

    element.current.addEventListener('touchstart', handleTouchStart)
    element.current.addEventListener('touchmove', handleTouchMove)
    element.current.addEventListener('touchend', handleTouchEnd)

    return () => {
      if (element.current) {
        element.current.removeEventListener('touchstart', handleTouchStart)
        element.current.removeEventListener('touchmove', handleTouchMove)
        element.current.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [element, options.onGestureEnd])

  return gesture
}
