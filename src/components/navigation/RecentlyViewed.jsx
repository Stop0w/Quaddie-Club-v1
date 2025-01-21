import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function RecentlyViewed({ items }) {
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <ClockIcon className="w-4 h-4" />
        <span>Recently Viewed</span>
        <ChevronIcon
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2"
          >
            {items.slice(0, 5).map((item, index) => (
              <Link
                key={item.path + item.timestamp}
                to={item.path}
                className="block px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white">
                    {formatPageTitle(item.path)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(item.timestamp), {
                      addSuffix: true
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function formatPageTitle(path) {
  const segments = path.split('/').filter(Boolean)
  return segments[segments.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function ClockIcon({ className }) {
  return (
    <svg
      className={className}
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
  )
}
