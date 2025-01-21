import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { subscriptionPlans } from '../data/dummySubscriptionPlans'
import SubscriptionTierSelector from '../components/auth/SubscriptionTierSelector'
import RegistrationForm from '../components/auth/RegistrationForm'
import VerificationStep from '../components/auth/VerificationStep'

const STEPS = {
  SUBSCRIPTION: 'subscription',
  REGISTRATION: 'registration',
  VERIFICATION: 'verification'
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(STEPS.SUBSCRIPTION)
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    selectedPlan: 'MAIDEN'
  })

  const handleSubscriptionSelect = (plan) => {
    setRegistrationData(prev => ({ ...prev, selectedPlan: plan }))
    setCurrentStep(STEPS.REGISTRATION)
  }

  const handleRegistrationSubmit = async (formData) => {
    setRegistrationData(prev => ({ ...prev, ...formData }))
    setCurrentStep(STEPS.VERIFICATION)
    // In a real app, this would trigger email verification
  }

  const handleVerificationComplete = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Join Quaddie Challenge
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between">
              {Object.values(STEPS).map((step, index) => (
                <div 
                  key={step}
                  className={`flex items-center ${
                    Object.values(STEPS).indexOf(currentStep) >= index
                      ? 'text-blue-400'
                      : 'text-gray-500'
                  }`}
                >
                  <div className={`
                    rounded-full h-8 w-8 flex items-center justify-center border-2
                    ${Object.values(STEPS).indexOf(currentStep) >= index
                      ? 'border-blue-400 bg-blue-400/10'
                      : 'border-gray-500'
                    }
                  `}>
                    {index + 1}
                  </div>
                  {index < Object.values(STEPS).length - 1 && (
                    <div className={`
                      h-0.5 w-full mx-2
                      ${Object.values(STEPS).indexOf(currentStep) > index
                        ? 'bg-blue-400'
                        : 'bg-gray-500'
                      }
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-400">Choose Plan</span>
              <span className="text-xs text-gray-400">Register</span>
              <span className="text-xs text-gray-400">Verify</span>
            </div>
          </div>

          {currentStep === STEPS.SUBSCRIPTION && (
            <SubscriptionTierSelector 
              onSelect={handleSubscriptionSelect}
              plans={subscriptionPlans}
            />
          )}

          {currentStep === STEPS.REGISTRATION && (
            <RegistrationForm
              onSubmit={handleRegistrationSubmit}
              selectedPlan={registrationData.selectedPlan}
            />
          )}

          {currentStep === STEPS.VERIFICATION && (
            <VerificationStep
              email={registrationData.email}
              onComplete={handleVerificationComplete}
            />
          )}
        </div>
      </div>
    </div>
  )
}
