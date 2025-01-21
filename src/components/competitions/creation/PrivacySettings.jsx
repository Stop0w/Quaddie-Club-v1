import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PrivacySettings({ privacy, onPrivacyUpdate }) {
  const [selectedVenues, setSelectedVenues] = useState(privacy.allowedVenues)

  // Dummy venues data - replace with API call
  const availableVenues = [
    { id: 1, name: 'Venue A' },
    { id: 2, name: 'Venue B' },
    { id: 3, name: 'Venue C' },
    // Add more venues
  ]

  const toggleVenue = (venueId) => {
    const updatedVenues = selectedVenues.includes(venueId)
      ? selectedVenues.filter(id => id !== venueId)
      : [...selectedVenues, venueId]
    
    setSelectedVenues(updatedVenues)
    onPrivacyUpdate({
      ...privacy,
      allowedVenues: updatedVenues
    })
  }

  return (
    <div className="space-y-6">
      {/* Privacy Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Competition Privacy
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onPrivacyUpdate({ ...privacy, isPrivate: false })}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${!privacy.isPrivate
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }
            `}
          >
            Public Competition
          </button>
          <button
            onClick={() => onPrivacyUpdate({ ...privacy, isPrivate: true })}
            className={`
              p-4 rounded-lg text-center transition-colors
              ${privacy.isPrivate
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }
            `}
          >
            Private Competition
          </button>
        </div>
      </div>

      {/* Access Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            Require Approval to Join
          </label>
          <button
            onClick={() => onPrivacyUpdate({
              ...privacy,
              requireApproval: !privacy.requireApproval
            })}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full
              ${privacy.requireApproval ? 'bg-blue-600' : 'bg-gray-700'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition
                ${privacy.requireApproval ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Maximum Participants
          </label>
          <input
            type="number"
            value={privacy.maxParticipants || ''}
            onChange={(e) => onPrivacyUpdate({
              ...privacy,
              maxParticipants: e.target.value ? parseInt(e.target.value) : null
            })}
            placeholder="Unlimited"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Venue Restrictions */}
      {privacy.isPrivate && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Allowed Venues
          </label>
          <div className="grid grid-cols-2 gap-4">
            {availableVenues.map(venue => (
              <motion.button
                key={venue.id}
                onClick={() => toggleVenue(venue.id)}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-4 rounded-lg text-center transition-colors
                  ${selectedVenues.includes(venue.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                {venue.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
