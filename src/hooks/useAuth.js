import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export function useAuth() {
  const { user, isAuthenticated, login, logout, error } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored auth state on mount
    const checkAuth = async () => {
      // In a real app, verify token with backend
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          await login(userData.email, userData.password)
        } catch (error) {
          console.error('Failed to restore auth state:', error)
          localStorage.removeItem('user')
        }
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async (email, password) => {
    const success = await login(email, password)
    if (success) {
      // In a real app, store tokens instead of credentials
      localStorage.setItem('user', JSON.stringify({ email, password }))
      navigate('/competitions')
    }
    return success
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('user')
    navigate('/login')
  }

  return {
    user,
    isAuthenticated,
    error,
    login: handleLogin,
    logout: handleLogout
  }
}
