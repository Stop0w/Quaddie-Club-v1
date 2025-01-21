import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VenuePitchGenerator() {
  const [venueType, setVenueType] = useState('pub')
  const [venueSize, setVenueSize] = useState('medium')
  const [focusAreas, setFocusAreas] = useState([])
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    // Simulate pitch deck generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGenerating(false)
    // Handle download
  }

  return (
    <div className="space-y-8">
      {/* Pitch Configuration */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          Venue Pitch Configuration
        </h2>

        <div className="space-y-6">
          {/* Venue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Venue Type
            </label>
            <select
              value={venueType}
              onChange={(e) => setVenueType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="pub">Pub</option>
              <option value="club">Club</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>

          {/* Venue Size */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Venue Size
            </label>
            <select
              value={venueSize}
              onChange={(e) => setVenueSize(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="small">Small (< 100 capacity)</option>
              <option value="medium">Medium (100-300 capacity)</option>
              <option value="large">Large (> 300 capacity)</option>
            </select>
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Focus Areas
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Revenue Growth',
                'Customer Engagement',
                'Brand Awareness',
                'Customer Retention',
                'Event Marketing',
                'Social Media Presence'
              ].map(area => (
                <label
                  key={area}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={focusAreas.includes(area)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFocusAreas([...focusAreas, area])
                      } else {
                        setFocusAreas(focusAreas.filter(a => a !== area))
                      }
                    }}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-700 bg-gray-800"
                  />
                  <span className="text-white">{area}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview & Actions */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">
            Generated Pitch Preview
          </h3>
          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate Pitch'}
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
              Save Template
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 min-h-[300px]">
          {generating ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <div className="text-gray-400 text-center">
              Configure your pitch and click Generate
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
