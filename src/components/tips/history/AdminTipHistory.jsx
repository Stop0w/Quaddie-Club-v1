import { useState } from 'react'
import { motion } from 'framer-motion'
import VenuePerformanceMetrics from './VenuePerformanceMetrics'
import TipHistoryFilters from './TipHistoryFilters'
import VenueComparisonChart from './VenueComparisonChart'
import ExportData from './ExportData'

export default function AdminTipHistory() {
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [dateRange, setDateRange] = useState('6m')
  
  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tip History Analytics</h1>
        <ExportData type="admin" />
      </div>

      {/* Venue Performance Overview */}
      <VenuePerformanceMetrics 
        selectedVenue={selectedVenue}
        dateRange={dateRange}
      />

      {/* Filters & Controls */}
      <div className="bg-gray-900 rounded-lg p-6">
        <TipHistoryFilters
          isAdmin={true}
          onVenueSelect={setSelectedVenue}
          onDateRangeChange={setDateRange}
        />
      </div>

      {/* Venue Comparison */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Venue Performance Comparison
        </h2>
        <VenueComparisonChart dateRange={dateRange} />
      </div>

      {/* Venue-Specific Insights */}
      {selectedVenue && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {selectedVenue.name} Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VenueMetricCard
              title="User Engagement"
              value={selectedVenue.engagement}
              trend={selectedVenue.engagementTrend}
            />
            <VenueMetricCard
              title="Revenue Generated"
              value={`$${selectedVenue.revenue.toLocaleString()}`}
              trend={selectedVenue.revenueTrend}
            />
            <VenueMetricCard
              title="Prize Distribution"
              value={selectedVenue.prizeDistribution}
              trend={selectedVenue.prizeTrend}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function VenueMetricCard({ title, value, trend }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <div className={`
        flex items-center gap-1 mt-2 text-sm
        ${trend > 0 ? 'text-green-500' : 'text-red-500'}
      `}>
        <span>{Math.abs(trend)}%</span>
        <span>{trend > 0 ? '↑' : '↓'}</span>
      </div>
    </div>
  )
}
