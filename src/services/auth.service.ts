import { AuthService } from '../types/services'
import { 
  ApiResponse, 
  LoginResponse, 
  RegistrationResponse,
  RegistrationFormData 
} from '../types/auth'
import { dummyUsers } from '../data/dummyUsers'

/**
 * Authentication Service
 * Handles all auth-related operations with mock implementations
 * TODO: Replace with actual API calls in production
 */
export const authService: AuthService = {
  /**
   * Login user
   * @param email User email
   * @param password User password
   * @returns Promise<ApiResponse<LoginResponse>>
   * 
   * TODO: Integration Points
   * - POST /api/auth/login
   * - Headers: Content-Type: application/json
   * - Body: { email: string, password: string }
   * - Response: { user: User, token: string }
   */
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    // Find user in dummy data
    const user = dummyUsers.find(u => 
      u.email === email && u.password === password
    )

    if (!user) {
      return {
        success: false,
        error: {
          code: 'AUTH_FAILED',
          message: 'Invalid email or password'
        }
      }
    }

    return {
      success: true,
      data: {
        user,
        token: `mock-token-${Date.now()}`
      }
    }
  },

  /**
   * Register new user
   * @param data Registration form data
   * @returns Promise<ApiResponse<RegistrationResponse>>
   * 
   * TODO: Integration Points
   * - POST /api/auth/register
   * - Headers: Content-Type: application/json
   * - Body: RegistrationFormData
   * - Response: { verificationEmail: string, expiresIn: number }
   */
  register: async (data: RegistrationFormData): Promise<ApiResponse<RegistrationResponse>> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    // Check if email exists in dummy data
    if (dummyUsers.some(u => u.email === data.email)) {
      return {
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'Email already registered'
        }
      }
    }

    return {
      success: true,
      data: {
        verificationEmail: data.email,
        expiresIn: 300 // 5 minutes
      }
    }
  },

  /**
   * Verify email with code
   * @param email User email
   * @param code Verification code
   * @returns Promise<ApiResponse<VerificationResponse>>
   * 
   * TODO: Integration Points
   * - POST /api/auth/verify
   * - Headers: Content-Type: application/json
   * - Body: { email: string, code: string }
   * - Response: { user: User, token: string }
   */
  verifyEmail: async (email: string, code: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    // For development, accept any 6-digit code
    if (!/^\d{6}$/.test(code)) {
      return {
        success: false,
        error: {
          code: 'INVALID_CODE',
          message: 'Invalid verification code'
        }
      }
    }

    return {
      success: true,
      data: {
        user: {
          id: `u${Date.now()}`,
          email,
          isVerified: true
          // ... other user data
        },
        token: `mock-token-${Date.now()}`
      }
    }
  },

  /**
   * Resend verification email
   * @param email User email
   * @returns Promise<ApiResponse<{ success: boolean }>>
   * 
   * TODO: Integration Points
   * - POST /api/auth/resend-verification
   * - Headers: Content-Type: application/json
   * - Body: { email: string }
   * - Response: { success: boolean }
   */
  resendVerification: async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      success: true,
      data: { success: true }
    }
  },

  /**
   * Logout user
   * @returns Promise<ApiResponse<void>>
   * 
   * TODO: Integration Points
   * - POST /api/auth/logout
   * - Headers: Authorization: Bearer <token>
   * - Response: { success: true }
   */
  logout: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      success: true
    }
  }
}
