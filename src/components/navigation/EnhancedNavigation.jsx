import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewport } from '../../hooks/useViewport'
import BreadcrumbTrail from './BreadcrumbTrail'
import RecentlyViewed from './RecentlyViewed'
import NavigationMenu from './NavigationMenu'
import MobileNavBar from './MobileNavBar'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { useNavigationStore } from '../../store/navigationStore'

export default function EnhancedNavigation() {
  const { isMobile } = useViewport()
  const location = useLocation()
  const navigate = useNavigate()
  const { addRecentItem, recentItems } = useRecentlyViewed()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentSection, setCurrentSection } = useNavigationStore()

  // Track page views for recently viewed
  useEffect(() => {
    addRecentItem({
      path: location.pathname,
      timestamp: new Date().toISOString()
    })
  }, [location.pathname])

  // Handle back navigation
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Main Navigation */}
              <div className="flex items-center space-x-8">
                <Logo />
                <NavigationMenu 
                  currentSection={currentSection}
                  onSectionChange={setCurrentSection}
                />
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                <SearchBar />
                <UserMenu />
              </div>
            </div>

            {/* Breadcrumbs and Context */}
            <div className="mt-4 flex items-center justify-between">
              <BreadcrumbTrail />
              <RecentlyViewed items={recentItems} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <MobileNavBar
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
          
          <AnimatePresence>
            {isMenuOpen && (
              <MobileMenu
                onClose={() => setIsMenuOpen(false)}
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
              />
            )}
          </AnimatePresence>
        </>
      )}

      {/* Back Navigation Button */}
      <AnimatePresence>
        {location.pathname !== '/' && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={handleBack}
            className="fixed left-4 bottom-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            <BackIcon />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
      <span className="text-xl font-bold text-white">Quaddie</span>
    </Link>
  )
}

function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (value) => {
    setIsSearching(true)
    // Implement search logic here
    setIsSearching(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          handleSearch(e.target.value)
        }}
        placeholder="Search..."
        className="w-64 bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      
      <AnimatePresence>
        {(results.length > 0 || isSearching) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg"
          >
            {isSearching ? (
              <div className="p-4 text-center">
                <LoadingSpinner />
              </div>
            ) : (
              <SearchResults results={results} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-gray-300"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
        <span>{user.name}</span>
        <ChevronIcon className={`transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1"
          >
            <UserMenuItems onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({ onClose, currentSection, onSectionChange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="absolute right-0 top-0 bottom-0 w-3/4 bg-gray-900"
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <CloseIcon />
          </button>

          <div className="mt-12">
            <MobileNavigationItems
              currentSection={currentSection}
              onSectionChange={(section) => {
                onSectionChange(section)
                onClose()
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
    />
  )
}

// Icons
function BackIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
