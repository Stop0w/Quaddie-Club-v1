// Add to existing tipsStore.js
{
  // New state
  affectedCompetitions: [],
  showingSyncDetails: false,

  // New actions
  showSyncDetails: () => set({ showingSyncDetails: true }),
  hideSyncDetails: () => set({ showingSyncDetails: false }),

  // Update existing setSelection
  setSelection: (competitionId, raceId, horseNumber) => {
    set(state => {
      if (state.useSameSelections) {
        // Find competitions with same race
        const affected = findCompetitionsWithRace(raceId)
        state.affectedCompetitions = affected

        // Apply selection to all affected competitions
        affected.forEach(comp => {
          if (!state.selections[comp.id]) {
            state.selections[comp.id] = {}
          }
          state.selections[comp.id][raceId] = horseNumber
        })
      } else {
        if (!state.selections[competitionId]) {
          state.selections[competitionId] = {}
        }
        state.selections[competitionId][raceId] = horseNumber
      }
    })
  }
}
