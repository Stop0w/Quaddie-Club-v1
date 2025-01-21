import { useState } from 'react'
import { motion } from 'framer-motion'

export default function MarketingInsights({ dateRange }) {
  const [activeTab, setActiveTab] = useState('campaigns')

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Marketing Insights</h2>

      {/* Marketing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            User Acquisition Cost
          </h3>
          <p className="text-3xl font-bold text-white">$24.50</p>
          <p className="text-sm text-gray-400">Per converted user</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Retention Rate
          </h3>
          <p className="text-3xl font-bold text-white">78%</p>
          <p className="text-sm text-gray-400">30-day retention</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Viral Coefficient
          </h3>
          <p className="text-3xl font-bold text-white">1.2</p>
          <p className="text-sm text-gray-400">User referral rate</p>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Active Campaigns
          </h3>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>

        {/* User Segments */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            User Segments
          </h3>
          <div className="space-y-4">
            {segments.map(segment => (
              <SegmentCard key={segment.id} segment={segment} />
            ))}
          </div>
        </div>

        {/* Growth Opportunities */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Growth Opportunities
          </h3>
          <div className="space-y-4">
            {opportunities.map(opportunity => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
