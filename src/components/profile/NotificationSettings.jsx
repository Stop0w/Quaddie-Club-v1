import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { HapticButton } from '../feedback/HapticButton'

export default function NotificationSettings({ preferences, onUpdate }) {
  const [settings, setSettings] = useState(preferences)
  const [isEditing, setIsEditing] = useState(false)

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = async () => {
    try {
      await onUpdate({
        preferences: {
          notifications: settings
        }
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update notification settings:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Notifications</h2>
        <HapticButton
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-400"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </HapticButton>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Email Notifications</h3>
            <p className="text-sm text-gray-400">
              Receive updates and alerts via email
            </p>
          </div>
          <Switch
            checked={settings.email}
            onChange={() => handleToggle('email')}
            disabled={!isEditing}
            className={`${
              settings.email ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              settings.email ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Push Notifications</h3>
            <p className="text-sm text-gray-400">
              Receive real-time alerts on your device
            </p>
          </div>
          <Switch
            checked={settings.push}
            onChange={() => handleToggle('push')}
            disabled={!isEditing}
            className={`${
              settings.push ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              settings.push ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Race Reminders</h3>
            <p className="text-sm text-gray-400">
              Get notified before races start
            </p>
          </div>
          <Switch
            checked={settings.raceReminders}
            onChange={() => handleToggle('raceReminders')}
            disabled={!isEditing}
            className={`${
              settings.raceReminders ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              settings.raceReminders ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Results Updates</h3>
            <p className="text-sm text-gray-400">
              Get notified when race results are available
            </p>
          </div>
          <Switch
            checked={settings.resultsUpdates}
            onChange={() => handleToggle('resultsUpdates')}
            disabled={!isEditing}
            className={`${
              settings.resultsUpdates ? 'bg-blue-600' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span className={`${
              settings.resultsUpdates ? 'translate-x-6' : 'translate-x-1'
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
