import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useNavigationStore from '../store/navigationStore'

export function useNavigationState() {
  const navigate = useNavigate()
  const {
    navigationHistory,
    recentlyViewed,
    breadcrumbTrail,
    clearNavigation
  } = useNavigationStore()

  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const previousPath = navigationHistory[1]
      navigate(previousPath)
    } else {
      navigate('/')
    }
  }, [navigationHistory, navigate])

  const goToRecent = useCallback((path) => {
    navigate(path)
  }, [navigate])

  const clearHistory = useCallback(() => {
    clearNavigation()
  }, [])

  return {
    navigationHistory,
    recentlyViewed,
    breadcrumbTrail,
    goBack,
    goToRecent,
    clearHistory
  }
}
