import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RulesAndPrizes({ competition, expanded = false }) {
  const [activeSection, setActiveSection] = useState(expanded ? 'all' : null)

  const sections = [
    {
      id: 'rules',
      title: 'Competition Rules',
      content: competition.rules
    },
    {
      id: 'prizes',
      title: 'Prize Distribution',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-white">Total Prize Pool</span>
            <span className="text-2xl font-bold text-white">
              ${competition.prizePool.toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            {competition.prizeDistribution.map((prize, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 rounded-lg p-4"
              >
                <span className="text-white">
                  {index + 1}{getOrdinalSuffix(index + 1)} Place
                </span>
                <span className="text-lg font-medium text-white">
                  ${prize.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'eligibility',
      title: 'Eligibility Requirements',
      content: competition.eligibility
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => setActiveSection(
                activeSection === section.id ? null : section.id
              )}
              className="w-full flex justify-between items-center py-2"
            >
              <h3 className="text-lg font-medium text-white">
                {section.title}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform
                  ${activeSection === section.id ? 'rotate-180' : ''}
                `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {(activeSection === section.id || activeSection === 'all') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="py-4 text-gray-400">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
