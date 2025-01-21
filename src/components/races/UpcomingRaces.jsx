import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RaceFilters from './RaceFilters'
import RaceList from './RaceList'
import RaceCalendar from './RaceCalendar'
import useRaceStore from '../../store/raceStore'

export default function UpcomingRaces() {
  const [viewMode, setViewMode] = useState('list') // list or calendar
  const [filters, setFilters] = useState({
    venue: 'all',
    date: null,
    type: 'all'
  })
  
  const { upcomingRaces, isLoading } = useRaceStore()

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Upcoming Races</h2>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <RaceFilters
        filters={filters}
        onChange={setFilters}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        ) : viewMode === 'list' ? (
          <RaceList
            races={upcomingRaces}
            filters={filters}
          />
        ) : (
          <RaceCalendar
            races={upcomingRaces}
            filters={filters}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
