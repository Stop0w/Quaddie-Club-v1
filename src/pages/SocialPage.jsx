import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import FriendsList from '../components/social/FriendsList'
import MessageCenter from '../components/social/MessageCenter'
import SharingHub from '../components/social/SharingHub'

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('friends')
  const navigate = useNavigate()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`/social/${tab}`)
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-8">Social Hub</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => handleTabChange('friends')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'friends' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => handleTabChange('messages')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'messages' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => handleTabChange('sharing')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'sharing' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            Share
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
