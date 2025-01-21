import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequestReset from '../components/auth/password-recovery/RequestReset'
import VerifyCode from '../components/auth/password-recovery/VerifyCode'
import ResetPassword from '../components/auth/password-recovery/ResetPassword'
import useAuthStore from '../store/authStore'

export default function PasswordRecoveryPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState('request') // request, verify, reset
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState(null)

  const handleRequestSubmit = async (email) => {
    setEmail(email)
    setStep('verify')
  }

  const handleVerifySubmit = async (code) => {
    setResetToken(code)
    setStep('reset')
  }

  const handleResetSubmit = async (newPassword) => {
    try {
      // In real app, make API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/login', { 
        state: { message: 'Password successfully reset. Please log in.' } 
      })
    } catch (error) {
      console.error('Failed to reset password:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'request' && (
            <RequestReset onSubmit={handleRequestSubmit} />
          )}
          
          {step === 'verify' && (
            <VerifyCode 
              email={email}
              onSubmit={handleVerifySubmit}
              onResend={() => setStep('request')}
            />
          )}
          
          {step === 'reset' && (
            <ResetPassword 
              onSubmit={handleResetSubmit}
              resetToken={resetToken}
            />
          )}
        </div>
      </div>
    </div>
  )
}
