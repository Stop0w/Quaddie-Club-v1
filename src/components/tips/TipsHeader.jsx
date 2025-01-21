import { useState } from 'react'
import { motion } from 'framer-motion'
import { useViewport } from '../../hooks/useViewport'

export default function TipsHeader({ competitionId }) {
  const { isMobile } = useViewport()
  const [timeRemaining, setTimeRemaining] = useState('2h 30m')
  
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">
              {competitionId.replace(/-/g, ' ')}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Tips close in {timeRemaining}
            </p>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Submit All Tips
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
