import { ApiClient, ApiClientConfig, ApiResponse } from '../types/services'

/**
 * Mock API Client for development
 * TODO: Replace with actual API client (e.g., axios) in production
 */
export const createApiClient = (config: ApiClientConfig): ApiClient => ({
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock API responses based on URL
    switch (url) {
      case '/user/profile':
        return { success: true, data: mockUserData as T }
      // Add other GET endpoints as needed
      default:
        throw new Error(`Unhandled GET request: ${url}`)
    }
  },

  post: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock API responses based on URL
    switch (url) {
      case '/auth/login':
        return { success: true, data: mockLoginResponse as T }
      case '/auth/register':
        return { success: true, data: mockRegistrationResponse as T }
      // Add other POST endpoints as needed
      default:
        throw new Error(`Unhandled POST request: ${url}`)
    }
  },

  // Add other methods as needed
})

// Mock data for development
const mockUserData = {
  id: 'u1',
  email: 'user@example.com',
  // ... other user data
}

const mockLoginResponse = {
  user: mockUserData,
  token: 'mock-jwt-token'
}

const mockRegistrationResponse = {
  verificationEmail: 'user@example.com',
  expiresIn: 300 // 5 minutes
}
