import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FriendsList() {
  const [friends, setFriends] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Friends</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Find Friends
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
      </div>

      {/* Friends List */}
      <div className="space-y-4">
        {friends.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No friends yet</p>
            <button className="text-blue-500 hover:text-blue-400 mt-2">
              Find people to follow
            </button>
          </div>
        ) : (
          friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))
        )}
      </div>
    </div>
  )
}

function FriendCard({ friend }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium text-white">{friend.name}</h3>
          <p className="text-sm text-gray-400">
            {friend.mutualFriends} mutual friends
          </p>
        </div>
      </div>
      <button className="text-blue-500 hover:text-blue-400">
        Message
      </button>
    </div>
  )
}
