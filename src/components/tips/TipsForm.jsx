import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TipsForm({ competitionId, raceNumber }) {
  const [selectedHorse, setSelectedHorse] = useState(null)
  
  const horses = [
    { number: 1, name: 'Thunder Bolt', odds: 4.50, jockey: 'J. Smith' },
    { number: 2, name: 'Desert Storm', odds: 3.20, jockey: 'M. Johnson' },
    { number: 3, name: 'Night Fury', odds: 6.00, jockey: 'R. Wilson' },
    { number: 4, name: 'Silver Arrow', odds: 8.50, jockey: 'T. Brown' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Race {raceNumber} Selections
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Select your tip for this race
        </p>
      </div>

      <div className="space-y-3">
        {horses.map((horse) => (
          <motion.button
            key={horse.number}
            onClick={() => setSelectedHorse(horse.number)}
            className={`
              w-full flex items-center justify-between p-4 rounded-lg
              ${selectedHorse === horse.number
                ? 'bg-blue-600'
                : 'bg-gray-800 hover:bg-gray-700'
              }
            `}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${selectedHorse === horse.number
                  ? 'bg-blue-700'
                  : 'bg-gray-700'
                }
              `}>
                {horse.number}
              </div>
              <div className="text-left">
                <p className="font-medium text-white">{horse.name}</p>
                <p className="text-sm text-gray-400">Jockey: {horse.jockey}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">${horse.odds}</p>
              <p className="text-sm text-gray-400">Fixed</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Mobile Submit Button */}
      <AnimatePresence>
        {selectedHorse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="lg:hidden fixed bottom-16 left-4 right-4 p-4 bg-gray-900 border-t border-gray-800"
          >
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
              Confirm Selection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
