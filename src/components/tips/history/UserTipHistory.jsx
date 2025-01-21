import { useState } from 'react'
import { motion } from 'framer-motion'
import TipHistoryFilters from './TipHistoryFilters'
import TipList from './TipList'
import UserPerformanceMetrics from './UserPerformanceMetrics'

export default function UserTipHistory({ userId }) {
  const [dateRange, setDateRange] = useState('6m')
  const [filters, setFilters] = useState({})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Tip History</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Export Tips
        </button>
      </div>

      {/* Performance Metrics */}
      <UserPerformanceMetrics 
        userId={userId}
        dateRange={dateRange}
      />

      {/* Filters */}
      <div className="bg-gray-900 rounded-lg p-6">
        <TipHistoryFilters
          onDateRangeChange={setDateRange}
          onChange={setFilters}
        />
      </div>

      {/* Tips List */}
      <div className="bg-gray-900 rounded-lg p-6">
        <TipList
          userId={userId}
          dateRange={dateRange}
          filters={filters}
        />
      </div>
    </div>
  )
}
