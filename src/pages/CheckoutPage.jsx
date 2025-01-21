import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useSubscriptionStore from '../store/subscriptionStore'
import CheckoutForm from '../components/subscription/CheckoutForm'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { selectedPlan } = useSubscriptionStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (!selectedPlan) {
      navigate('/subscription')
    }
  }, [isAuthenticated, selectedPlan, navigate])

  return (
    <div className="min-h-screen bg-black">
      <CheckoutForm />
    </div>
  )
}
