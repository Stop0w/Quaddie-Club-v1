export default function RaceNavigation({ totalRaces, currentRace }) {
  const { setCurrentRace, confirmedSelections } = useTipsStore()

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalRaces }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentRace(index)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${currentRace === index 
              ? 'bg-blue-600 text-white'
              : confirmedSelections[index] 
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 text-gray-400'
            }
          `}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentRace('summary')}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${Object.keys(confirmedSelections).length === totalRaces
            ? 'bg-green-500 text-white'
            : 'bg-gray-800 text-gray-400'
          }
        `}
      >
        ✓
      </button>
    </div>
  )
}
