import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CLVChart from './charts/CLVChart'
import PredictionModel from './charts/PredictionModel'
import { useCLVAnalytics } from '../../../hooks/useCLVAnalytics'

export default function CustomerLifetimeValue({ dateRange, segment }) {
  const { getCLVData } = useCLVAnalytics()
  const [activeView, setActiveView] = useState('overview')
  const [clvData, setCLVData] = useState(null)
  const [selectedSegment, setSelectedSegment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCLVData = async () => {
      setIsLoading(true)
      const data = await getCLVData(dateRange, segment)
      setCLVData(data)
      setIsLoading(false)
    }

    loadCLVData()
  }, [dateRange, segment])

  const views = [
    { id: 'overview', label: 'Overview' },
    { id: 'segments', label: 'Segment Analysis' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'optimization', label: 'Optimization' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Customer Lifetime Value
        </h2>
        <div className="flex gap-4">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Export Analysis
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Set CLV Goals
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Average CLV"
          value={`$${clvData?.averageCLV.toLocaleString()}`}
          trend={clvData?.clvTrend}
        />
        <MetricCard
          label="Predicted Growth"
          value={`${clvData?.predictedGrowth}%`}
          trend={clvData?.growthTrend}
        />
        <MetricCard
          label="Avg. Customer Lifespan"
          value={clvData?.averageLifespan}
          trend={clvData?.lifespanTrend}
        />
        <MetricCard
          label="Revenue per User"
          value={`$${clvData?.revenuePerUser}`}
          trend={clvData?.revenueTrend}
        />
      </div>

      {/* View Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-gray-800">
        {views.map(view => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeView === view.id
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-400 border-transparent hover:text-white'
              }
            `}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* View Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === 'overview' && (
            <CLVOverview data={clvData} />
          )}
          {activeView === 'segments' && (
            <SegmentAnalysis
              data={clvData?.segments}
              onSegmentSelect={setSelectedSegment}
              selectedSegment={selectedSegment}
            />
          )}
          {activeView === 'predictions' && (
            <CLVPredictions data={clvData?.predictions} />
          )}
          {activeView === 'optimization' && (
            <CLVOptimization data={clvData?.optimization} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CLVOverview({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* CLV Distribution */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          CLV Distribution
        </h3>
        <div className="h-64">
          <CLVChart data={data.distribution} />
        </div>
      </div>

      {/* Value Drivers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Top Value Drivers
          </h3>
          <div className="space-y-4">
            {data.valueDrivers.map((driver, index) => (
              <ValueDriverCard
                key={index}
                driver={driver.name}
                impact={driver.impact}
                trend={driver.trend}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Revenue Breakdown
          </h3>
          <div className="space-y-4">
            {data.revenueBreakdown.map((item, index) => (
              <RevenueBreakdownCard
                key={index}
                source={item.source}
                amount={item.amount}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SegmentAnalysis({ data, onSegmentSelect, selectedSegment }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Segment Comparison */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          CLV by Segment
        </h3>
        <div className="space-y-4">
          {data.segments.map((segment, index) => (
            <SegmentCard
              key={index}
              segment={segment}
              isSelected={selectedSegment?.id === segment.id}
              onClick={() => onSegmentSelect(segment)}
            />
          ))}
        </div>
      </div>

      {/* Segment Details */}
      {selectedSegment && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Segment Details: {selectedSegment.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SegmentMetricCard
              label="Average CLV"
              value={`$${selectedSegment.averageCLV}`}
              comparison={selectedSegment.clvComparison}
            />
            <SegmentMetricCard
              label="Growth Rate"
              value={`${selectedSegment.growthRate}%`}
              comparison={selectedSegment.growthComparison}
            />
            <SegmentMetricCard
              label="Retention Rate"
              value={`${selectedSegment.retentionRate}%`}
              comparison={selectedSegment.retentionComparison}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function CLVPredictions({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Prediction Model */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          CLV Forecast
        </h3>
        <div className="h-64">
          <PredictionModel data={data.forecast} />
        </div>
      </div>

      {/* Growth Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.opportunities.map((opportunity, index) => (
          <OpportunityCard
            key={index}
            title={opportunity.title}
            potential={opportunity.potential}
            probability={opportunity.probability}
            impact={opportunity.impact}
          />
        ))}
      </div>
    </div>
  )
}

function CLVOptimization({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Optimization Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Revenue Optimization
          </h3>
          <div className="space-y-4">
            {data.revenueStrategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                strategy={strategy}
                type="revenue"
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Retention Optimization
          </h3>
          <div className="space-y-4">
            {data.retentionStrategies.map((strategy, index) => (
              <StrategyCard
                key={index}
                strategy={strategy}
                type="retention"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Implementation Plan */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Implementation Roadmap
        </h3>
        <div className="space-y-4">
          {data.implementationPlan.map((phase, index) => (
            <RoadmapPhase
              key={index}
              phase={phase}
              isLast={index === data.implementationPlan.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper Components
function ValueDriverCard({ driver, impact, trend }) {
  return (
    <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
      <div>
        <p className="text-white font-medium">{driver}</p>
        <p className="text-sm text-gray-400">Impact Score: {impact}</p>
      </div>
      <div className={`
        text-sm font-medium
        ${trend > 0 ? 'text-green-500' : 'text-red-500'}
      `}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
  )
}

function SegmentCard({ segment, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between p-4 rounded-lg transition-colors
        ${isSelected ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}
      `}
    >
      <div>
        <p className="text-white font-medium">{segment.name}</p>
        <p className="text-sm text-gray-400">
          {segment.userCount.toLocaleString()} users
        </p>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">
          ${segment.averageCLV.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">
          Avg. CLV
        </p>
      </div>
    </button>
  )
}

function OpportunityCard({ title, potential, probability, impact }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="font-medium text-white mb-2">{title}</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Potential Value</span>
          <span className="text-green-500">${potential}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Probability</span>
          <span className="text-blue-500">{probability}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Impact</span>
          <span className={`
            ${impact === 'High' ? 'text-green-500' :
              impact === 'Medium' ? 'text-yellow-500' :
              'text-red-500'}
          `}>
            {impact}
          </span>
        </div>
      </div>
    </div>
  )
}

function RoadmapPhase({ phase, isLast }) {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            {phase.number}
          </div>
          {!isLast && (
            <div className="w-0.5 h-full bg-gray-700" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-white">{phase.title}</h4>
          <p className="text-sm text-gray-400 mt-1">
            {phase.description}
          </p>
          <div className="mt-2 flex gap-2">
            {phase.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
