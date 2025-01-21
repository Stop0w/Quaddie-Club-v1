import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'

export default function PerformanceStats({ dateRange }) {
  const [activeTab, setActiveTab] = useState('odds')

  const tabs = [
    { id: 'odds', label: 'Odds Distribution' },
    { id: 'types', label: 'Race Types' },
    { id: 'time', label: 'Time of Day' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="h-80">
        {activeTab === 'odds' && (
          <Bar
            data={{
              labels: ['1-2', '2-3', '3-4', '4-5', '5+'],
              datasets: [
                {
                  label: 'Win Rate',
                  data: [45, 35, 28, 22, 15],
                  backgroundColor: '#3B82F6'
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
        )}

        {/* Add similar charts for other tabs */}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Best Performing</p>
          <p className="text-lg font-medium text-white mt-1">2.5 - 3.5 Odds</p>
          <p className="text-sm text-green-500 mt-1">42% Win Rate</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Most Profitable</p>
          <p className="text-lg font-medium text-white mt-1">4.0 - 5.0 Odds</p>
          <p className="text-sm text-green-500 mt-1">+125% ROI</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Most Tips</p>
          <p className="text-lg font-medium text-white mt-1">2.0 - 3.0 Odds</p>
          <p className="text-sm text-gray-400 mt-1">45 Tips</p>
        </div>
      </div>
    </div>
  )
}
