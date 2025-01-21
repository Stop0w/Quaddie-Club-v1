export function calculateStrikeRate(player) {
  const totalSelections = player.selections.length
  const wins = player.selections.filter(s => s.result === 'win').length
  return ((wins / totalSelections) * 100).toFixed(1)
}

export function determinePersona(player) {
  const averageOdds = player.selections.reduce((sum, s) => sum + s.odds, 0) / player.selections.length
  
  if (averageOdds <= 3.0) {
    return 'Favourite Backer'
  } else if (averageOdds >= 10.0) {
    return 'Value Backer'
  }
  
  return 'Mixed'
}

export function getPlayerStats(player, dateRange) {
  // Calculate stats based on date range
  const stats = {
    totalPoints: 0,
    strikeRate: 0,
    averageOdds: 0,
    followers: 0,
    recentForm: []
  }

  // Implementation details...

  return stats
}
