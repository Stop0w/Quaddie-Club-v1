import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ScoringSetup({ scoring, onScoringUpdate }) {
  const [customRule, setCustomRule] = useState({ condition: '', points: 0 })

  const scoringTypes = [
    { id: 'standard', label: 'Standard Scoring' },
    { id: 'weighted', label: 'Weighted Scoring' },
    { id: 'custom', label: 'Custom Scoring' }
  ]

  const handlePointsChange = (type, value) => {
    onScoringUpdate({
      ...scoring,
      points: {
        ...scoring.points,
        [type]: parseInt(value)
      }
    })
  }

  const addCustomRule = () => {
    if (customRule.condition && customRule.points) {
      onScoringUpdate({
        ...scoring,
        customRules: [...scoring.customRules, customRule]
      })
      setCustomRule({ condition: '', points: 0 })
    }
  }

  const removeCustomRule = (index) => {
    onScoringUpdate({
      ...scoring,
      customRules: scoring.customRules.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      {/* Scoring Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Scoring Type
        </label>
        <div className="grid grid-cols-3 gap-4">
          {scoringTypes.map(type => (
            <button
              key={type.id}
              onClick={() => onScoringUpdate({ ...scoring, type: type.id })}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${scoring.type === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Standard Points */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Win Points
          </label>
          <input
            type="number"
            value={scoring.points.win}
            onChange={(e) => handlePointsChange('win', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Place Points
          </label>
          <input
            type="number"
            value={scoring.points.place}
            onChange={(e) => handlePointsChange('place', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Custom Rules */}
      {scoring.type === 'custom' && (
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Custom Rules</h3>
          
          <div className="space-y-4">
            {/* Add New Rule */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Condition (e.g., 'Odds > 10')"
                value={customRule.condition}
                onChange={(e) => setCustomRule(prev => ({
                  ...prev,
                  condition: e.target.value
                }))}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="number"
                placeholder="Points"
                value={customRule.points}
                onChange={(e) => setCustomRule(prev => ({
                  ...prev,
                  points: parseInt(e.target.value)
                }))}
                className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <button
                onClick={addCustomRule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Rule
              </button>
            </div>

            {/* Existing Rules */}
            {scoring.customRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="text-white">{rule.condition}</p>
                  <p className="text-sm text-gray-400">{rule.points} points</p>
                </div>
                <button
                  onClick={() => removeCustomRule(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
