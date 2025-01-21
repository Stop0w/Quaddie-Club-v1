import { ReactNode } from 'react'
import { 
  SubscriptionTier, 
  BillingInterval, 
  PasswordStrength,
  RegistrationFormData,
  RegistrationErrors 
} from './auth'

/**
 * Common Component Props
 */
export interface BaseProps {
  className?: string
  children?: ReactNode
}

/**
 * Subscription Component Props
 */
export interface SubscriptionSelectorProps extends BaseProps {
  selectedPlan: SubscriptionTier | null
  billingInterval: BillingInterval
  onBillingIntervalChange: (interval: BillingInterval) => void
  onSelect: (plan: SubscriptionTier) => void
}

export interface SubscriptionCardProps extends BaseProps {
  plan: SubscriptionTier
  isSelected: boolean
  billingInterval: BillingInterval
  onSelect: () => void
}

/**
 * Registration Component Props
 */
export interface RegistrationFormProps extends BaseProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>
  selectedPlan: SubscriptionTier
  initialData?: Partial<RegistrationFormData>
}

export interface PasswordStrengthIndicatorProps extends BaseProps {
  strength: PasswordStrength
}

export interface FormErrorProps extends BaseProps {
  message: string
}

/**
 * Verification Component Props
 */
export interface EmailVerificationProps extends BaseProps {
  email: string
  onComplete: () => void
  onResend: () => Promise<void>
}

export interface VerificationInputProps extends BaseProps {
  value: string
  onChange: (value: string) => void
  onComplete: (code: string) => void
  error?: string
}

/**
 * Progress Indicator Props
 */
export interface ProgressStepsProps extends BaseProps {
  steps: Array<{
    id: string
    label: string
    completed: boolean
  }>
  currentStep: string
}

/**
 * Loading State Props
 */
export interface LoadingSpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
}

/**
 * Error Boundary Props
 */
export interface ErrorBoundaryProps extends BaseProps {
  fallback: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}
