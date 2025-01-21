import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import FAQ from '../components/support/FAQ'
import ContactForm from '../components/support/ContactForm'
import SupportTickets from '../components/support/SupportTickets'

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('faq')
  const navigate = useNavigate()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`/support/${tab}`)
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-8">Support Center</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => handleTabChange('faq')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'faq' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            FAQ
          </button>
          <button
            onClick={() => handleTabChange('contact')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'contact' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => handleTabChange('tickets')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'tickets' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Support Tickets
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-gray-900 rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
