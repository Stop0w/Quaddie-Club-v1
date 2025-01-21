/**
 * User Subscription Types
 */
export type SubscriptionTier = 'MAIDEN' | 'BENCHMARK' | 'GROUP'
export type BillingInterval = 'monthly' | 'yearly'

export interface SubscriptionPlan {
  name: string
  price: number
  interval: BillingInterval
  features: string[]
  description: string
  recommended?: boolean
  discount?: string
}

/**
 * User Types
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  subscription: {
    plan: SubscriptionTier
    interval: BillingInterval
    startDate: string
    nextBillingDate: string | null
    status: 'active' | 'inactive' | 'cancelled' | 'past_due'
    features: string[]
  }
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      raceReminders: boolean
      resultsUpdates: boolean
      competitionInvites: boolean
    }
    displayName: string
    timezone: string
    defaultVenue: string
  }
  stats: {
    totalTipsSubmitted: number
    successRate: number
    bestPerformingCompetition: string
    winStreak: number
    averagePosition: number
  }
  isVerified: boolean
  lastActive: string
  createdAt: string
}

/**
 * Registration Types
 */
export interface RegistrationFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  selectedPlan: SubscriptionTier
  billingInterval: BillingInterval
  acceptTerms: boolean
}

export interface RegistrationErrors {
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  acceptTerms?: string
  submit?: string
}

/**
 * Password Validation Types
 */
export interface PasswordRequirements {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

export interface PasswordStrength {
  score: number
  requirements: PasswordRequirements
}

/**
 * Verification Types
 */
export interface VerificationState {
  email: string
  attempts: number
  expiresAt: string
  lastResent: string
}

/**
 * Auth Store Types
 */
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  verificationEmail: string | null
  registrationData: Partial<RegistrationFormData> | null
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegistrationFormData) => Promise<boolean>
  verifyEmail: (code: string) => Promise<boolean>
  resendVerification: () => Promise<boolean>
  logout: () => void
  clearError: () => void
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, string>
  }
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegistrationResponse {
  verificationEmail: string
  expiresIn: number
}

export interface VerificationResponse {
  user: User
  token: string
}
