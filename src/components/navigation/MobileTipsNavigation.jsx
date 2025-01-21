import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileTipsNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const competitions = [
    'Randwick Everest Day',
    'Harness on a Heater',
    'Little Bear',
    'Find Mates',
    'Back Pics, Drive What You Like!'
  ]

  return (
    <div className="lg:hidden">
      {/* Current Competition Display */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-white">
            {competitions.find(comp => 
              location.pathname.includes(comp.toLowerCase().replace(/\s+/g, '-'))
            ) || 'Tips'}
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Competition Selector Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl z-50 pb-safe"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-white">Select Competition</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2">
                  {competitions.map((comp) => (
                    <Link
                      key={comp}
                      to={`/tips/${comp.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setIsOpen(false)}
                      className={`
                        block px-4 py-3 rounded-lg
                        ${location.pathname.includes(comp.toLowerCase().replace(/\s+/g, '-'))
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-gray-800'
                        }
                      `}
                    >
                      {comp}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
