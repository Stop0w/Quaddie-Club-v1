import { useState, useEffect } from 'react'

export default function VerificationStep({ email, onComplete }) {
  const [verificationCode, setVerificationCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, verify the code with the backend
    if (verificationCode === '123456') { // Demo purposes only
      onComplete()
    } else {
      setError('Invalid verification code')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-white">
          Verify your email
        </h3>
        <p className="mt-2 text-sm text-gray-400">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="code" className="sr-only">
            Verification code
          </label>
          <input
            type="text"
            id="code"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="text-center text-sm text-gray-400">
          Time remaining: {formatTime(timeLeft)}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Verify Email
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-blue-400 hover:text-blue-300"
          onClick={() => {
            setTimeLeft(300)
            // In a real app, trigger email resend
          }}
        >
          Resend verification code
        </button>
      </div>
    </div>
  )
}
