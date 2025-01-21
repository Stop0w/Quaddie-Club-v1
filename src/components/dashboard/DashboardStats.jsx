import { motion } from 'framer-motion'

export default function DashboardStats() {
  const stats = [
    { label: 'Competitions', value: '5' },
    { label: 'Pending tips', value: '4' },
    { label: 'Total races', value: '16' },
    { label: 'Next race', value: '2h 30m' }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900 rounded-lg p-6"
        >
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
