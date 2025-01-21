import { motion } from 'framer-motion'

export default function RaceSelector({ selectedRace, onSelectRace }) {
  const races = [1, 2, 3, 4]

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Select Race</h2>
        <span className="text-sm text-gray-400">4 races total</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {races.map((race) => (
          <button
            key={race}
            onClick={() => onSelectRace(race)}
            className={`
              relative p-4 rounded-lg text-center
              ${selectedRace === race
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }
            `}
          >
            <span className="text-lg font-semibold">Race {race}</span>
            {selectedRace === race && (
              <motion.div
                layoutId="raceIndicator"
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
