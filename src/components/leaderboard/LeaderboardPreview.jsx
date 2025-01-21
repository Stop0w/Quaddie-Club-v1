import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useLeaderboardStore from '../../store/leaderboardStore'

export default function LeaderboardPreview() {
  const { getLeaderboardData, getUserDetails } = useLeaderboardStore()
  
  const topPlayers = useMemo(() => {
    const data = getLeaderboardData().slice(0, 5)
    return data.map(entry => ({
      ...entry,
      userDetails: getUserDetails(entry.userId)
    }))
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Top Players
        </h2>
        <Link
          to="/leaderboard"
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          View full leaderboard
        </Link>
      </div>

      <div className="space-y-4">
        {topPlayers.map((player) => (
          <div 
            key={player.userId}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className={`
                inline-flex items-center justify-center w-6 h-6 rounded-full text-sm
                ${player.position <= 3 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-700'}
                mr-3
              `}>
                {player.position}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {player.userDetails?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {player.points} points
                </p>
              </div>
            </div>
            {player.winStreak > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {player.winStreak} streak
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
