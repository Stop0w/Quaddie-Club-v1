import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useNavigationStore from '../store/navigationStore'

export function useNavigationContext() {
  const location = useLocation()
  const {
    currentContext,
    setCurrentContext,
    addToHistory,
    addToRecentlyViewed,
    updateBreadcrumbs,
    getContextForPath
  } = useNavigationStore()

  // Update navigation context when location changes
  useEffect(() => {
    const context = getContextForPath(location.pathname)
    setCurrentContext(context)
    addToHistory(location.pathname)
    updateBreadcrumbs(location.pathname)
    
    addToRecentlyViewed({
      path: location.pathname,
      timestamp: new Date().toISOString()
    })
  }, [location.pathname])

  const updateContext = useCallback((path) => {
    const context = getContextForPath(path)
    setCurrentContext(context)
  }, [])

  return {
    currentContext,
    updateContext
  }
}
