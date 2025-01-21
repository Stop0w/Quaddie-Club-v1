import { useMemo } from 'react'
import useTipsStore from '../../store/tipsStore'

export default function RaceProgress({ competitionId, totalRaces }) {
  const { currentRace, confirmedSelections, setCurrentRace } = useTipsStore()
  
  const progress = useMemo(() => {
    const confirmed = confirmedSelections[competitionId] || {}
    return Object.keys(confirmed).length
  }, [confirmedSelections, competitionId])

  return (
    <div className="flex items-center justify-between mb-6">
      {Array.from({ length: totalRaces }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentRace(index)}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${index === currentRace 
              ? 'bg-blue-600 text-white'
              : confirmedSelections[competitionId]?.[index] !== undefined
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-400'
            }
          `}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => setCurrentRace('summary')}
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${progress === totalRaces
            ? 'bg-green-500 text-white'
            : 'bg-gray-700 text-gray-400'
          }
        `}
      >
        ✓
      </button>
    </div>
  )
}
