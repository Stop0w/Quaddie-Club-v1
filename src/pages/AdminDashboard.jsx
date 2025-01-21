import { useState } from 'react'
import VenueAnalytics from '../components/admin/VenueAnalytics'
import UserAcquisition from '../components/admin/UserAcquisition'
import RevenueMetrics from '../components/admin/RevenueMetrics'
import VenueSalesTools from '../components/admin/VenueSalesTools'
import MarketingInsights from '../components/admin/MarketingInsights'

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value="$125,430"
            trend="+12.5%"
            isPositive={true}
          />
          <MetricCard
            title="Active Users"
            value="1,234"
            trend="+8.3%"
            isPositive={true}
          />
          <MetricCard
            title="Venue Partners"
            value="45"
            trend="+3"
            isPositive={true}
          />
          <MetricCard
            title="Conversion Rate"
            value="23.5%"
            trend="+2.1%"
            isPositive={true}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venue Performance & Sales Tools */}
          <div className="space-y-8">
            <VenueAnalytics dateRange={dateRange} />
            <VenueSalesTools />
          </div>

          {/* User Acquisition & Revenue */}
          <div className="space-y-8">
            <UserAcquisition dateRange={dateRange} />
            <RevenueMetrics dateRange={dateRange} />
          </div>
        </div>

        {/* Marketing Insights */}
        <div className="mt-8">
          <MarketingInsights dateRange={dateRange} />
        </div>
      </div>
    </div>
  )
}
