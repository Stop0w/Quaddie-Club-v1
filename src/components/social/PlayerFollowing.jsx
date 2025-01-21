import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayerFeed from './PlayerFeed'
import FollowedPlayers from './FollowedPlayers'
import NotificationSettings from './NotificationSettings'
import { useFollowing } from '../../hooks/useFollowing'
import { useAuth } from '../../hooks/useAuth'

export default function PlayerFollowing() {
  const { user } = useAuth()
  const { followedPlayers, followPlayer, unfollowPlayer } = useFollowing()
  const [view, setView] = useState('feed')

  const isVIP = user?.subscription?.tier === 'VIP'
  const followLimit = isVIP ? Infinity : 50

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with View Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Following</h1>
          <div className="flex bg-gray-900 rounded-lg p-1">
            <ViewToggleButton
              active={view === 'feed'}
              onClick={() => setView('feed')}
            >
              Feed
            </ViewToggleButton>
            <ViewToggleButton
              active={view === 'players'}
              onClick={() => setView('players')}
            >
              Players
            </ViewToggleButton>
            <ViewToggleButton
              active={view === 'notifications'}
              onClick={() => setView('notifications')}
            >
              Notifications
            </ViewToggleButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Feed or Players List */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {view === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <PlayerFeed isVIP={isVIP} />
                </motion.div>
              )}
              {view === 'players' && (
                <motion.div
                  key="players"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <FollowedPlayers
                    players={followedPlayers}
                    onUnfollow={unfollowPlayer}
                    isVIP={isVIP}
                  />
                </motion.div>
              )}
              {view === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <NotificationSettings />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Following Suggestions & Stats */}
          <div className="space-y-6">
            <FollowingSuggestions
              onFollow={followPlayer}
              followLimit={followLimit}
              currentFollowing={followedPlayers.length}
            />
            {isVIP && <VIPInsights players={followedPlayers} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ViewToggleButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-400 hover:text-white'
        }
      `}
    >
      {children}
    </button>
  )
}
