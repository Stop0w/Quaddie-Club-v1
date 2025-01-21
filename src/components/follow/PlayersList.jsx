import { useMemo } from 'react'
import { calculateStrikeRate, determinePersona } from '../../utils/playerStats'

export default function PlayersList({ 
  dateRange, 
  activeFilter, 
  searchQuery, 
  onFollowPlayer,
  isAuthenticated 
}) {
  const players = useMemo(() => {
    // Filter and sort players based on active filter
    let filteredPlayers = [...dummyPlayers]

    if (activeFilter === 'strike-rate') {
      filteredPlayers.sort((a, b) => calculateStrikeRate(b) - calculateStrikeRate(a))
    } else if (activeFilter === 'highest-total') {
      filteredPlayers.sort((a, b) => b.totalPoints - a.totalPoints)
    } else if (activeFilter === 'persona') {
      filteredPlayers = filteredPlayers.filter(player => {
        const persona = determinePersona(player)
        return persona === 'Favourite Backer' || persona === 'Value Backer'
      })
    }

    return filteredPlayers
  }, [dateRange, activeFilter, searchQuery])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-gray-300">
            <th className="pb-4">Rank</th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Total</th>
            {isAuthenticated && (
              <>
                <th className="pb-4">Strike Rate</th>
                <th className="pb-4">Persona</th>
                <th className="pb-4">Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-white">
          {players.map((player, index) => (
            <tr key={player.id} className="border-t border-gray-800">
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{player.name}</td>
              <td className="py-3">{player.totalPoints}</td>
              {isAuthenticated && (
                <>
                  <td className="py-3">{calculateStrikeRate(player)}%</td>
                  <td className="py-3">{determinePersona(player)}</td>
                  <td className="py-3">
                    <button
                      onClick={() => onFollowPlayer(player.id)}
                      className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded text-sm"
                    >
                      Follow
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        <button className="bg-[#0066FF] hover:bg-blue-600 px-4 py-2 rounded text-white">
          View More
        </button>
      </div>
    </div>
  )
}
