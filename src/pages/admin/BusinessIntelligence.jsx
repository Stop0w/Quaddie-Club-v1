import { useState } from 'react'
import UserAcquisitionMetrics from '../components/admin/analytics/UserAcquisitionMetrics'
import RevenueAnalytics from '../components/admin/analytics/RevenueAnalytics'
import ConversionFunnel from '../components/admin/analytics/ConversionFunnel'
import RetentionAnalysis from '../components/admin/analytics/RetentionAnalysis'
import CustomerLifetimeValue from '../components/admin/analytics/CustomerLifetimeValue'

export default function BusinessIntelligence() {
  const [dateRange, setDateRange] = useState('30d')
  const [selectedSegment, setSelectedSegment] = useState('all')

  const dateRanges = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: '1y', label: 'Last Year' }
  ]

  const segments = [
    { id: 'all', label: 'All Users' },
    { id: 'free', label: 'Free Users' },
    { id: 'paid', label: 'Paid Users' },
    { id: 'vip', label: 'VIP Users' }
  ]

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-white">
            Business Intelligence
          </h1>
          
          <div className="flex flex-wrap gap-4">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Segment Selector */}
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              {segments.map(segment => (
                <option key={segment.id} value={segment.id}>
                  {segment.label}
                </option>
              ))}
            </select>

            {/* Export Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Export Report
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* User Acquisition */}
          <UserAcquisitionMetrics 
            dateRange={dateRange}
            segment={selectedSegment}
          />

          {/* Revenue Analytics */}
          <RevenueAnalytics 
            dateRange={dateRange}
            segment={selectedSegment}
          />

          {/* Conversion Funnel */}
          <ConversionFunnel 
            dateRange={dateRange}
            segment={selectedSegment}
          />

          {/* Retention Analysis */}
          <RetentionAnalysis 
            dateRange={dateRange}
            segment={selectedSegment}
          />

          {/* Customer Lifetime Value */}
          <CustomerLifetimeValue 
            dateRange={dateRange}
            segment={selectedSegment}
          />
        </div>
      </div>
    </div>
  )
}
