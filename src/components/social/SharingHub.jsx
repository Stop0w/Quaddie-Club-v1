import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SharingHub() {
  const [selectedTip, setSelectedTip] = useState(null)
  const [shareText, setShareText] = useState('')

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Share Your Tips
      </h2>

      {/* Share Creation */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <textarea
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white mb-4"
          rows={3}
        />

        {/* Tip Selection */}
        <div className="mb-4">
          <button
            onClick={() => setSelectedTip(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Attach Tip
          </button>
          {selectedTip && (
            <div className="mt-2 p-2 bg-gray-700 rounded-lg">
              <p className="text-white">Selected Tip: {selectedTip.name}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            disabled={!shareText.trim() && !selectedTip}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Share
          </button>
        </div>
      </div>

      {/* Shared Content Feed */}
      <div className="space-y-4">
        {/* Example shared content */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <img
              src="/default-avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-gray-400 mt-1">
                Great day at the races! Check out my winning picks 🏆
              </p>
              <div className="mt-2 p-2 bg-gray-700 rounded-lg">
                <p className="text-sm text-white">Attached Tip: Race 5 Winner</p>
              </div>
              <div className="flex gap-4 mt-4">
                <button className="text-gray-400 hover:text-white">
                  Like
                </button>
                <button className="text-gray-400 hover:text-white">
                  Comment
                </button>
                <button className="text-gray-400 hover:text-white">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
