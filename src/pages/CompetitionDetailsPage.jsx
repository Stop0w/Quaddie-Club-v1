import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CompetitionHeader from '../components/competitions/details/CompetitionHeader'
import ParticipantList from '../components/competitions/details/ParticipantList'
import CompetitionLeaderboard from '../components/competitions/details/CompetitionLeaderboard'
import RulesAndPrizes from '../components/competitions/details/RulesAndPrizes'
import CompetitionActions from '../components/competitions/details/CompetitionActions'
import useCompetitionStore from '../store/competitionStore'

export default function CompetitionDetailsPage() {
  const { competitionId } = useParams()
  const { getCompetition, joinCompetition, leaveCompetition } = useCompetitionStore()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const competition = getCompetition(competitionId)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'participants', label: 'Participants' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'rules', label: 'Rules & Prizes' }
  ]

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Competition Header */}
        <CompetitionHeader competition={competition} />

        {/* Action Buttons */}
        <CompetitionActions
          competition={competition}
          onJoin={joinCompetition}
          onLeave={leaveCompetition}
        />

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-gray-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'text-blue-500 border-blue-500'
                  : 'text-gray-400 border-transparent hover:text-white'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <RulesAndPrizes competition={competition} />
              </div>
              <div>
                <CompetitionStats competition={competition} />
              </div>
            </motion.div>
          )}

          {activeTab === 'participants' && (
            <ParticipantList competition={competition} />
          )}

          {activeTab === 'leaderboard' && (
            <CompetitionLeaderboard competition={competition} />
          )}

          {activeTab === 'rules' && (
            <RulesAndPrizes competition={competition} expanded />
          )}
        </div>
      </div>
    </div>
  )
}

function CompetitionStats({ competition }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">Competition Stats</h3>
      <div className="space-y-4">
        <StatItem
          label="Total Participants"
          value={competition.participants.length}
        />
        <StatItem
          label="Start Date"
          value={new Date(competition.startDate).toLocaleDateString()}
        />
        <StatItem
          label="End Date"
          value={new Date(competition.endDate).toLocaleDateString()}
        />
        <StatItem
          label="Prize Pool"
          value={`$${competition.prizePool.toLocaleString()}`}
        />
        <StatItem
          label="Status"
          value={competition.status}
          className={
            competition.status === 'active'
              ? 'text-green-500'
              : competition.status === 'upcoming'
              ? 'text-yellow-500'
              : 'text-red-500'
          }
        />
      </div>
    </div>
  )
}

function StatItem({ label, value, className = '' }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={`font-medium ${className || 'text-white'}`}>{value}</span>
    </div>
  )
}
