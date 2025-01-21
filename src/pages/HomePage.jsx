import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PublicNavigation from '../components/navigation/PublicNavigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <PublicNavigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Ultimate Racing Competition Platform
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of racing enthusiasts competing in real-time. Create, join, and manage racing competitions with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/demo-competition"
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <div className="text-blue-500 text-2xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Live Competitions</h3>
            <p className="text-gray-400">
              Compete in real-time with players from around the world. Track your progress and climb the leaderboard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <div className="text-blue-500 text-2xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-400">
              Get detailed insights into your performance with our comprehensive analytics tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <div className="text-blue-500 text-2xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-gray-400">
              Join a thriving community of racing enthusiasts. Share tips and strategies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Competition?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Start your journey today and experience racing like never before.
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  )
}
