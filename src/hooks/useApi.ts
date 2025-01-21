import { useState, useCallback } from 'react'
import { ApiResponse } from '../types/services'
import { formatApiError } from '../utils/apiHelpers'

/**
 * Custom hook for handling API calls
 * Provides loading state, error handling, and response management
 * 
 * TODO: Add retry logic, request cancellation, and cache management
 */
export const useApi = <T>() => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (
    apiCall: () => Promise<ApiResponse<T>>
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiCall()
      
      if (!response.success) {
        throw response.error
      }

      setData(response.data || null)
      return response.data
    } catch (err) {
      const formattedError = formatApiError(err)
      setError(formattedError.message)
      throw formattedError
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    data,
    execute,
    setError,
    clearError: () => setError(null)
  }
}
