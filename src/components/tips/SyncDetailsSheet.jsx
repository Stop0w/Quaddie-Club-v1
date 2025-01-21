import { useMemo } from 'react'
import useTipsStore from '../../store/tipsStore'
import BottomSheet from './BottomSheet'

export default function SyncDetailsSheet({ isOpen, onClose }) {
  const { 
    useSameSelections, 
    affectedCompetitions,
    currentRace,
    selections
  } = useTipsStore()

  const syncedSelections = useMemo(() => {
    if (!useSameSelections) return []
    
    return affectedCompetitions.map(comp => ({
      id: comp.id,
      name: comp.name,
      selection: selections[comp.id]?.[currentRace]
    }))
  }, [useSameSelections, affectedCompetitions, currentRace, selections])

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={onClose}
      snapPoints={['50%', '90%']}
    >
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-bold text-white">Synced Selections</h2>
          <p className="text-sm text-gray-400">
            Your picks will be applied to these competitions
          </p>
        </div>

        <div className="space-y-2">
          {syncedSelections.map(comp => (
            <div 
              key={comp.id}
              className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-medium">{comp.name}</h3>
                {comp.selection && (
                  <p className="text-sm text-gray-400">
                    Current pick: Horse #{comp.selection}
                  </p>
                )}
              </div>
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-800 text-white rounded-lg mt-4"
        >
          Close
        </button>
      </div>
    </BottomSheet>
  )
}
