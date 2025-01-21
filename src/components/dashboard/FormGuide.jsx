export default function FormGuide() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Form Guide</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((slot) => (
          <div 
            key={slot}
            className="bg-gray-800 rounded-lg p-4 aspect-square flex items-center justify-center"
          >
            <p className="text-gray-400">Slot {slot}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
