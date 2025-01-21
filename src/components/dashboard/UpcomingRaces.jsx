export default function UpcomingRaces() {
  const races = [
    {
      name: 'Winter Derby',
      date: '2023-12-01',
      time: '14:00',
      actions: ['Place Tip', 'View Race']
    },
    {
      name: 'Spring Fling',
      date: '2023-12-10',
      time: '16:00',
      actions: ['Place Tip', 'View Race']
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Upcoming Races</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="pb-4">Race</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Time</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {races.map((race, index) => (
              <tr key={index}>
                <td className="py-4 text-white">{race.name}</td>
                <td className="py-4 text-white">{race.date}</td>
                <td className="py-4 text-white">{race.time}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    {race.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
