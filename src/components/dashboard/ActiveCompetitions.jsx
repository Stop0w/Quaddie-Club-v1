import { Link } from 'react-router-dom'
import { competitions } from '../../data/dummyCompetitions'

export default function ActiveCompetitions() {
  // Filter active competitions
  const activeComps = competitions.filter(comp => comp.status === 'Open')

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Active Competitions</h2>
        <Link 
          to="/competitions" 
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-gray-800">
        {activeComps.map((competition) => (
          <div 
            key={competition.id} 
            className="px-6 py-4 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-medium">
                  {competition.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {competition.venue} • {competition.states.join(', ')}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  Next race in {competition.nextRace}
                </span>
                <Link
                  to={`/tips/${competition.id}`}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Enter Tips
                </Link>
              </div>
            </div>

            {/* Competition Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{competition.currentPosition}/{competition.totalRaces} races</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ 
                    width: `${(competition.currentPosition / competition.totalRaces) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {activeComps.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-400">No active competitions</p>
            <Link 
              to="/competitions" 
              className="mt-2 inline-block text-blue-500 hover:text-blue-400"
            >
              Join a competition
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
