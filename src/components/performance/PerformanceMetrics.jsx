import { motion } from 'framer-motion'

export default function PerformanceMetrics({ data, timeframe }) {
  const metrics = [
    {
      label: 'Overall ROI',
      value: `${data.roi}%`,
      trend: data.roiTrend,
      icon: '📈'
    },
    {
      label: 'Win Rate',
      value: `${data.winRate}%`,
      trend: data.winRateTrend,
      icon: '🎯'
    },
    {
      label: 'Current Streak',
      value: data.currentStreak,
      trend: null,
      icon: '🔥'
    },
    {
      label: 'Best Streak',
      value: data.bestStreak,
      trend: null,
      icon: '⭐'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{metric.icon}</span>
            {metric.trend && (
              <TrendIndicator value={metric.trend} />
            )}
          </div>
          <p className="text-sm text-gray-400">{metric.label}</p>
          <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
        </motion.div>
      ))}
    </div>
  )
}

function TrendIndicator({ value }) {
  const isPositive = value > 0
  return (
    <div className={`
      flex items-center gap-1 text-sm
      ${isPositive ? 'text-green-500' : 'text-red-500'}
    `}>
      <svg
        className={`w-4 h-4 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      <span>{Math.abs(value)}%</span>
    </div>
  )
}
