import { 
  ApiResponse, 
  LoginResponse, 
  RegistrationResponse,
  VerificationResponse,
  RegistrationFormData,
  User 
} from './auth'

/**
 * Auth Service Types
 */
export interface AuthService {
  login: (email: string, password: string) => Promise<ApiResponse<LoginResponse>>
  register: (data: RegistrationFormData) => Promise<ApiResponse<RegistrationResponse>>
  verifyEmail: (email: string, code: string) => Promise<ApiResponse<VerificationResponse>>
  resendVerification: (email: string) => Promise<ApiResponse<{ success: boolean }>>
  logout: () => Promise<ApiResponse<void>>
}

/**
 * User Service Types
 */
export interface UserService {
  getCurrentUser: () => Promise<ApiResponse<User>>
  updateProfile: (data: Partial<User>) => Promise<ApiResponse<User>>
  updatePassword: (oldPassword: string, newPassword: string) => Promise<ApiResponse<void>>
  updateSubscription: (plan: string) => Promise<ApiResponse<User>>
}

/**
 * API Client Types
 */
export interface ApiClientConfig {
  baseURL: string
  timeout: number
  headers?: Record<string, string>
}

export interface ApiClient {
  get: <T>(url: string) => Promise<ApiResponse<T>>
  post: <T>(url: string, data: unknown) => Promise<ApiResponse<T>>
  put: <T>(url: string, data: unknown) => Promise<ApiResponse<T>>
  delete: <T>(url: string) => Promise<ApiResponse<T>>
}

/**
 * Error Handling Types
 */
export interface ApiError extends Error {
  code: string
  status: number
  details?: Record<string, string>
}

export type ErrorHandler = (error: ApiError) => void

/**
 * Response Transformer Types
 */
export interface ResponseTransformer<T, R> {
  transform: (response: ApiResponse<T>) => R
}

/**
 * Loading State Types
 */
export interface LoadingState {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}
