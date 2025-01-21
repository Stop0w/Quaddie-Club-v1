import { motion } from 'framer-motion'

export default function CompetitionHeader({ competition }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            {competition.name}
          </motion.h1>
          <p className="text-gray-400 mt-1">
            Hosted by {competition.venue.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={competition.status} />
          {competition.isPrivate && (
            <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm">
              Private
            </span>
          )}
          {competition.isVIP && (
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm">
              VIP
            </span>
          )}
        </div>
      </div>

      {competition.description && (
        <p className="text-gray-400 mt-4">
          {competition.description}
        </p>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    upcoming: 'bg-yellow-500/10 text-yellow-500',
    active: 'bg-green-500/10 text-green-500',
    completed: 'bg-gray-500/10 text-gray-400'
  }

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
