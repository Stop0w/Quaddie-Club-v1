import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [searchHistory, setSearchHistory] = useState([])
  const debouncedQuery = useDebounce(query, 300)

  // Handle search
  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery)
      // Save to search history
      setSearchHistory(prev => {
        const newHistory = [debouncedQuery, ...prev.filter(h => h !== debouncedQuery)]
        return newHistory.slice(0, 5) // Keep last 5 searches
      })
    }
  }, [debouncedQuery])

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          placeholder="Search competitions by name, venue, or prize type..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-10"
          onMouseLeave={() => setShowHistory(false)}
        >
          {searchHistory.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(item)
                setShowHistory(false)
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
