import { motion } from 'framer-motion'

export default function JoinConfirmation({ competition, onNext }) {
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Join {competition.name}
        </h2>
        <p className="text-gray-400">
          Review the competition details before proceeding
        </p>
      </div>

      <div className="space-y-4">
        {/* Competition Details */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Competition Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Type</span>
              <span className="text-white">{competition.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Start Date</span>
              <span className="text-white">
                {new Date(competition.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">End Date</span>
              <span className="text-white">
                {new Date(competition.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Participants</span>
              <span className="text-white">
                {competition.participants.length} / {competition.maxParticipants || '∞'}
              </span>
            </div>
          </div>
        </div>

        {/* Entry Fee */}
        {competition.entryFee > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Entry Fee
            </h3>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-bold text-white">
                ${competition.entryFee}
              </span>
              <span className="text-sm text-gray-400">
                One-time payment
              </span>
            </div>
          </div>
        )}

        {/* Prize Pool */}
        {competition.prizePool && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Prize Pool
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-white">
                  ${competition.prizePool.amount}
                </span>
                <span className="text-sm text-gray-400">
                  Total Prize Pool
                </span>
              </div>
              <div className="space-y-1">
                {competition.prizePool.distribution.map((prize, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {index + 1}{getOrdinalSuffix(index + 1)} Place
                    </span>
                    <span className="text-white">
                      ${prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </div>
  )
}

function getOrdinalSuffix(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}
