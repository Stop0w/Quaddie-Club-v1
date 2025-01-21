/**
 * API Helper Functions
 * Utility functions for API integration
 */

/**
 * Format API Error
 * Standardizes error format across the application
 * 
 * TODO: Update error codes and messages based on actual API responses
 */
export const formatApiError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message
    }
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred'
  }
}

/**
 * API Response Handler
 * Generic handler for API responses
 * 
 * TODO: Update to match actual API response format
 */
export const handleApiResponse = async <T>(
  promise: Promise<Response>
): Promise<T> => {
  try {
    const response = await promise
    const data = await response.json()

    if (!response.ok) {
      throw {
        code: data.error?.code || 'API_ERROR',
        message: data.error?.message || 'An error occurred',
        status: response.status
      }
    }

    return data
  } catch (error) {
    throw formatApiError(error)
  }
}

/**
 * Auth Header Generator
 * Creates authorization header with JWT token
 * 
 * TODO: Update token format based on actual API requirements
 */
export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * API URL Generator
 * Generates full API URLs
 * 
 * TODO: Update with actual API base URL
 */
export const getApiUrl = (endpoint: string) => {
  const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
  return `${BASE_URL}${endpoint}`
}
