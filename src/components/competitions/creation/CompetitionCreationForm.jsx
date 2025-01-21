import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useCompetitionStore from '../../../store/competitionStore'
import RaceSelector from './RaceSelector'
import ScoringSetup from './ScoringSetup'
import PrivacySettings from './PrivacySettings'
import VenueSelection from './VenueSelection'

export default function CompetitionCreationForm() {
  const navigate = useNavigate()
  const { createCompetition } = useCompetitionStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'public', // public, private, venue-specific
    venue: null,
    startDate: '',
    endDate: '',
    races: [],
    scoring: {
      type: 'standard',
      points: {
        win: 3,
        place: 1
      },
      customRules: []
    },
    privacy: {
      isPrivate: false,
      requireApproval: false,
      maxParticipants: null,
      allowedVenues: []
    },
    entryFee: 0,
    prizePool: {
      type: 'fixed', // fixed, percentage
      amount: 0,
      distribution: []
    }
  })

  const steps = [
    { id: 1, title: 'Basic Info' },
    { id: 2, title: 'Race Selection' },
    { id: 3, title: 'Scoring' },
    { id: 4, title: 'Privacy & Access' },
    { id: 5, title: 'Review' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const competition = await createCompetition(formData)
      navigate(`/competitions/${competition.id}`)
    } catch (error) {
      console.error('Failed to create competition:', error)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`flex items-center ${
                currentStep >= step.id ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${currentStep >= step.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-700 text-gray-400'
                }
              `}>
                {step.id}
              </div>
              <span className="ml-2 text-sm hidden md:block">{step.title}</span>
              {step.id < steps.length && (
                <div className={`
                  w-full h-1 mx-4
                  ${currentStep > step.id ? 'bg-blue-500' : 'bg-gray-700'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Competition Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Race Selection */}
          {currentStep === 2 && (
            <RaceSelector
              selectedRaces={formData.races}
              onRaceSelect={(races) => updateFormData('races', races)}
            />
          )}

          {/* Step 3: Scoring Setup */}
          {currentStep === 3 && (
            <ScoringSetup
              scoring={formData.scoring}
              onScoringUpdate={(scoring) => updateFormData('scoring', scoring)}
            />
          )}

          {/* Step 4: Privacy Settings */}
          {currentStep === 4 && (
            <PrivacySettings
              privacy={formData.privacy}
              onPrivacyUpdate={(privacy) => updateFormData('privacy', privacy)}
            />
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Review Competition</h3>
              
              <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Basic Info</h4>
                  <p className="text-white">{formData.name}</p>
                  <p className="text-gray-400">{formData.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Dates</h4>
                  <p className="text-white">
                    {new Date(formData.startDate).toLocaleDateString()} - 
                    {new Date(formData.endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Selected Races</h4>
                  <p className="text-white">{formData.races.length} races selected</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Scoring Type</h4>
                  <p className="text-white">{formData.scoring.type}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400">Privacy</h4>
                  <p className="text-white">
                    {formData.privacy.isPrivate ? 'Private' : 'Public'} Competition
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Competition
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}
