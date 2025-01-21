import { useEffect } from 'react'
import useAuthStore from '../store/authStore'
import ActiveCompetitions from '../components/dashboard/ActiveCompetitions'
import NotificationsCenter from '../components/dashboard/NotificationsCenter'
import QuickActions from '../components/dashboard/QuickActions'
import PerformanceSummary from '../components/dashboard/PerformanceSummary'
import UpcomingRaces from '../components/dashboard/UpcomingRaces'
import RecentActivity from '../components/dashboard/RecentActivity'

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-black">
      {/* Welcome Section */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.firstName}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Here's what's happening with your competitions today
          </p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Competitions */}
            <ActiveCompetitions />
            
            {/* Performance Summary */}
            <PerformanceSummary />
            
            {/* Upcoming Races */}
            <UpcomingRaces />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Notifications Center */}
            <NotificationsCenter />
          </div>
        </div>
      </div>
    </div>
  )
}
