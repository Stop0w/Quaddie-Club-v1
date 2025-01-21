import { useEffect, useState } from 'react'

export function usePullToRefresh(onRefresh) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const threshold = 80 // pixels to trigger refresh

  useEffect(() => {
    let startY = 0
    let isRefreshing = false

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (startY && !isRefreshing) {
        const y = e.touches[0].clientY
        const distance = y - startY
        
        if (distance > 0) {
          e.preventDefault()
          setIsPulling(true)
          setPullDistance(Math.min(distance * 0.5, threshold))
        }
      }
    }

    const handleTouchEnd = async () => {
      if (pullDistance >= threshold && !isRefreshing) {
        isRefreshing = true
        await onRefresh()
        isRefreshing = false
      }
      
      setIsPulling(false)
      setPullDistance(0)
      startY = 0
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onRefresh, pullDistance])

  return { isPulling, pullDistance }
}
