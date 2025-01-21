export default function Notifications() {
  const notifications = [
    "Hurry, tips are closing soon!",
    "You've moved up in the leaderboard!"
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div 
            key={index}
            className="bg-gray-800 rounded-lg p-4 text-white"
          >
            {notification}
          </div>
        ))}
      </div>
    </div>
  )
}
