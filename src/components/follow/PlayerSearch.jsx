export default function PlayerSearch({ value, onChange, isAuthenticated }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={isAuthenticated ? "Search players by name..." : "Search top performers..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 rounded pl-10"
      />
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
