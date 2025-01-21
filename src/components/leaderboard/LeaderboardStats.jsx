import { useMemo } from 'react'
import useAuthStore from '../../store/authStore'

export default function LeaderboardStats({ data }) {
  const { user } = useAuthStore()

  const stats = useMemo(() => {
    const userEntry = data.find(entry => entry.userId === user?.id)
    const totalPlayers = data.length
    const userPosition = userEntry?.position || '-'
    const userRank = userPosition !== '-' ? 
      `${userPosition}${getOrdinalSuffix(userPosition)} of ${totalPlayers}` : 
      'Not ranked'

    return {
      position: userRank,
      points: userEntry?.points || 0,
      winStreak: userEntry?.winStreak || 0,
      competitions: userEntry?.competitions?.length || 0
    }
  }, [data, user])

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            Current Position
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats.position}
          </dd>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            Total Points
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats.points}
          </dd>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            Win Streak
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats.winStreak}
          </dd>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            Active Competitions
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats.competitions}
          </dd>
        </div>
      </div>
    </div>
  )
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}
