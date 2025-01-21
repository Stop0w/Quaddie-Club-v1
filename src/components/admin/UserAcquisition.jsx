import { useState } from 'react'
import { motion } from 'framer-motion'

export default function UserAcquisition({ dateRange }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">User Acquisition</h2>

      {/* Acquisition Funnel */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Acquisition Funnel
          </h3>
          <div className="space-y-4">
            <FunnelStage
              label="Visitors"
              count={10000}
              percentage={100}
            />
            <FunnelStage
              label="Sign Ups"
              count={2500}
              percentage={25}
            />
            <FunnelStage
              label="Competition Entries"
              count={1500}
              percentage={15}
            />
            <FunnelStage
              label="Paid Conversions"
              count={500}
              percentage={5}
            />
          </div>
        </div>

        {/* Conversion Optimization */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Conversion Opportunities
          </h3>
          <div className="space-y-4">
            {conversionOpportunities.map(opportunity => (
              <OpportunityCard 
                key={opportunity.id} 
                opportunity={opportunity} 
              />
            ))}
          </div>
        </div>

        {/* User Journey Analysis */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            User Journey Analysis
          </h3>
          <div className="space-y-4">
            {journeyStages.map(stage => (
              <JourneyStageCard 
                key={stage.id} 
                stage={stage} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
