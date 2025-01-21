import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PaymentStep({ competition, onNext, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      onNext({ method: paymentMethod })
    } catch (error) {
      setError('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 mb-4"
        >
          <svg 
            className="w-8 h-8 text-blue-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
            />
          </svg>
        </motion.div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Entry Fee Payment
        </h2>
        <p className="text-gray-400">
          Pay the entry fee to join the competition
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-gray-400">Entry Fee</span>
          <span className="text-2xl font-bold text-white">
            ${competition.entryFee}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          One-time payment to join {competition.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`
                p-4 rounded-lg border transition-colors
                ${paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm text-white">Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`
                p-4 rounded-lg border transition-colors
                ${paymentMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <svg className="w-6 h-6 text-white mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .633-.542h7.236c3.325 0 5.68.915 6.994 2.717 1.313 1.803 1.413 4.18.297 7.072-1.116 2.893-2.79 5.148-4.996 6.711-2.207 1.563-4.849 2.196-7.894 1.659h-.138z"/>
              </svg>
              <span className="text-sm text-white">PayPal</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('bank')}
              className={`
                p-4 rounded-lg border transition-colors
                ${paymentMethod === 'bank'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
                }
              `}
            >
              <svg className="w-6 h-6 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9-4 9 4v2H3V6zm0 12h18v2H3v-2zm0-8h18v8H3V10z" />
              </svg>
              <span className="text-sm text-white">Bank Transfer</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              'Pay Entry Fee'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
