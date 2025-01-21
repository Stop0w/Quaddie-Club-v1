import { useState, useEffect } from 'react'

export function useViewport() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isLandscape: window.innerWidth > window.innerHeight,
    safeAreaTop: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'),
    safeAreaBottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0')
  })

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        isLandscape: window.innerWidth > window.innerHeight,
        safeAreaTop: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0'),
        safeAreaBottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0')
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewport
}
