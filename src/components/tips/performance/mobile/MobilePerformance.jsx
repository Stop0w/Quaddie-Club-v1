import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import MobilePerformanceHeader from './MobilePerformanceHeader'
import MobilePerformanceStats from './MobilePerformanceStats'
import MobileTipList from './MobileTipList'

export default function MobilePerformance({ dateRange, onDateRangeChange }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stats', label: 'Stats' },
    { id: 'history', label: 'History' }
  ]

  return (
    <div className="min-h-screen bg-black pb-16">
      <MobilePerformanceHeader
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />

      {/* Tab Navigation */}
      <div className="px-4 py-2 border-b border-gray-800">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 text-sm font-medium whitespace-nowrap
                ${activeTab === tab.id
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4"
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Win Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">32%</p>
                  <p className="text-sm text-green-500">+2.5%</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-400">ROI</p>
                  <p className="text-2xl font-bold text-white mt-1">18.5%</p>
                  <p className="text-sm text-green-500">+1.2%</p>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">
                  Performance Trend
                </h3>
                <div className="h-48">
                  {/* Add mobile-optimized chart here */}
                </div>
              </div>

              {/* Recent Tips */}
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">
                  Recent Tips
                </h3>
                <div className="space-y-4">
                  {/* Add recent tips list here */}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <MobilePerformanceStats dateRange={dateRange} />
          )}

          {activeTab === 'history' && (
            <MobileTipList dateRange={dateRange} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
