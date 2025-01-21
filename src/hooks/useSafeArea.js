import { useState, useEffect } from 'react'

export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    topInset: 0,
    rightInset: 0,
    bottomInset: 0,
    leftInset: 0
  })

  useEffect(() => {
    const updateSafeArea = () => {
      setSafeArea({
        topInset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0', 10),
        rightInset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sar') || '0', 10),
        bottomInset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sab') || '0', 10),
        leftInset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sal') || '0', 10)
      })
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
    return () => window.removeEventListener('resize', updateSafeArea)
  }, [])

  return safeArea
}
