import { useState } from 'react'

export default function LeaderboardExport({ data }) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format) => {
    setIsExporting(true)
    
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const exportData = data.map(entry => ({
        position: entry.position,
        player: entry.userDetails?.name,
        points: entry.points,
        winStreak: entry.winStreak,
        competitions: entry.competitions?.length || 0
      }))

      if (format === 'csv') {
        const csv = convertToCSV(exportData)
        downloadFile(csv, 'leaderboard.csv', 'text/csv')
      } else {
        const json = JSON.stringify(exportData, null, 2)
        downloadFile(json, 'leaderboard.json', 'application/json')
      }
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        disabled={isExporting}
        onClick={() => handleExport('csv')}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isExporting ? 'Exporting...' : 'Export CSV'}
      </button>
    </div>
  )
}

function convertToCSV(data) {
  const headers = Object.keys(data[0])
  const rows = data.map(obj => headers.map(header => obj[header]))
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
