import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import CompetitionCard from './CompetitionCard'
import LiveUpdatesIndicator from './LiveUpdatesIndicator'
import { useRealTimeUpdates } from '../../hooks/useRealTimeUpdates'

export default function ActiveCompetitions() {
  const [competitions, setCompetitions] = useState([])
  const { subscribe, isConnected } = useRealTimeUpdates()

  useEffect(() => {
    // Subscribe to real-time updates for active competitions
    const unsubscribe = subscribe('active-competitions', (update) => {
      setCompetitions(prev => 
        prev.map(comp => 
          comp.id === update.id ? { ...comp, ...update } : comp
        )
      )
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Active Competitions</h2>
        <LiveUpdatesIndicator isConnected={isConnected} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {competitions.map((competition) => (
            <motion.div
              key={competition.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CompetitionCard competition={competition} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
