import { motion } from 'framer-motion'

export default function RefreshSpinner({ pullProgress, isRefreshing }) {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center">
      <div className="py-4">
        {isRefreshing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
          />
        ) : (
          <motion.div
            style={{ rotate: Math.min(pullProgress * 360, 360) }}
            className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full"
          />
        )}
      </div>
    </div>
  )
}
