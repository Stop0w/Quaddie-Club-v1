import { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { motion } from 'framer-motion'

export default function RevenueAnalytics({ dateRange, segment }) {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    mrr: 0,
    arr: 0,
    revenueGrowth: 0,
    averageRevenuePerUser: 0,
    subscriptionBreakdown: {},
    revenueTimeSeries: []
  })

  useEffect(() => {
    // Simulated data fetch
    const fetchMetrics = async () => {
      setMetrics({
        totalRevenue: 1250000,
        mrr: 125000,
        arr: 1500000,
        revenueGrowth: 12.5,
        averageRevenuePerUser: 85,
        subscriptionBreakdown: {
          'Free': 60,
          'Basic': 25,
          'Premium': 10,
          'VIP': 5
        },
        revenueTimeSeries: [/* ... */]
      })
    }

    fetchMetrics()
  }, [dateRange, segment])

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Revenue Analytics
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <MetricCard
          label="Total Revenue"
          value={`$${(metrics.totalRevenue / 1000).toFixed(1)}K`}
          trend={metrics.revenueGrowth}
        />
        <MetricCard
          label="MRR"
          value={`$${(metrics.mrr / 1000).toFixed(1)}K`}
          trend={8.3}
        />
        <MetricCard
          label="ARR"
          value={`$${(metrics.arr / 1000000).toFixed(1)}M`}
          trend={12.5}
        />
        <MetricCard
          label="Avg. Revenue/User"
          value={`$${metrics.averageRevenuePerUser}`}
          trend={5.2}
        />
        <MetricCard
          label="Revenue Growth"
          value={`${metrics.revenueGrowth}%`}
          trend={2.1}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Revenue Trend
          </h3>
          <div className="h-64">
            <Line
              data={revenueTrendData}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Subscription Distribution
          </h3>
          <div className="h-64">
            <Bar
              data={subscriptionData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>

      {/* Revenue Insights */}
      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Revenue Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RevenueInsight
            title="Subscription Upgrades"
            value="+15%"
            description="Increase in premium plan adoptions"
          />
          <RevenueInsight
            title="Churn Impact"
            value="-$12.5K"
            description="Revenue lost to churn this period"
          />
          <RevenueInsight
            title="Expansion Revenue"
            value="+$25K"
            description="Additional revenue from existing users"
          />
        </div>
      </div>

      {/* Forecasting */}
      <div className="mt-8 bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium text-white mb-4">
          Revenue Forecast
        </h3>
        <div className="h-64">
          <Line
            data={forecastData}
            options={forecastOptions}
          />
        </div>
      </div>
    </div>
  )
}

function RevenueInsight({ title, value, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg p-4"
    >
      <h4 className="font-medium text-white">{title}</h4>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </motion.div>
  )
}
