import { useState } from 'react'
import { useViewport } from '../hooks/useViewport'
import PerformanceOverview from '../components/tips/performance/PerformanceOverview'
import PerformanceStats from '../components/tips/performance/PerformanceStats'
import TipHistory from '../components/tips/performance/TipHistory'
import VenuePerformance from '../components/tips/performance/VenuePerformance'
import MobilePerformance from '../components/tips/performance/mobile/MobilePerformance'

export default function TipPerformancePage() {
  const { isMobile } = useViewport()
  const [dateRange, setDateRange] = useState('month')

  if (isMobile) {
    return <MobilePerformance dateRange={dateRange} onDateRangeChange={setDateRange} />
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Date Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Tip Performance
          </h1>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Export Data
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mb-8">
          <PerformanceOverview dateRange={dateRange} />
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <PerformanceStats dateRange={dateRange} />
          </div>
          <div>
            <VenuePerformance dateRange={dateRange} />
          </div>
        </div>

        {/* Tip History */}
        <div>
          <TipHistory dateRange={dateRange} />
        </div>
      </div>
    </div>
  )
}
