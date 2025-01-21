import { useState, useEffect } from 'react'

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false)
  const [deviceType, setDeviceType] = useState('desktop')

  useEffect(() => {
    const checkDevice = () => {
      const ua = navigator.userAgent
      const width = window.innerWidth
      
      if (/iPhone|iPad|iPod/.test(ua)) {
        setDeviceType('ios')
        setIsMobile(true)
      } else if (/Android/.test(ua)) {
        setDeviceType('android')
        setIsMobile(true)
      } else {
        setDeviceType(width <= 768 ? 'mobile' : 'desktop')
        setIsMobile(width <= 768)
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, deviceType }
}
