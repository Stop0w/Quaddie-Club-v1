import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    venueSize: 200,
    averageSpendPerCustomer: 50,
    expectedParticipationRate: 20,
    competitionsPerMonth: 4,
    averagePrizeValue: 100
  })

  const [results, setResults] = useState(null)

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const calculateROI = () => {
    const {
      venueSize,
      averageSpendPerCustomer,
      expectedParticipationRate,
      competitionsPerMonth,
      averagePrizeValue
    } = inputs

    const monthlyParticipants = venueSize * (expectedParticipationRate / 100)
    const monthlyRevenue = monthlyParticipants * averageSpendPerCustomer
    const monthlyPrizeCost = averagePrizeValue * competitionsPerMonth
    const monthlyProfit = monthlyRevenue - monthlyPrizeCost
    const roi = (monthlyProfit / monthlyPrizeCost) * 100

    setResults({
      monthlyParticipants,
      monthlyRevenue,
      monthlyPrizeCost,
      monthlyProfit,
      roi
    })
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          ROI Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Venue Capacity"
            value={inputs.venueSize}
            onChange={(value) => setInputs(prev => ({
              ...prev,
              venueSize: value
            }))}
            unit="people"
          />

          <InputField
            label="Average Spend per Customer"
            value={inputs.averageSpendPerCustomer}
            onChange={(value) => setInputs(prev => ({
              ...prev,
              averageSpendPerCustomer: value
            }))}
            unit="$"
          />

          <InputField
            label="Expected Participation Rate"
            value={inputs.expectedParticipationRate}
            onChange={(value) => setInputs(prev => ({
              ...prev,
              expectedParticipationRate: value
            }))}
            unit="%"
          />

          <InputField
            label="Competitions per Month"
            value={inputs.competitionsPerMonth}
            onChange={(value) => setInputs(prev => ({
              ...prev,
              competitionsPerMonth: value
            }))}
          />

          <InputField
            label="Average Prize Value"
            value={inputs.averagePrizeValue}
            onChange={(value) => setInputs(prev => ({
              ...prev,
              averagePrizeValue: value
            }))}
            unit="$"
          />
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-lg p-6"
        >
          <h3 className="text-lg font-medium text-white mb-6">
            Projected Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResultCard
              label="Monthly Participants"
              value={Math.round(results.monthlyParticipants)}
              unit="people"
            />

            <ResultCard
              label="Monthly Revenue"
              value={results.monthlyRevenue.toFixed(2)}
              unit="$"
              isMonetary
            />

            <ResultCard
              label="ROI"
              value={results.roi.toFixed(1)}
              unit="%"
              isPositive={results.roi > 0}
            />
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-medium mb-2">Summary</h4>
            <p className="text-gray-400">
              Based on your inputs, implementing competitions at your venue could 
              generate an additional ${results.monthlyProfit.toFixed(2)} in 
              monthly profit, with a {results.roi.toFixed(1)}% return on 
              investment.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function InputField({ label, value, onChange, unit }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

function ResultCard({ label, value, unit, isMonetary, isPositive }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`
        text-2xl font-bold mt-1
        ${isPositive !== undefined
          ? isPositive ? 'text-green-500' : 'text-red-500'
          : 'text-white'
        }
      `}>
        {isMonetary && '$'}{value}{unit}
      </p>
    </div>
  )
}
