import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHapticFeedback } from '../../../hooks/useHapticFeedback'

export default function VerifyCode({ email, onSubmit, onResend }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const inputRefs = useRef([])
  const haptics = useHapticFeedback()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    haptics.light()
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (error) setError('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (!/^\d{6}$/.test(pastedData)) return

    const digits = pastedData.split('')
    setCode(digits)
    inputRefs.current[5].focus()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const verificationCode = code.join('')
    if (verificationCode.length !== 6) {
      setError('Please enter the complete verification code')
      haptics.error()
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      haptics.success()
      onSubmit(verificationCode)
    } catch (error) {
      setError('Invalid verification code')
      haptics.error()
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Enter Verification Code
        </h2>
        <p className="text-sm text-gray-400">
          We've sent a code to <span className="text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <motion.input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-14 text-center text-xl font-semibold rounded-lg
                  bg-gray-800 text-white
                  border ${error ? 'border-red-500' : 'border-gray-700'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-colors duration-200
                `}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-500 text-center"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <motion.div
            animate={{
              color: timeLeft < 60 ? '#EF4444' : '#9CA3AF'
            }}
            className="text-sm"
          >
            Time remaining: {formatTime(timeLeft)}
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading || timeLeft === 0}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full flex items-center justify-center px-4 py-3 rounded-lg
            text-white font-medium transition-colors duration-200
            ${isLoading || timeLeft === 0
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
            'Verify Code'
          )}
        </motion.button>

        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => {
              haptics.light()
              onResend()
            }}
            disabled={timeLeft > 0}
            className={`
              text-sm transition-colors duration-200
              ${timeLeft > 0
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-400'
              }
            `}
          >
            Resend Code
          </button>
          <button
            type="button"
            onClick={() => {
              haptics.light()
              onResend()
            }}
            className="block w-full text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Try different email
          </button>
        </div>
      </form>
    </motion.div>
  )
}
