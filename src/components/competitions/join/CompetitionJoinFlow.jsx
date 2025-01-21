import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useCompetitionStore from '../../../store/competitionStore'
import { useHapticFeedback } from '../../../hooks/useHapticFeedback'
import JoinConfirmation from './JoinConfirmation'
import PaymentStep from './PaymentStep'
import RulesAcceptance from './RulesAcceptance'

export default function CompetitionJoinFlow({ competition }) {
  const [step, setStep] = useState('confirm')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const haptics = useHapticFeedback()
  const { joinCompetition } = useCompetitionStore()

  const handleJoin = async (paymentDetails = null) => {
    try {
      haptics.light()
      await joinCompetition(competition.id, paymentDetails)
      haptics.success()
      navigate(`/competitions/${competition.id}/dashboard`)
    } catch (error) {
      haptics.error()
      setError(error.message)
    }
  }

  const steps = {
    confirm: {
      component: JoinConfirmation,
      props: {
        competition,
        onNext: () => {
          if (competition.entryFee > 0) {
            setStep('payment')
          } else {
            setStep('rules')
          }
        }
      }
    },
    payment: {
      component: PaymentStep,
      props: {
        competition,
        onNext: (paymentDetails) => {
          setStep('rules')
        },
        onBack: () => setStep('confirm')
      }
    },
    rules: {
      component: RulesAcceptance,
      props: {
        competition,
        onAccept: handleJoin,
        onBack: () => setStep(competition.entryFee > 0 ? 'payment' : 'confirm')
      }
    }
  }

  const CurrentStep = steps[step].component

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {['confirm', 'payment', 'rules'].map((stepName, index) => (
            <div 
              key={stepName}
              className={`
                flex items-center
                ${index < Object.keys(steps).indexOf(step) + 1
                  ? 'text-blue-500'
                  : 'text-gray-500'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${index < Object.keys(steps).indexOf(step) + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400'
                }
              `}>
                {index + 1}
              </div>
              {index < 2 && (
                <div className={`
                  w-full h-1 mx-2
                  ${index < Object.keys(steps).indexOf(step)
                    ? 'bg-blue-500'
                    : 'bg-gray-700'
                  }
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <CurrentStep {...steps[step].props} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
