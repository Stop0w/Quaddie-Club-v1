import { useLocation, Link } from 'react-router-dom'

export default function MobileFooter() {
  const location = useLocation()
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/competitions', label: 'Competitions', icon: '🏆' },
    { path: '/tips', label: 'Tips', icon: '📝' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-safe">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex flex-col items-center py-3
              ${location.pathname === item.path
                ? 'text-blue-500'
                : 'text-gray-400'
              }
            `}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
