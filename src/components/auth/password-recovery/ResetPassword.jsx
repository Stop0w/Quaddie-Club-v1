import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validatePassword } from '../../../utils/validation'
import { useHapticFeedback } from '../../../hooks/useHapticFeedback'

export default function ResetPassword({ onSubmit, resetToken }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const haptics = useHapticFeedback()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    haptics.light()

    const validation = validatePassword(password)
    if (validation.score < 3) {
      setError('Please choose a stronger password')
      haptics.error()
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      haptics.error()
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(password)
      haptics.success()
    } catch (error) {
      setError('Failed to reset password. Please try again.')
      haptics.error()
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0: return 'bg-gray-700'
      case 1: return 'bg-red-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-green-500'
      case 4: return 'bg-blue-500'
      default: return 'bg-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4"
        >
          <svg 
            className="w-8 h-8 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Create New Password
        </h2>
        <p className="text-sm text-gray-400">
          Your new password must be different from previous passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              className={`
                appearance-none block w-full px-4 py-3 pr-10 rounded-lg
                bg-gray-800 text-white placeholder-gray-500
                border ${error ? 'border-red-500' : 'border-gray-700'}
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              `}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[0, 1, 2, 3].map((index) => {
                  const validation = validatePassword(password)
                  return (
                    <motion.div
                      key={index}
                      className={`h-1 w-1/4 rounded-full ${getPasswordStrengthColor(validation.score)}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  )
                })}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-400"
              >
                Password strength: {getPasswordStrengthText(validatePassword(password).score)}
              </motion.div>
            </div>
          )}
        </div>

        <div>
          <label 
            htmlFor="confirmPassword" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (error) setError('')
            }}
            className={`
              appearance-none block w-full px-4 py-3 rounded-lg
              bg-gray-800 text-white placeholder-gray-500
              border ${error ? 'border-red-500' : 'border-gray-700'}
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-colors duration-200
            `}
            required
          />
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-500 text-center"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full flex items-center justify-center px-4 py-3 rounded-lg
            text-white font-medium transition-colors duration-200
            ${isLoading
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            'Reset Password'
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

function getPasswordStrengthText(score) {
  switch (score) {
    case 0: return 'Very Weak'
    case 1: return 'Weak'
    case 2: return 'Fair'
    case 3: return 'Strong'
    case 4: return 'Very Strong'
    default: return 'Very Weak'
  }
}
