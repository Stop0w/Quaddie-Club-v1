import { createContext, useContext, useCallback } from 'react'
import { useNavigationState } from '../../hooks/useNavigationState'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const {
    navigationHistory,
    recentlyViewed,
    breadcrumbTrail,
    goBack,
    goToRecent,
    clearHistory
  } = useNavigationState()

  const contextValue = {
    navigationHistory,
    recentlyViewed,
    breadcrumbTrail,
    goBack,
    goToRecent,
    clearHistory
  }

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
