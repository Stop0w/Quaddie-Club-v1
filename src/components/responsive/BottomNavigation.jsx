import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewport } from '../../hooks/useViewport'
import { useSafeArea } from '../../hooks/useSafeArea'

export default function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bottomInset } = useSafeArea()
  const [activeTab, setActiveTab] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(
        currentScrollY < lastScrollY || // Scrolling up
        currentScrollY < 50 || // Near top
        currentScrollY + window.innerHeight >= document.documentElement.scrollHeight - 100 // Near bottom
      )
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { id: 'competitions', label: 'Competitions', icon: '🏆', path: '/competitions' },
    { id: 'tips', label: 'Tips', icon: '💡', path: '/tips' },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' }
  ]

  return (
    <>
      {/* Content Spacer */}
      <div style={{ height: `${bottomInset + 64}px` }} />

      {/* Bottom Navigation */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800"
            style={{ paddingBottom: bottomInset }}
          >
            <nav className="flex justify-around items-center h-16">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={location.pathname.startsWith(item.path)}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({ item, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center w-full h-full"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Background Highlight */}
      {isActive && (
        <motion.div
          layoutId="navHighlight"
          className="absolute inset-2 bg-blue-600/10 rounded-lg"
        />
      )}

      {/* Icon */}
      <span className="text-2xl mb-1">{item.icon}</span>

      {/* Label */}
      <span className={`
        text-xs
        ${isActive ? 'text-blue-500 font-medium' : 'text-gray-400'}
      `}>
        {item.label}
      </span>

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="navIndicator"
          className="absolute bottom-0 w-12 h-0.5 bg-blue-500"
        />
      )}
    </button>
  )
}
