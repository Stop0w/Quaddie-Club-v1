import { useState, useEffect } from 'react'
import { cacheManager } from '../utils/cacheManager'

export function useOfflineSync(key, fetchData, options = {}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingActions, setPendingActions] = useState([])

  const { expiry } = options

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Load data
  const loadData = async (force = false) => {
    setIsLoading(true)
    setError(null)

    try {
      // Check cache first
      const cached = !force && cacheManager.get(key)
      if (cached) {
        setData(cached)
        setIsLoading(false)
        return
      }

      // Fetch fresh data if online
      if (isOnline) {
        const fresh = await fetchData()
        await cacheManager.set(key, fresh, expiry)
        setData(fresh)
      } else {
        setError('You are offline. Showing cached data.')
      }
    } catch (err) {
      setError(err.message)
      // Fallback to cache on error
      const cached = cacheManager.get(key)
      if (cached) setData(cached)
    } finally {
      setIsLoading(false)
    }
  }

  // Queue offline action
  const queueAction = async (action) => {
    if (!isOnline) {
      setPendingActions(prev => [...prev, action])
      return false
    }
    return true
  }

  // Process pending actions when back online
  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      const processPending = async () => {
        const actions = [...pendingActions]
        setPendingActions([])

        for (const action of actions) {
          try {
            await action()
          } catch (error) {
            console.error('Failed to process pending action:', error)
            setPendingActions(prev => [...prev, action])
          }
        }

        // Refresh data after processing actions
        await loadData(true)
      }

      processPending()
    }
  }, [isOnline, pendingActions])

  // Initial load
  useEffect(() => {
    loadData()
  }, [key])

  return {
    data,
    isLoading,
    error,
    isOnline,
    pendingActions,
    refresh: () => loadData(true),
    queueAction
  }
}
