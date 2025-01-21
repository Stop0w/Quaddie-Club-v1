import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

export default function RaceCalendar({ races, filters }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get calendar days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Group races by date
  const racesByDate = races.reduce((acc, race) => {
    const date = format(new Date(race.date), 'yyyy-MM-dd')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(race)
    return acc
  }, {})

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-800">
        {/* Weekday Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-400"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, dayIdx) => {
          const dateKey = format(day, 'yyyy-MM-dd')
          const dayRaces = racesByDate[dateKey] || []
          const filteredRaces = dayRaces.filter(race => {
            if (filters.venue !== 'all' && race.venue.id !== filters.venue) return false
            if (filters.type !== 'all' && race.type !== filters.type) return false
            return true
          })

          return (
            <motion.div
              key={day.toString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: dayIdx * 0.01 }}
              className={`
                min-h-[100px] p-2 relative
                ${!isSameMonth(day, currentMonth) ? 'bg-gray-900' : 'bg-gray-800'}
                ${isToday(day) ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              {/* Day Number */}
              <div className={`
                text-sm font-medium mb-2
                ${!isSameMonth(day, currentMonth) ? 'text-gray-600' : 'text-gray-400'}
                ${isToday(day) ? 'text-blue-500' : ''}
              `}>
                {format(day, 'd')}
              </div>

              {/* Race Indicators */}
              {filteredRaces.length > 0 && (
                <div className="space-y-1">
                  {filteredRaces.slice(0, 3).map(race => (
                    <div
                      key={race.id}
                      className="text-xs bg-blue-600/20 text-blue-500 rounded px-1 py-0.5 truncate"
                    >
                      {race.venue.name} R{race.number}
                    </div>
                  ))}
                  {filteredRaces.length > 3 && (
                    <div className="text-xs text-gray-400">
                      +{filteredRaces.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
