import { useState, useEffect, useRef } from 'react'
import { formatTime } from '../../utils/format'

export default function EmailVerification({ email, onComplete, onResend }) {
  // State for verification code inputs (6 digits)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  
  // Refs for input fields
  const inputRefs = useRef([])

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    setCode(prev => {
      const newCode = [...prev]
      newCode[index] = value
      return newCode
    })

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle key press
  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    if (!/^\d{6}$/.test(pastedData)) return

    const digits = pastedData.split('')
    setCode(digits)
    inputRefs.current[5].focus()
  }

  // Handle verification
  const handleVerify = async () => {
    const verificationCode = code.join('')
    if (verificationCode.length !== 6) {
      setError('Please enter the complete verification code')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // TODO: In real implementation, verify code with API
      // For demo, we'll simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (verificationCode === '123456') { // Demo validation
        onComplete()
      } else {
        setError('Invalid verification code')
      }
    } catch (err) {
      setError('Verification failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle resend
  const handleResend = async () => {
    if (!canResend) return

    setCanResend(false)
    setTimeLeft(300)
    setCode(['', '', '', '', '', ''])
    setError('')
    
    try {
      await onResend()
      // Reset timer
      setTimeLeft(300)
    } catch (err) {
      setError('Failed to resend code. Please try again.')
      setCanResend(true)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4">
          <svg 
            className="w-8 h-8 text-blue-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
        <p className="mt-2 text-gray-400">
          We've sent a verification code to{' '}
          <span className="text-white">{email}</span>
        </p>
      </div>

      {/* Verification Code Input */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3 text-center">
          Enter verification code
        </label>
        <div className="flex gap-2 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`
                w-12 h-12 text-center text-xl font-semibold rounded-md
                bg-gray-900 border text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${error ? 'border-red-500' : 'border-gray-700'}
              `}
            />
          ))}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 text-center">
            {error}
          </p>
        )}
      </div>

      {/* Timer and Resend */}
      <div className="text-center mb-6">
        {timeLeft > 0 ? (
          <p className="text-sm text-gray-400">
            Resend code in {formatTime(timeLeft)}
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            Resend verification code
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        disabled={isSubmitting || code.some(digit => !digit)}
        className={`
          w-full py-2 px-4 rounded-md text-white font-medium
          ${isSubmitting || code.some(digit => !digit)
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }
          transition-colors duration-200
        `}
      >
        {isSubmitting ? 'Verifying...' : 'Verify Email'}
      </button>

      {/* Help Text */}
      <p className="mt-4 text-sm text-gray-400 text-center">
        Didn't receive the code?{' '}
        <button 
          onClick={() => window.location.href = '/support'}
          className="text-blue-500 hover:text-blue-400"
        >
          Contact Support
        </button>
      </p>
    </div>
  )
}
