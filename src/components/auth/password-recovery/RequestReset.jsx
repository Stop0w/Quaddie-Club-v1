import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validateEmail } from '../../../utils/validation'
import { useHapticFeedback } from '../../../hooks/useHapticFeedback'

export default function RequestReset({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const haptics = useHapticFeedback()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    haptics.light()

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      haptics.error()
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      haptics.success()
      onSubmit(email)
    } catch (error) {
      setError('Failed to send reset email. Please try again.')
      haptics.error()
    } finally {
      setIsLoading(false)
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-400">
          Enter your email address and we'll send you a code to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            className={`
              appearance-none block w-full px-4 py-3 rounded-lg
              bg-gray-800 text-white placeholder-gray-500
              border ${error ? 'border-red-500' : 'border-gray-700'}
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-colors duration-200
            `}
            placeholder="Enter your email"
            required
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'email-error' : undefined}
          />
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-1 text-sm text-red-500"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

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
            'Send Reset Code'
          )}
        </motion.button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </motion.div>
  )
}
