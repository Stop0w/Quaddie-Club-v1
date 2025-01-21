import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
  const [expandedSection, setExpandedSection] = useState(null)

  const competitions = [
    'Randwick Everest Day',
    'Harness on a Heater',
    'Little Bear',
    'Find Mates',
    'Back Pics, Drive What You Like!'
  ]

  return (
    <nav className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 overflow-y-auto">
      {/* Main Navigation */}
      <div className="p-4 space-y-2">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => `
            flex items-center px-4 py-2 rounded-lg
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}
          `}
        >
          <span>Dashboard</span>
        </NavLink>

        {/* Competitions Section */}
        <div>
          <button
            onClick={() => setExpandedSection(
              expandedSection === 'competitions' ? null : 'competitions'
            )}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg"
          >
            <span>Competitions</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                expandedSection === 'competitions' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {expandedSection === 'competitions' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-4 mt-2 space-y-1"
              >
                {competitions.map((comp) => (
                  <NavLink
                    key={comp}
                    to={`/competitions/${comp.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) => `
                      block px-4 py-2 rounded-lg text-sm
                      ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}
                    `}
                  >
                    {comp}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tips Section */}
        <div>
          <button
            onClick={() => setExpandedSection(
              expandedSection === 'tips' ? null : 'tips'
            )}
            className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-lg"
          >
            <span>Tips</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                expandedSection === 'tips' ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {expandedSection === 'tips' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="ml-4 mt-2 space-y-1"
              >
                {competitions.map((comp) => (
                  <NavLink
                    key={comp}
                    to={`/tips/${comp.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({ isActive }) => `
                      block px-4 py-2 rounded-lg text-sm
                      ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}
                    `}
                  >
                    {comp}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Other Navigation Items */}
        <NavLink
          to="/management"
          className={({ isActive }) => `
            flex items-center px-4 py-2 rounded-lg
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}
          `}
        >
          <span>Management Hub</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `
            flex items-center px-4 py-2 rounded-lg
            ${isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}
          `}
        >
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  )
}
