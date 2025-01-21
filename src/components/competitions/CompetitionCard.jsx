import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CompetitionCard({ competition }) {
  const {
    id,
    name,
    venue,
    prizeType,
    type,
    startDate,
    playerCount,
    status,
    isVIP,
    isPrivate
  } = competition

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 rounded-lg overflow-hidden"
    >
      {/* Competition Image/Venue Logo */}
      <div className="relative h-48 bg-gray-800">
        {venue?.logo && (
          <img
            src={venue.logo}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={status} />
        </div>

        {/* VIP/Private Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isVIP && (
            <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
              VIP
            </span>
          )}
          {isPrivate && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
              Private
            </span>
          )}
        </div>
      </div>

      {/* Competition Details */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          {name}
        </h3>

        {venue && (
          <p className="text-sm text-gray-400 mb-4">
            {venue.name}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Prize Type</p>
            <p className="text-sm text-white">{prizeType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Players</p>
            <p className="text-sm text-white">{playerCount}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/competitions/${id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700"
          >
            View Details
          </Link>
          {status === 'upcoming' && (
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              {isPrivate ? 'Request Invite' : 'Join'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    upcoming: 'bg-yellow-500',
    active: 'bg-green-500',
    completed: 'bg-gray-500'
  }

  return (
    <span className={`
      px-2 py-1 text-xs font-bold rounded-full text-white
      ${colors[status]}
    `}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
