import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RulesAcceptance({ competition, onAccept, onBack }) {
  const [acceptedRules, setAcceptedRules] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (acceptedRules && acceptedTerms) {
      onAccept()
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4"
        >
          <svg 
            className="w-8 h-8 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Competition Rules
        </h2>
        <p className="text-gray-400">
          Please review and accept the rules to join
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 space-y-4">
        <h3 className="font-medium text-white">Competition Rules</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>1. All tips must be submitted before the race deadline</p>
          <p>2. Each participant can only submit one set of tips per race</p>
          <p>3. Points are awarded according to the official scoring system</p>
          <p>4. The leaderboard will be updated after each race</p>
          <p>5. All decisions by the competition administrators are final</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedRules}
            onChange={(e) => setAcceptedRules(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-700 rounded bg-gray-800 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-400 group-hover:text-gray-300">
            I have read and agree to follow the competition rules
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-700 rounded bg-gray-800 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-400 group-hover:text-gray-300">
            I accept the terms and conditions and understand that entry fees are non-refundable
          </span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!acceptedRules || !acceptedTerms}
          className={`
            flex-1 py-3 px-4 rounded-lg transition-colors
            ${acceptedRules && acceptedTerms
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Join Competition
        </button>
      </div>
    </div>
  )
}
