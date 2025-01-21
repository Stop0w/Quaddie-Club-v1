import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationContext } from '../../hooks/useNavigationContext'

export default function NavigationMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentContext, updateContext } = useNavigationContext()

  const navigationStructure = {
    dashboard: {
      label: 'Dashboard',
      icon: '📊',
      subItems: [
        { id: 'overview', label: 'Overview', path: '/dashboard' },
        { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics' },
        { id: 'reports', label: 'Reports', path: '/dashboard/reports' }
      ]
    },
    competitions: {
      label: 'Competitions',
      icon: '🏆',
      subItems: [
        { id: 'active', label: 'Active Competitions', path: '/competitions/active' },
        { id: 'upcoming', label: 'Upcoming', path: '/competitions/upcoming' },
        { id: 'past', label: 'Past Competitions', path: '/competitions/past' },
        { id: 'create', label: 'Create Competition', path: '/competitions/create' }
      ]
    },
    tips: {
      label: 'Tips',
      icon: '💡',
      subItems: [
        { id: 'my-tips', label: 'My Tips', path: '/tips' },
        { id: 'leaderboard', label: 'Leaderboard', path: '/tips/leaderboard' },
        { id: 'history', label: 'History', path: '/tips/history' }
      ]
    },
    venues: {
      label: 'Venues',
      icon: '🏟️',
      subItems: [
        { id: 'all-venues', label: 'All Venues', path: '/venues' },
        { id: 'my-venues', label: 'My Venues', path: '/venues/my-venues' },
        { id: 'venue-stats', label: 'Statistics', path: '/venues/statistics' }
      ]
    },
    management: {
      label: 'Management',
      icon: '⚙️',
      subItems: [
        { id: 'users', label: 'User Management', path: '/management/users' },
        { id: 'settings', label: 'Settings', path: '/management/settings' },
        { id: 'reports', label: 'Reports', path: '/management/reports' }
      ]
    }
  }

  const handleNavigation = useCallback((path) => {
    navigate(path)
    updateContext(path)
  }, [navigate, updateContext])

  return (
    <nav className="flex items-center space-x-2">
      {Object.entries(navigationStructure).map(([key, section]) => (
        <NavigationSection
          key={key}
          section={section}
          isActive={location.pathname.includes(key)}
          onNavigate={handleNavigation}
        />
      ))}
    </nav>
  )
}

function NavigationSection({ section, isActive, onNavigate }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`
          px-4 py-2 rounded-lg flex items-center space-x-2
          ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}
        `}
      >
        <span>{section.icon}</span>
        <span>{section.label}</span>
        <ChevronIcon className={`transform ${isHovered ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2"
          >
            {section.subItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className={`
                  w-full px-4 py-2 text-left hover:bg-gray-700
                  ${location.pathname === item.path ? 'text-blue-500' : 'text-gray-400'}
                `}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
