import { useState } from 'react'
import { notifications } from '../../data/dummyNotificationsData'

export default function NotificationsCenter() {
  const [activeTab, setActiveTab] = useState('all')
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications['u1'].filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white">Notifications</h2>
      </div>

      {/* Notification Tabs */}
      <div className="px-2 border-b border-gray-800">
        <nav className="flex space-x-4">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'race_reminder', label: 'Races' },
            { id: 'competition_invite', label: 'Invites' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 py-2 text-sm font-medium rounded-md
                ${activeTab === tab.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id}
            className={`
              px-6 py-4 hover:bg-gray-800/50 transition-colors
              ${!notification.read ? 'bg-gray-800/25' : ''}
            `}
          >
            <div className="flex items-start space-x-3">
              {/* Notification Icon */}
              <div className={`
                p-2 rounded-full
                ${notification.priority === 'high' ? 'bg-red-500/10 text-red-500' : 
                  notification.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-blue-500/10 text-blue-500'}
              `}>
                {/* Icon based on notification type */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={
                      notification.type === 'race_reminder' 
                        ? 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                        : 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    } 
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {notification.title}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {notification.message}
                </p>
                {notification.actionUrl && (
                  <a 
                    href={notification.actionUrl}
                    className="mt-2 inline-block text-sm text-blue-500 hover:text-blue-400"
                  >
                    View details →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-400">
            No notifications to show
          </div>
        )}
      </div>
    </div>
  )
}
