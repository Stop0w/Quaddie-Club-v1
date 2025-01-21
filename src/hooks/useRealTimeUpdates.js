import { useState, useEffect, useCallback } from 'react'

export function useRealTimeUpdates() {
  const [isConnected, setIsConnected] = useState(false)
  const [subscribers, setSubscribers] = useState({})

  // Simulate WebSocket connection
  useEffect(() => {
    setIsConnected(true)
    
    // Simulate periodic updates
    const interval = setInterval(() => {
      Object.entries(subscribers).forEach(([channel, callback]) => {
        // Simulate receiving updates
        const update = {
          id: Math.random().toString(),
          timestamp: new Date().toISOString(),
          // Add other relevant update data
        }
        callback(update)
      })
    }, 5000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [subscribers])

  const subscribe = useCallback((channel, callback) => {
    setSubscribers(prev => ({
      ...prev,
      [channel]: callback
    }))

    return () => {
      setSubscribers(prev => {
        const { [channel]: removed, ...rest } = prev
        return rest
      })
    }
  }, [])

  return {
    isConnected,
    subscribe
  }
}
