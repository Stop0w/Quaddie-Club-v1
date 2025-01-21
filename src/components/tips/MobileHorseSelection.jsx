import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTipsStore from '../../store/tipsStore'

export default function MobileHorseSelection({ competitionId, raceIndex }) {
  const { selections, setSelection } = useTipsStore()

  const handleSelection = async (horseNumber) => {
    // Haptic feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50)
    }

    await setSelection(competitionId, raceIndex, horseNumber)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-black/95 backdrop-blur-sm z-50 p-4 border-b border-gray-800"
      >
        <h1 className="text-xl font-bold text-white text-center">Race {raceIndex + 1}</h1>
        <div className="text-sm text-gray-400 text-center mt-1">
          Select your horse for this race
        </div>
      </motion.header>

      {/* Horse List */}
      <div className="p-4 space-y-3">
        <AnimatePresence>
          {race.horses.map((horse, index) => (
            <motion.button
              key={horse.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelection(horse.number)}
              className={`
                w-full p-4 rounded-xl flex items-center gap-4
                transition-all duration-200 active:scale-98
                ${selections[competitionId]?.[raceIndex] === horse.number
                  ? 'bg-blue-600 shadow-lg shadow-blue-600/20'
                  : 'bg-gray-800 hover:bg-gray-750'
                }
              `}
            >
              {/* Horse Number */}
              <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center text-xl font-bold">
                {horse.number}
              </div>

              {/* Horse Details */}
              <div className="flex-1 text-left">
                <div className="font-semibold text-white">{horse.name}</div>
                <div className="text-sm text-gray-400 mt-0.5">
                  {horse.jockey} • {horse.weight}
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-blue-400 font-bold">${horse.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-0.5">Fixed</div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Sticky Footer */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-sm border-t border-gray-800"
      >
        <button
          disabled={!selections[competitionId]?.[raceIndex]}
          className={`
            w-full py-4 rounded-xl font-semibold text-white
            transition-all duration-200
            ${selections[competitionId]?.[raceIndex]
              ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
              : 'bg-gray-800 text-gray-400'
            }
          `}
        >
          Confirm Selection
        </button>
      </motion.div>
    </div>
  )
}
