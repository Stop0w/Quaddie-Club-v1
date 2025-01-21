import { useMemo } from 'react'
import useTipsStore from '../../store/tipsStore'

export default function TipsConfirmation({ competitionId }) {
  const { 
    confirmedSelections, 
    setCurrentRace,
    useSameSelections,
    submitAllPicks
  } = useTipsStore()

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-white text-center">
          Randwick Everest Day
        </h1>
        <h2 className="text-lg text-blue-500 text-center">
          Flemington R4 Melbourne Sprint
        </h2>
      </div>

      {/* Use Same Picks Toggle */}
      <div className="flex justify-center px-4 py-3">
        <label className="flex items-center gap-3">
          <div className={`
            relative w-12 h-6 rounded-full transition-colors
            ${useSameSelections ? 'bg-blue-600' : 'bg-gray-700'}
          `}>
            <span className={`
              absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform
              ${useSameSelections ? 'translate-x-6' : 'translate-x-0'}
            `} />
          </div>
          <span className="text-white">Use same picks</span>
        </label>
      </div>

      {/* Race Navigation */}
      <div className="flex justify-center gap-2 px-4 py-3 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentRace(i)}
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0"
          >
            {i + 1}
          </button>
        ))}
        <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
          ✓
        </button>
      </div>

      {/* Final Selections */}
      <div className="px-4 py-3">
        <div className="bg-gray-900 rounded-lg">
          <h3 className="text-xl text-white font-bold text-center py-4">
            Final Selections
          </h3>
          
          <div className="space-y-2 px-4 pb-4">
            {Object.entries(confirmedSelections[competitionId] || {}).map(([raceIndex, selection]) => (
              <div 
                key={raceIndex}
                className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    R{parseInt(raceIndex) + 1}
                  </div>
                  <span className="text-white">
                    {selection.number}. {selection.name}
                  </span>
                </div>
                <button 
                  onClick={() => setCurrentRace(parseInt(raceIndex))}
                  className="px-4 py-1 bg-blue-600 text-white rounded-md"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-black">
        <button
          onClick={submitAllPicks}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
        >
          Submit All Picks
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-black border-t border-gray-800">
        <div className="grid grid-cols-5 h-full">
          {[
            { icon: '🏠', label: 'Dashboard' },
            { icon: '🏆', label: 'Competitions' },
            { icon: '📝', label: 'Tips' },
            { icon: '⚙️', label: 'Management Hub' },
            { icon: '👤', label: 'Profile' }
          ].map((item, i) => (
            <button 
              key={i}
              className="flex flex-col items-center justify-center text-gray-400"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
