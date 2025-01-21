import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useSubscriptionStore from '../../store/subscriptionStore'

export default function CheckoutForm() {
  const navigate = useNavigate()
  const { selectedPlan, processingPayment, processPayment } = useSubscriptionStore()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
    email: '',
    country: '',
    postalCode: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Basic validation
    const newErrors = {}
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Invalid card number'
    }
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Invalid expiry date'
    }
    if (!formData.cvc.match(/^\d{3,4}$/)) {
      newErrors.cvc = 'Invalid CVC'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await processPayment(formData)
      navigate('/subscription/success')
    } catch (error) {
      setErrors({ submit: error.message })
    }
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-gray-900 rounded-xl p-6 md:p-8">
        {/* Order Summary */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            Order Summary
          </h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium text-white">
                  {selectedPlan.name} Plan
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedPlan.interval === 'monthly' ? 'Monthly' : 'Yearly'} billing
                </p>
              </div>
              <p className="text-xl font-bold text-white">
                ${selectedPlan.price}
              </p>
            </div>
            {selectedPlan.interval === 'yearly' && (
              <p className="text-sm text-green-500">
                You save 20% with annual billing
              </p>
            )}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-white mb-4">
            Payment Method
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button
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

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {paymentMethod === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cardNumber: formatCardNumber(e.target.value)
                  }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={`
                    w-full bg-gray-800 border rounded-lg px-4 py-2 text-white
                    ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'}
                  `}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      expiryDate: formatExpiryDate(e.target.value)
                    }))}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`
                      w-full bg-gray-800 border rounded-lg px-4 py-2 text-white
                      ${errors.expiryDate ? 'border-red-500' : 'border-gray-700'}
                    `}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      cvc: e.target.value.replace(/\D/g, '').slice(0, 4)
                    }))}
                    placeholder="123"
                    maxLength="4"
                    className={`
                      w-full bg-gray-800 border rounded-lg px-4 py-2 text-white
                      ${errors.cvc ? 'border-red-500' : 'border-gray-700'}
                    `}
                  />
                  {errors.cvc && (
                    <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name on Card
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  country: e.target.value
                }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                {/* Add more countries */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  postalCode: e.target.value
                }))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={processingPayment}
            className={`
              w-full py-3 rounded-lg font-medium text-white
              ${processingPayment
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {processingPayment ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              `Pay $${selectedPlan.price}`
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
