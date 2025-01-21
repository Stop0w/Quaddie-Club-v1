export default function HorseSelection({ 
  competitionId, 
  raceIndex, 
  selectedHorse,
  onSelect,
  onConfirm 
}) {
  const race = dummyCompetitions
    .find(c => c.id === competitionId)
    ?.races[raceIndex]

  if (!race) return null

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl text-white font-bold">{race.name}</h2>
        <p className="text-gray-400">
          Distance: {race.distance} | Time: {race.time}
        </p>
      </div>

      <div className="space-y-2">
        {race.horses.map(horse => (
          <button
            key={horse.number}
            onClick={() => onSelect(horse.number)}
            className={`
              w-full p-4 rounded-lg flex items-center justify-between
              ${selectedHorse === horse.number 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                {horse.number}
              </div>
              <div className="text-left">
                <p className="font-medium">{horse.name}</p>
                <p className="text-sm text-gray-400">
                  W: {horse.weight} | J: {horse.jockey} | T: {horse.trainer}
                </p>
              </div>
            </div>
            <div className="text-xl font-bold">${horse.price.toFixed(2)}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onConfirm}
        disabled={!selectedHorse}
        className="w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        Confirm Selection
      </button>
    </div>
  )
}
