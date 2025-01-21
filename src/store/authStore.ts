import { create } from 'zustand'
import { AuthState, AuthActions, User, RegistrationFormData } from '../types/auth'

const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  verificationEmail: null,
  registrationData: null,

  // Actions
  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      const response = await new Promise<User>((resolve) => 
        setTimeout(() => {
          // Simulate API response
          resolve({
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            // ... other user properties
          } as User)
        }, 800)
      )
      
      set({ 
        user: response, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      })
      
      return true
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred' 
      })
      return false
    }
  },

  register: async (userData: RegistrationFormData): Promise<boolean> => {
    set({ isLoading: true, error: null })
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      set({ 
        registrationData: userData,
        verificationEmail: userData.email,
        isLoading: false 
      })
      
      return true
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      })
      return false
    }
  },

  // ... other actions with proper typing
}))

export default useAuthStore
