import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SubscriptionSelector from '../components/signup/SubscriptionSelector'
import RegistrationForm from '../components/signup/RegistrationForm'
import EmailVerification from '../components/signup/EmailVerification'
import ProgressSteps from '../components/signup/ProgressSteps'
import PublicNavigation from '../components/navigation/PublicNavigation'

// Define registration steps
const STEPS = {
  SUBSCRIPTION: 'subscription',
  REGISTRATION: 'registration',
  VERIFICATION: 'verification'
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(STEPS.SUBSCRIPTION)
  const [registrationData, setRegistrationData] = useState({
    plan: null,
    billingInterval: 'monthly', // 'monthly' or 'yearly'
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  // Handle subscription selection
  const handleSubscriptionSelect = (plan) => {
    setRegistrationData(prev => ({ ...prev, plan }))
    setCurrentStep(STEPS.REGISTRATION)
  }

  // Handle registration form submission
  const handleRegistrationSubmit = async (formData) => {
    setRegistrationData(prev => ({ ...prev, ...formData }))
    setCurrentStep(STEPS.VERIFICATION)
    // TODO: In real implementation, trigger email verification API
  }

  // Handle verification completion
  const handleVerificationComplete = () => {
    // TODO: In real implementation, verify token with API
    // For now, using dummy data
    localStorage.setItem('registrationData', JSON.stringify(registrationData))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black">
      <PublicNavigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProgressSteps currentStep={currentStep} />

        {currentStep === STEPS.SUBSCRIPTION && (
          <SubscriptionSelector
            selectedPlan={registrationData.plan}
            billingInterval={registrationData.billingInterval}
            onBillingIntervalChange={(interval) => 
              setRegistrationData(prev => ({ ...prev, billingInterval: interval }))
            }
            onSelect={handleSubscriptionSelect}
          />
        )}

        {currentStep === STEPS.REGISTRATION && (
          <RegistrationForm
            onSubmit={handleRegistrationSubmit}
            selectedPlan={registrationData.plan}
          />
        )}

        {currentStep === STEPS.VERIFICATION && (
          <EmailVerification
            email={registrationData.email}
            onComplete={handleVerificationComplete}
            onResend={() => {
              // TODO: In real implementation, trigger email resend API
              console.log('Resending verification email...')
            }}
          />
        )}
      </div>
    </div>
  )
}
