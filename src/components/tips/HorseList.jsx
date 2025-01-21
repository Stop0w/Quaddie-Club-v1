export default function HorseList({ 
  competitionId, 
  raceIndex, 
  selectedHorse, 
  onSelect,
  isMobile 
}) {
  return (
    <div className="space-y-2">
      {race.horses.map(horse => (
        <button
          key={horse.number}
          onClick={() => onSelect(horse.number)}
          className={`
            w-full p-4 rounded-lg flex items-center justify-between
            transition-colors duration-200
            ${selectedHorse === horse.number 
              ? 'bg-blue-600' 
              : 'bg-gray-800 hover:bg-gray-700'
            }
          `}
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              {horse.number}
            </div>
            <div className="text-left">
              <div className="font-medium">{horse.name}</div>
              {isMobile ? (
                <div className="text-xs text-gray-400">
                  {horse.jockey} • ${horse.price.toFixed(2)}
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  W: {horse.weight} | J: {horse.jockey} | T: {horse.trainer}
                </div>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className="text-xl font-bold text-blue-400">
              ${horse.price.toFixed(2)}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
