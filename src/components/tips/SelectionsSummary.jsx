export default function SelectionsSummary({ competitionId, onSubmit }) {
  const { confirmedSelections } = useTipsStore()
  const selections = confirmedSelections[competitionId] || {}
  
  const competition = dummyCompetitions.find(c => c.id === competitionId)
  if (!competition) return null

  const isComplete = Object.keys(selections).length === competition.races.length

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-white font-bold">Selection Summary</h2>

      <div className="space-y-2">
        {competition.races.map((race, index) => {
          const horseNumber = selections[index]
          const horse = horseNumber 
            ? race.horses.find(h => h.number === horseNumber)
            : null

          return (
            <div 
              key={index}
              className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  R{index + 1}
                </div>
                {horse ? (
                  <div>
                    <p className="font-medium text-white">
                      {horse.number}. {horse.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      W: {horse.weight} | J: {horse.jockey}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">No selection</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        onClick={onSubmit}
        disabled={!isComplete}
        className="w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {isComplete ? 'Submit Selections' : 'Complete All Selections'}
      </button>
    </div>
  )
}
