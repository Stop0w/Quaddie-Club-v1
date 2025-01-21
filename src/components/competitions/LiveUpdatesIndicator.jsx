import { motion } from 'framer-motion'

export default function LiveUpdatesIndicator({ isConnected }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{
          scale: isConnected ? [1, 1.2, 1] : 1,
          opacity: isConnected ? 1 : 0.5
        }}
        transition={{
          duration: 1,
          repeat: isConnected ? Infinity : 0,
          repeatDelay: 1
        }}
        className={`
          w-2 h-2 rounded-full
          ${isConnected ? 'bg-green-500' : 'bg-gray-500'}
        `}
      />
      <span className="text-sm text-gray-400">
        {isConnected ? 'Live Updates' : 'Connecting...'}
      </span>
    </div>
  )
}
