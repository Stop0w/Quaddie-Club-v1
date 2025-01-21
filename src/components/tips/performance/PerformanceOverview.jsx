import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'

export default function PerformanceOverview({ dateRange }) {
  const metrics = [
    {
      label: 'Win Rate',
      value: '32%',
      trend: '+2.5%',
      isPositive: true
    },
    {
      label: 'ROI',
      value: '18.5%',
      trend: '+1.2%',
      isPositive: true
    },
    {
      label: 'Total Tips',
      value: '156',
      trend: '-3',
      isPositive: false
    },
    {
      label: 'Average Odds',
      value: '3.45',
      trend: '+0.2',
      isPositive: true
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <p className="text-sm text-gray-400">{metric.label}</p>
            <p className="text-2xl font-bold text-white mt-1">
              {metric.value}
            </p>
            <div className={`
              flex items-center mt-2 text-sm
              ${metric.isPositive ? 'text-green-500' : 'text-red-500'}
            `}>
              <span>{metric.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{metric.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="h-64">
        <Line
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                label: 'Win Rate',
                data: [30, 35, 28, 32, 38, 35, 32],
                borderColor: '#3B82F6',
                tension: 0.4
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#9CA3AF'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#9CA3AF'
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}
