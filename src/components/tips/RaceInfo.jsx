export default function RaceInfo({ distance, time }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
      <p className="text-lg text-gray-300">
        Distance - {distance} | Time - {time}
      </p>
    </div>
  )
}
