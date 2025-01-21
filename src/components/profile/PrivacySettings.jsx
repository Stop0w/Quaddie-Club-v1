import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { HapticButton } from '../feedback/HapticButton'

export default function PrivacySettings({ settings }) {
  const [privacySettings, setPrivacySettings] = useState(settings)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = async () => {
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update privacy settings:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Privacy Settings</h2>
        <HapticButton
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-400"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </HapticButton>
      </div>

      <div className="space-y-6">
        {/* Leaderboard Visibility */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Show on Leaderboard</h3>
            <p className="text-sm text-gray-400">
              Display your position on public leaderboards
            </p>
          </div>
          <Switch
            checked={privacySettings.showLeaderboardPosition}
            onChange={() => setPrivacySettings(prev => ({
              ...prev,
              showLeaderboardPosition: !prev.showLeaderboardPosition
            }))}
            disabled={!isEditing}
            className={`${
              privacySettings.showLeaderboardPosition ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              privacySettings.showLeaderboardPosition ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        {/* Profile Visibility */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Profile Visibility</h3>
            <p className="text-sm text-gray-400">
              Control who can view your profile
            </p>
          </div>
          <select
            value={privacySettings.profileVisibility}
            onChange={(e) => setPrivacySettings(prev => ({
              ...prev,
              profileVisibility: e.target.value
            }))}
            disabled={!isEditing}
            className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Messaging Settings */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Message Settings</h3>
            <p className="text-sm text-gray-400">
              Control who can send you messages
            </p>
          </div>
          <select
            value={privacySettings.allowMessagesFrom}
            onChange={(e) => setPrivacySettings(prev => ({
              ...prev,
              allowMessagesFrom: e.target.value
            }))}
            disabled={!isEditing}
            className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </div>

        {/* Activity Status */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Show Activity Status</h3>
            <p className="text-sm text-gray-400">
              Display when you're online
            </p>
          </div>
          <Switch
            checked={privacySettings.showActivityStatus}
            onChange={() => setPrivacySettings(prev => ({
              ...prev,
              showActivityStatus: !prev.showActivityStatus
            }))}
            disabled={!isEditing}
            className={`${
              privacySettings.showActivityStatus ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              privacySettings.showActivityStatus ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        {isEditing && (
          <div className="flex justify-end pt-6">
            <HapticButton
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </HapticButton>
          </div>
        )}
      </div>
    </div>
  )
}
