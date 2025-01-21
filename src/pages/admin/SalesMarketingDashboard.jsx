import { useState } from 'react'
import VenuePitchGenerator from '../components/admin/sales/VenuePitchGenerator'
import ROICalculator from '../components/admin/sales/ROICalculator'
import LeadManagement from '../components/admin/sales/LeadManagement'
import CampaignAnalytics from '../components/admin/sales/CampaignAnalytics'
import SuccessStories from '../components/admin/sales/SuccessStories'

export default function SalesMarketingDashboard() {
  const [activeSection, setActiveSection] = useState('pitch')

  const sections = [
    { id: 'pitch', label: 'Pitch Deck Generator' },
    { id: 'roi', label: 'ROI Calculator' },
    { id: 'leads', label: 'Lead Management' },
    { id: 'campaigns', label: 'Campaign Analytics' },
    { id: 'success', label: 'Success Stories' }
  ]

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Sales & Marketing Tools
          </h1>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Export Reports
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              New Campaign
            </button>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                px-4 py-2 rounded-lg whitespace-nowrap
                ${activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
                }
              `}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="space-y-8">
          {activeSection === 'pitch' && <VenuePitchGenerator />}
          {activeSection === 'roi' && <ROICalculator />}
          {activeSection === 'leads' && <LeadManagement />}
          {activeSection === 'campaigns' && <CampaignAnalytics />}
          {activeSection === 'success' && <SuccessStories />}
        </div>
      </div>
    </div>
  )
}
