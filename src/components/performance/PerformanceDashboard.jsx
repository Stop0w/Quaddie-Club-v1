import { useState } from 'react'
import { motion } from 'framer-motion'
import PerformanceMetrics from './PerformanceMetrics'
import PerformanceCharts from './PerformanceCharts'
import VenuePerformance from './VenuePerformance'
import AchievementsList from './AchievementsList'
import ComparisonWidget from './ComparisonWidget'
import { usePerformanceData } from '../../hooks/usePerformanceData'

export default function PerformanceDashboard() {
  const [timeframe, setTimeframe] = useState('month')
  const { data, isLoading, exportData } = usePerformanceData(timeframe)

  const timeframes = [
    { id: 'day', label: 'Daily' },
    { id: 'week', label: 'Weekly' },
    { id: 'month', label: 'Monthly' },
    { id: 'year', label: 'Yearly' }
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Performance Summary</h2>
        <div className="flex gap-4">
          {/* Timeframe Selector */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            {timeframes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTimeframe(id)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${timeframe === id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white"
          >
            <span>Export</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <div className="lg:col-span-2">
          <PerformanceMetrics data={data} timeframe={timeframe} />
        </div>

        {/* Comparison Widget */}
        <div>
          <ComparisonWidget data={data} />
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-gray-900 rounded-lg p-6">
        <PerformanceCharts data={data} timeframe={timeframe} />
      </div>

      {/* Venue Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VenuePerformance data={data} />
        <AchievementsList />
      </div>
    </div>
  )
}
