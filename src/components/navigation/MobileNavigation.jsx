import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const mainNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/competitions', label: 'Competitions', icon: '🏆' },
    { path: '/tips', label: 'Tips', icon: '📝' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-safe-area">
        <div className="grid grid-cols-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center py-2
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
      </nav>

      {/* Full Screen Menu (for Tips and other sections) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-0 bg-gray-900 z-50"
          >
            {/* Menu content */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
