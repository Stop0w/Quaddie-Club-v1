export default function LeaderboardTable({ data, currentUserId, subscription }) {
  const showDetailedStats = subscription.plan !== 'MAIDEN'

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-300">
            <th className="pb-4 text-sm font-medium">Rank</th>
            <th className="pb-4 text-sm font-medium">Name</th>
            <th className="pb-4 text-sm font-medium">Total</th>
            {showDetailedStats && (
              <>
                <th className="pb-4 text-sm font-medium">Win Streak</th>
                <th className="pb-4 text-sm font-medium">Success Rate</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-white">
          {data.map((entry) => (
            <tr 
              key={entry.userId} 
              className={`
                border-t border-gray-800
                ${entry.userId === currentUserId ? 'bg-gray-800/50' : ''}
              `}
            >
              <td className="py-3">{entry.position}</td>
              <td className="py-3">
                {entry.userId === currentUserId ? 'Hayden R (You)' : entry.userDetails?.name}
              </td>
              <td className="py-3">{entry.points}</td>
              {showDetailedStats && (
                <>
                  <td className="py-3">{entry.winStreak}</td>
                  <td className="py-3">{entry.successRate}%</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
