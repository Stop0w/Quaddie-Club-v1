import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import PublicNavigation from '../components/navigation/PublicNavigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen bg-black">
      <PublicNavigation />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back to Quaddie Club
            </h1>
            <p className="text-gray-400">
              Streamline your quaddie racing competitions with ease. Log in to access 
              your dashboard and stay on top of your game.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-8">
            <div className="text-center mb-8">
              <img src="/logo.svg" alt="Quaddie" className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">Log In</h2>
            </div>

            <button className="w-full bg-[#0066FF] text-white rounded-md py-2 mb-6 flex items-center justify-center">
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
              Log in with Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">
                  or use your email account
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-gray-900 border border-gray-800 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="text-right">
                <Link to="/forgot-password" className="text-[#0066FF] hover:text-blue-400 text-sm">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0066FF] text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-[#0066FF] hover:text-blue-400">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
