import { useState, useEffect } from 'react'
import { validatePassword, validateEmail } from '../../utils/validation'
import PasswordStrengthIndicator from './PasswordStrengthIndicator'
import FormError from '../common/FormError'

export default function RegistrationForm({ onSubmit, selectedPlan }) {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  })

  // Error state
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    }
  })

  // Update password strength when password changes
  useEffect(() => {
    const strength = validatePassword(formData.password)
    setPasswordStrength(strength)
  }, [formData.password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate all fields
      const newErrors = {}

      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format'
      }

      // Password validation
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (passwordStrength.score < 3) {
        newErrors.password = 'Password is not strong enough'
      }

      // Confirm password
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }

      // Name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }

      // Terms acceptance
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      // Submit form
      await onSubmit(formData)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
        <p className="mt-2 text-gray-400">
          {selectedPlan === 'MAIDEN' 
            ? 'Get started with your free account'
            : `Set up your ${selectedPlan.toLowerCase()} subscription`
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`
                mt-1 block w-full rounded-md bg-gray-900 border
                ${errors.firstName ? 'border-red-500' : 'border-gray-700'}
                text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            {errors.firstName && <FormError message={errors.firstName} />}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className={`
                mt-1 block w-full rounded-md bg-gray-900 border
                ${errors.lastName ? 'border-red-500' : 'border-gray-700'}
                text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
              `}
            />
            {errors.lastName && <FormError message={errors.lastName} />}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`
              mt-1 block w-full rounded-md bg-gray-900 border
              ${errors.email ? 'border-red-500' : 'border-gray-700'}
              text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          {errors.email && <FormError message={errors.email} />}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className={`
              mt-1 block w-full rounded-md bg-gray-900 border
              ${errors.password ? 'border-red-500' : 'border-gray-700'}
              text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          {formData.password && (
            <PasswordStrengthIndicator strength={passwordStrength} />
          )}
          {errors.password && <FormError message={errors.password} />}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className={`
              mt-1 block w-full rounded-md bg-gray-900 border
              ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'}
              text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          {errors.confirmPassword && <FormError message={errors.confirmPassword} />}
        </div>

        {/* Terms Acceptance */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="acceptTerms" className="text-sm text-gray-300">
              I accept the{' '}
              <a href="/terms" className="text-blue-500 hover:text-blue-400">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-500 hover:text-blue-400">
                Privacy Policy
              </a>
            </label>
            {errors.acceptTerms && <FormError message={errors.acceptTerms} />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full flex justify-center py-2 px-4 border border-transparent rounded-md
            shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* General Error */}
        {errors.submit && (
          <div className="text-center">
            <FormError message={errors.submit} />
          </div>
        )}
      </form>
    </div>
  )
}
