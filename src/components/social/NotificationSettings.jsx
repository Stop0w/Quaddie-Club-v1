import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    tips: true,
    results: true,
    achievements: true,
    competitions: true,
    comments: true
  })

  const [mutedPlayers, setMutedPlayers] = useState([])

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        {/* Global Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400">
            Notification Types
          </h3>
          
          <NotificationToggle
            label="New Tips"
            description="When followed players place new tips"
            enabled={settings.tips}
            onChange={(value) => updateSetting('tips', value)}
          />

          <NotificationToggle
            label="Results"
            description="When tips from followed players get results"
            enabled={settings.results}
            onChange={(value) => updateSetting('results', value)}
          />

          <NotificationToggle
            label="Achievements"
            description="When followed players reach milestones"
            enabled={settings.achievements}
            onChange={(value) => updateSetting('achievements', value)}
          />

          <NotificationToggle
            label="Competitions"
            description="When followed players join competitions"
            enabled={settings.competitions}
            onChange={(value) => updateSetting('competitions', value)}
          />

          <NotificationToggle
            label="Comments"
            description="When someone replies to your comments"
            enabled={settings.comments}
            onChange={(value) => updateSetting('comments', value)}
          />
        </div>

        {/* Muted Players */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">
            Muted Players
          </h3>
          
          {mutedPlayers.length > 0 ? (
            <div className="space-y-2">
              {mutedPlayers.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white">{player.name}</span>
                  </div>
                  <button
                    onClick={() => setMutedPlayers(prev => 
                      prev.filter(p => p.id !== player.id)
                    )}
                    className="text-gray-400 hover:text-white"
                  >
                    Unmute
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              No muted players
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function NotificationToggle({ label, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          ${enabled ? 'bg-blue-600' : 'bg-gray-700'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </Switch>
    </div>
  )
}
