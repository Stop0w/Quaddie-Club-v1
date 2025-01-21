import { useState } from 'react'
import { Link } from 'react-router-dom'
import useLeaderboardStore from '../../store/leaderboardStore'
import { leaderboardPeriods } from '../../data/dummyLeaderboardData'

export default function PublicLeaderboard() {
  const { getLeaderboardData, getUserDetails } = useLeaderboardStore()
  const [selectedPeriod, setSelectedPeriod] = useState(leaderboardPeriods.TODAY)

  const topPlayers = getLeaderboardData()
    .slice(0, 10)
    .map(entry => ({
      ...entry,
      userDetails: getUserDetails(entry.userId)
    }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quaddie Challenge Leaderboard
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Top performers across all competitions
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/register"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Join Quaddie Challenge
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4">
            {Object.entries(leaderboardPeriods).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedPeriod(label)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${selectedPeriod === label
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {topPlayers.map((player, index) => (
                <li key={player.userId} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className={`
                        inline-flex items-center justify-center h-8 w-8 rounded-full
                        ${index < 3 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                      `}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {player.userDetails?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {player.points} points • {player.competitions?.length || 0} competitions
                      </p>
                    </div>
                    {player.winStreak > 0 && (
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {player.winStreak} streak
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="text-sm">
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Register now
            </Link>
            <span className="text-gray-500 dark:text-gray-400">
              {' '}to compete and track your performance
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Join the Competition
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Create an account to participate in competitions and track your performance.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Get started →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Premium Features
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Upgrade to access advanced statistics, custom competitions, and more.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View plans →
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Latest Competitions
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            See upcoming races and competitions across all venues.
          </p>
          <div className="mt-4">
            <Link
              to="/register"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Browse competitions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
