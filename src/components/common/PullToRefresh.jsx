import { motion } from 'framer-motion'
import { usePullToRefresh } from '../../hooks/usePullToRefresh'

export default function PullToRefresh({ onRefresh, children }) {
  const { isPulling, pullDistance } = usePullToRefresh(onRefresh)

  return (
    <div className="relative">
      <motion.div
        className="absolute left-0 right-0 flex justify-center"
        style={{ 
          top: -60,
          y: pullDistance 
        }}
      >
        <div className="flex items-center gap-2 text-gray-400">
          <svg
            className={`w-5 h-5 transition-transform ${
              pullDistance >= 80 ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span className="text-sm">
            {pullDistance >= 80 ? 'Release to refresh' : 'Pull to refresh'}
          </span>
        </div>
      </motion.div>

      {children}
    </div>
  )
}
