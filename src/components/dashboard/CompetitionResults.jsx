export default function CompetitionResults() {
  const results = [
    { name: 'Competition Name', position: '3rd' },
    { name: 'Competition Name', position: '1st' },
    { name: 'Competition Name', position: '18th' },
    { name: 'Competition Name', position: '45th' }
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {results.map((result, index) => (
          <div 
            key={index}
            className="bg-gray-800 rounded-lg p-4"
          >
            <p className="text-gray-400">{result.name}</p>
            <p className="text-xl font-bold text-white mt-2">{result.position}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
