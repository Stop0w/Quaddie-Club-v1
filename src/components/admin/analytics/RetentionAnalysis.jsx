import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CohortHeatmap from './charts/CohortHeatmap'
import ChurnAnalysis from './charts/ChurnAnalysis'
import { useRetentionAnalytics } from '../../../hooks/useRetentionAnalytics'

export default function RetentionAnalysis({ dateRange, segment }) {
  const { getRetentionData } = useRetentionAnalytics()
  const [activeTab, setActiveTab] = useState('overview')
  const [retentionData, setRetentionData] = useState(null)
  const [selectedCohort, setSelectedCohort] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRetentionData = async () => {
      setIsLoading(true)
      const data = await getRetentionData(dateRange, segment)
      setRetentionData(data)
      setIsLoading(false)
    }

    loadRetentionData()
  }, [dateRange, segment])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cohorts', label: 'Cohort Analysis' },
    { id: 'churn', label: 'Churn Analysis' },
    { id: 'engagement', label: 'Engagement Metrics' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Retention Analysis
        </h2>
        <div className="flex gap-4">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Export Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Set Alerts
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Overall Retention"
          value={`${retentionData?.overallRetention}%`}
          trend={retentionData?.retentionTrend}
        />
        <MetricCard
          label="Churn Rate"
          value={`${retentionData?.churnRate}%`}
          trend={retentionData?.churnTrend}
          invertTrend
        />
        <MetricCard
          label="Avg. User Lifetime"
          value={retentionData?.averageLifetime}
          trend={retentionData?.lifetimeTrend}
        />
        <MetricCard
          label="Reactivation Rate"
          value={`${retentionData?.reactivationRate}%`}
          trend={retentionData?.reactivationTrend}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-400 border-transparent hover:text-white'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <RetentionOverview data={retentionData} />
          )}
          {activeTab === 'cohorts' && (
            <CohortAnalysis
              data={retentionData?.cohorts}
              onCohortSelect={setSelectedCohort}
              selectedCohort={selectedCohort}
            />
          )}
          {activeTab === 'churn' && (
            <ChurnAnalysis data={retentionData?.churn} />
          )}
          {activeTab === 'engagement' && (
            <EngagementMetrics data={retentionData?.engagement} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Selected Cohort Details */}
      <AnimatePresence>
        {selectedCohort && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 bg-gray-800 rounded-lg p-6"
          >
            <CohortDetails
              cohort={selectedCohort}
              onClose={() => setSelectedCohort(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RetentionOverview({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Retention Timeline */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Retention Timeline
        </h3>
        <div className="h-64">
          <RetentionChart data={data.timeline} />
        </div>
      </div>

      {/* Retention by Segment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Retention by Plan
          </h3>
          <div className="space-y-4">
            {data.retentionByPlan.map(plan => (
              <div key={plan.name} className="flex items-center justify-between">
                <span className="text-gray-400">{plan.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${plan.retention}%` }}
                    />
                  </div>
                  <span className="text-white">{plan.retention}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Retention by Acquisition
          </h3>
          <div className="space-y-4">
            {data.retentionBySource.map(source => (
              <div key={source.name} className="flex items-center justify-between">
                <span className="text-gray-400">{source.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${source.retention}%` }}
                    />
                  </div>
                  <span className="text-white">{source.retention}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Retention Insights */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.insights.map((insight, index) => (
            <InsightCard
              key={index}
              title={insight.title}
              value={insight.value}
              trend={insight.trend}
              description={insight.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function CohortAnalysis({ data, onCohortSelect, selectedCohort }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Cohort Heatmap */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Cohort Retention Heatmap
        </h3>
        <CohortHeatmap
          data={data.heatmap}
          onCohortSelect={onCohortSelect}
          selectedCohort={selectedCohort}
        />
      </div>

      {/* Cohort Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Best Performing Cohorts
          </h3>
          <div className="space-y-4">
            {data.bestCohorts.map(cohort => (
              <CohortCard
                key={cohort.id}
                cohort={cohort}
                onClick={() => onCohortSelect(cohort)}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Cohort Characteristics
          </h3>
          <div className="space-y-4">
            {data.characteristics.map((char, index) => (
              <CharacteristicCard
                key={index}
                title={char.title}
                value={char.value}
                impact={char.impact}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ChurnAnalysis({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Churn Timeline */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Churn Rate Timeline
        </h3>
        <ChurnChart data={data.timeline} />
      </div>

      {/* Churn Reasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            Churn Reasons
          </h3>
          <div className="space-y-4">
            {data.reasons.map((reason, index) => (
              <ChurnReasonCard
                key={index}
                reason={reason.label}
                percentage={reason.percentage}
                trend={reason.trend}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">
            At-Risk Users
          </h3>
          <div className="space-y-4">
            {data.atRiskUsers.map((user, index) => (
              <AtRiskUserCard
                key={index}
                user={user}
                riskScore={user.riskScore}
                indicators={user.riskIndicators}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EngagementMetrics({ data }) {
  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Engagement Score Distribution */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Engagement Score Distribution
        </h3>
        <EngagementChart data={data.distribution} />
      </div>

      {/* Engagement Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.factors.map((factor, index) => (
          <EngagementFactorCard
            key={index}
            title={factor.name}
            score={factor.score}
            trend={factor.trend}
            impact={factor.impact}
          />
        ))}
      </div>
    </div>
  )
}
