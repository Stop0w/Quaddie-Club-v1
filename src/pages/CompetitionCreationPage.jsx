import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CompetitionCreationForm from '../components/competitions/creation/CompetitionCreationForm'
import useAuthStore from '../store/authStore'

export default function CompetitionCreationPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

  // Check if user is authenticated and has permission to create competitions
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Check if user has required subscription level
    if (user?.subscription?.plan === 'MAIDEN') {
      navigate('/subscription/upgrade')
      return
    }
  }, [isAuthenticated, user, navigate])

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Create Competition</h1>
          <p className="text-gray-400 mt-2">
            Set up a new competition and customize its settings
          </p>
        </div>

        <CompetitionCreationForm />
      </div>
    </div>
  )
}
