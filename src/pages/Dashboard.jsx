import { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardStats from '../components/dashboard/DashboardStats'
import CompetitionResults from '../components/dashboard/CompetitionResults'
import UpcomingRaces from '../components/dashboard/UpcomingRaces'
import FormGuide from '../components/dashboard/FormGuide'
import Notifications from '../components/dashboard/Notifications'
import { useViewport } from '../hooks/useViewport'

export default function Dashboard() {
  const { isMobile } = useViewport()
  const [username] = useState('Username') // Replace with actual user data

  return (
    <div className="min-h-screen bg-black">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Welcome to the Racetrack
            </h1>
            <p className="text-gray-400">
              Good Morning, {username}! You have 3 pending tips for today's races.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <DashboardStats />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Create Competition
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Join Competition
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Enter Results
            </button>
          </div>

          {/* Results Grid */}
          <CompetitionResults />

          {/* Upcoming Races */}
          <UpcomingRaces />

          {/* Form Guide */}
          <FormGuide />

          {/* Notifications */}
          <Notifications />
        </div>
      </div>
    </div>
  )
}
