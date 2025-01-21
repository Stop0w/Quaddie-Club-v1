export default function LeaderboardPreview({ competitionId }) {
  const leaderboard = [
    { rank: 1, name: 'Alice Smith', points: 19 },
    { rank: 2, name: 'Robert Johnson', points: 19 },
    { rank: 3, name: 'John McQueen', points: 14 },
    { rank: 4, name: 'Ben Murphy', points: 10 },
    { rank: 5, name: 'Mel Malek', points: 10 }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Current Standings
      </h3>

      <div className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${entry.rank <= 3 ? 'bg-blue-600' : 'bg-gray-700'}
              `}>
                {entry.rank}
              </div>
              <span className="text-white">{entry.name}</span>
            </div>
            <span className="font-semibold text-white">{entry.points}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
