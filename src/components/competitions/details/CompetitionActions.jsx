import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../../store/authStore'

export default function CompetitionActions({ competition, onJoin, onLeave }) {
  const [isJoining, setIsJoining] = useState(false)
  const [showConfirmLeave, setShowConfirmLeave] = useState(false)
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleJoin = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setIsJoining(true)
    try {
      await onJoin(competition.id)
    } finally {
      setIsJoining(false)
    }
  }

  const handleLeave = async () => {
    await onLeave(competition.id)
    setShowConfirmLeave(false)
  }

  const isParticipant = competition.participants.includes(user?.id)

  return (
    <div className="flex gap-4 mb-8">
      {!isParticipant ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleJoin}
          disabled={isJoining}
          className={`
            px-6 py-2 rounded-lg font-medium
            ${isJoining
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {isJoining ? 'Joining...' : 'Join Competition'}
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowConfirmLeave(true)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
        >
          Leave Competition
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {/* Share functionality */}}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700"
      >
        Share
      </motion.button>

      {showConfirmLeave && (
        <ConfirmLeaveModal
          onConfirm={handleLeave}
          onClose={() => setShowConfirmLeave(false)}
        />
      )}
    </div>
  )
}

function ConfirmLeaveModal({ onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">
          Leave Competition?
        </h3>
        <p className="text-gray-400 mb-6">
          Are you sure you want to leave this competition? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Leave Competition
          </button>
        </div>
      </div>
    </div>
  )
}
