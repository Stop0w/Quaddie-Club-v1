import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useTipsStore from '../../store/tipsStore'
import RaceProgress from './RaceProgress'
import HorseSelection from './HorseSelection'
import SelectionsSummary from './SelectionsSummary'
import ConfirmationModal from '../common/ConfirmationModal'

export default function TipsView() {
  const { competitionId } = useParams()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const {
    currentRace,
    selections,
    confirmedSelections,
    setSelection,
    confirmSelection,
    submitTips
  } = useTipsStore()

  const handleHorseSelect = (horseNumber) => {
    setSelection(competitionId, currentRace, horseNumber)
  }

  const handleConfirmSelection = () => {
    confirmSelection(competitionId, currentRace)
  }

  const handleSubmit = async () => {
    const success = await submitTips(competitionId)
    if (success) {
      setShowSuccess(true)
      setShowConfirmation(false)
    }
  }

  return (
    <div className="tips-view">
      <RaceProgress />
      
      {currentRace === 'summary' ? (
        <SelectionsSummary
          competitionId={competitionId}
          onSubmit={() => setShowConfirmation(true)}
        />
      ) : (
        <HorseSelection
          competitionId={competitionId}
          raceIndex={currentRace}
          selectedHorse={selections[competitionId]?.[currentRace]}
          onSelect={handleHorseSelect}
          onConfirm={handleConfirmSelection}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleSubmit}
        title="Confirm Selections"
        message="Are you sure you want to submit your tips?"
      />

      <ConfirmationModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success!"
        message="Your tips have been submitted successfully."
      />
    </div>
  )
}
