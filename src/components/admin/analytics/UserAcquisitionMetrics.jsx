import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'

export default function UserAcquisitionMetrics({ dateRange, segment }) {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    newUsers: 0,
    growthRate: 0,
    acquisitionCost: 0,
    channelBreakdown: {},
    timeSeriesData: []
  })

  // Fetch metrics based on dateRange and segment
  useEffect(() => {
    // Simulated data fetch
    const fetchMetrics = async () => {
      // In real implementation, this would be an API call
      setMetrics({
        totalUsers: 12500,
        newUsers: 450,
        growthRate: 8.5,
        acquisitionCost: 24.50,
        channelBreakdown: {
          'Organic Search': 35,
          'Social Media': 25,
          'Referral': 20,
          'Direct': 15,
          'Other': 5
        },
        timeSeriesData: [/* ... */]
      })
    }

    fetchMetrics()
  }, [dateRange, segment])

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        User Acquisition
      </h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Total Users"
          value={metrics.totalUsers.toLocaleString()}
          trend={metrics.growthRate}
        />
        <MetricCard
          label="New Users"
          value={metrics.newUsers.toLocaleString()}
          subtext={`in last ${dateRange}`}
        />
        <MetricCard
          label="Growth Rate"
          value={`${metrics.growthRate}%`}
          trend={metrics.growthRate - 5.2} // Compare to previous period
        />
        <MetricCard
          label="Acquisition Cost"
          value={`$${metrics.acquisitionCost}`}
          trend={-2.1}
          invertTrend
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Trend */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            User Growth Trend
          </h3>
          <div className="h-64">
            <Line
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Acquisition Channels
          </h3>
          <div className="space-y-4">
            {Object.entries(metrics.channelBreakdown).map(([channel, percentage]) => (
              <div key={channel}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{channel}</span>
                  <span className="text-white">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightCard
            title="Growth Acceleration"
            description="User growth rate has increased by 3.3% compared to last period"
            trend="positive"
          />
          <InsightCard
            title="Channel Optimization"
            description="Social media acquisition cost decreased by 12% this period"
            trend="positive"
          />
          <InsightCard
            title="Retention Impact"
            description="New users show 15% higher 30-day retention rate"
            trend="positive"
          />
          <InsightCard
            title="Acquisition Cost"
            description="CAC increased slightly for paid channels"
            trend="negative"
          />
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, trend, subtext, invertTrend }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      {trend !== undefined && (
        <div className={`
          flex items-center gap-1 mt-1 text-sm
          ${invertTrend ? trend < 0 : trend > 0 ? 'text-green-500' : 'text-red-500'}
        `}>
          <span>{trend > 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
      {subtext && (
        <p className="text-xs text-gray-500 mt-1">{subtext}</p>
      )}
    </div>
  )
}

function InsightCard({ title, description, trend }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className={`
          p-2 rounded-lg
          ${trend === 'positive' ? 'bg-green-500/10' : 'bg-red-500/10'}
        `}>
          <span className={`text-xl ${
            trend === 'positive' ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend === 'positive' ? '↑' : '↓'}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
