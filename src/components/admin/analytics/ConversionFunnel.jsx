import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FunnelChart from './charts/FunnelChart'
import { useAnalytics } from '../../../hooks/useAnalytics'

export default function ConversionFunnel({ dateRange, segment }) {
  const { getFunnelData } = useAnalytics()
  const [selectedStage, setSelectedStage] = useState(null)
  const [funnelData, setFunnelData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadFunnelData = async () => {
      setIsLoading(true)
      const data = await getFunnelData(dateRange, segment)
      setFunnelData(data)
      setIsLoading(false)
    }

    loadFunnelData()
  }, [dateRange, segment])

  const stages = [
    {
      id: 'visitors',
      label: 'Website Visitors',
      description: 'Users who landed on the platform',
      icon: '👥'
    },
    {
      id: 'signups',
      label: 'Sign Ups',
      description: 'Users who created an account',
      icon: '📝'
    },
    {
      id: 'competition_views',
      label: 'Competition Views',
      description: 'Users who viewed competition details',
      icon: '👀'
    },
    {
      id: 'entries',
      label: 'Competition Entries',
      description: 'Users who entered competitions',
      icon: '🎯'
    },
    {
      id: 'tips',
      label: 'Tips Submitted',
      description: 'Users who submitted tips',
      icon: '✍️'
    },
    {
      id: 'conversions',
      label: 'Paid Conversions',
      description: 'Users who upgraded to paid plans',
      icon: '💰'
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Conversion Funnel
        </h2>
        <div className="flex gap-4">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Export Data
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Set Goals
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Funnel Visualization */}
          <div className="bg-gray-800 rounded-lg p-6">
            <FunnelChart
              data={funnelData}
              onStageClick={setSelectedStage}
              selectedStage={selectedStage}
            />
          </div>

          {/* Stage Details */}
          <div className="space-y-6">
            {/* Stage Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                label="Total Conversion Rate"
                value={`${funnelData.totalConversionRate}%`}
                trend={funnelData.conversionRateTrend}
              />
              <MetricCard
                label="Highest Drop-off"
                value={funnelData.highestDropoff.stage}
                subtext={`${funnelData.highestDropoff.rate}% drop-off`}
                trend={funnelData.highestDropoff.trend}
                invertTrend
              />
            </div>

            {/* Stage Breakdown */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-4">
                Stage Breakdown
              </h3>
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <StageMetrics
                    key={stage.id}
                    stage={stage}
                    metrics={funnelData.stages[stage.id]}
                    isSelected={selectedStage === stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    isLast={index === stages.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Selected Stage Details */}
            <AnimatePresence mode="wait">
              {selectedStage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-gray-800 rounded-lg p-4"
                >
                  <StageDetails
                    stage={stages.find(s => s.id === selectedStage)}
                    metrics={funnelData.stages[selectedStage]}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white mb-4">
          Optimization Opportunities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {funnelData?.optimizations.map((opt, index) => (
            <OptimizationCard
              key={index}
              title={opt.title}
              description={opt.description}
              impact={opt.impact}
              difficulty={opt.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StageMetrics({ stage, metrics, isSelected, onClick, isLast }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-colors
        ${isSelected ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{stage.icon}</span>
          <div>
            <h4 className="font-medium text-white">{stage.label}</h4>
            <p className="text-sm text-gray-400">{metrics.count} users</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-medium">
            {metrics.conversionRate}%
          </p>
          <p className="text-sm text-gray-400">
            conversion rate
          </p>
        </div>
      </div>

      {!isLast && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

function StageDetails({ stage, metrics }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-medium text-white">
            {stage.label} Details
          </h4>
          <p className="text-sm text-gray-400">
            {stage.description}
          </p>
        </div>
        <span className="text-3xl">{stage.icon}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DetailMetric
          label="Drop-off Rate"
          value={`${metrics.dropoffRate}%`}
          trend={metrics.dropoffTrend}
          invertTrend
        />
        <DetailMetric
          label="Average Time"
          value={metrics.averageTime}
          trend={metrics.timeTrend}
        />
        <DetailMetric
          label="Return Rate"
          value={`${metrics.returnRate}%`}
          trend={metrics.returnTrend}
        />
        <DetailMetric
          label="Success Rate"
          value={`${metrics.successRate}%`}
          trend={metrics.successTrend}
        />
      </div>

      {/* Common Drop-off Points */}
      <div>
        <h5 className="text-sm font-medium text-gray-400 mb-2">
          Common Drop-off Points
        </h5>
        <div className="space-y-2">
          {metrics.dropoffPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded-lg p-3"
            >
              <span className="text-white">{point.reason}</span>
              <span className="text-gray-400">{point.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OptimizationCard({ title, description, impact, difficulty }) {
  const impactColors = {
    high: 'text-green-500',
    medium: 'text-yellow-500',
    low: 'text-red-500'
  }

  const difficultyLabels = {
    easy: '🟢 Easy',
    medium: '🟡 Medium',
    hard: '🔴 Hard'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="font-medium text-white mb-2">{title}</h4>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex justify-between text-sm">
        <span className={impactColors[impact]}>
          {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
        </span>
        <span className="text-gray-400">
          {difficultyLabels[difficulty]}
        </span>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-96">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  )
}
