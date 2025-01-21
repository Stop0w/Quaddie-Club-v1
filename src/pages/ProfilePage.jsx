import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import AnimatedAccordion from '../components/profile/AnimatedAccordion'
import ProfileForm from '../components/profile/ProfileForm'
import NotificationSettings from '../components/profile/NotificationSettings'
import PrivacySettings from '../components/profile/PrivacySettings'
import SubscriptionSettings from '../components/profile/SubscriptionSettings'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    {
      id: 'profile',
      title: 'User Profile',
      content: <ProfileForm user={user} />
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      content: <NotificationSettings preferences={user.preferences.notifications} />
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      content: <PrivacySettings settings={user.preferences.privacy} />
    },
    {
      id: 'subscription',
      title: 'Subscription and Billing',
      content: <SubscriptionSettings subscription={user.subscription} />
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-black py-8"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            Settings
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link 
              to="/dashboard" 
              className="text-blue-500 hover:text-blue-400 flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Back to Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Accordion Sections */}
        <AnimatedAccordion 
          sections={sections}
          activeSection={activeSection}
          onToggle={(sectionId) => {
            setActiveSection(activeSection === sectionId ? null : sectionId)
          }}
        />

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
