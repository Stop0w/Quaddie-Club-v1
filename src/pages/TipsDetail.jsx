import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TipsHeader from '../components/tips/TipsHeader'
import RaceSelector from '../components/tips/RaceSelector'
import TipsForm from '../components/tips/TipsForm'
import LeaderboardPreview from '../components/tips/LeaderboardPreview'
import { useViewport } from '../hooks/useViewport'

export default function TipsDetail() {
  const { competitionId } = useParams()
  const { isMobile } = useViewport()
  const [selectedRace, setSelectedRace] = useState(1)

  return (
    <div className="min-h-screen bg-black">
      <TipsHeader competitionId={competitionId} />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Race Selection & Tips Form */}
          <div className="lg:col-span-2 space-y-6">
            <RaceSelector 
              selectedRace={selectedRace}
              onSelectRace={setSelectedRace}
            />
            
            <TipsForm 
              competitionId={competitionId}
              raceNumber={selectedRace}
            />
          </div>

          {/* Right Column - Leaderboard & Stats */}
          {!isMobile && (
            <div className="space-y-6">
              <LeaderboardPreview competitionId={competitionId} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
