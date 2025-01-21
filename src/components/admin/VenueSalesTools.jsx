import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VenueSalesTools() {
  const [selectedVenue, setSelectedVenue] = useState(null)

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Venue Sales Tools</h2>

      {/* Sales Collateral Generator */}
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Sales Collateral Generator
          </h3>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Generate Venue Pitch Deck
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Export Performance Metrics
            </button>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Create ROI Report
            </button>
          </div>
        </div>

        {/* Venue Success Stories */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Success Stories
          </h3>
          <div className="space-y-4">
            {venues.map(venue => (
              <VenueSuccessCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>

        {/* Lead Tracking */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Lead Pipeline
          </h3>
          <div className="space-y-2">
            {leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
