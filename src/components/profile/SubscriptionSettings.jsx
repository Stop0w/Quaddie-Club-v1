import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { HapticButton } from '../feedback/HapticButton'

export default function SubscriptionSettings({ subscription }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card')

  const paymentMethods = [
    { id: 'credit-card', label: 'Credit Card', icon: '💳' },
    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
    { id: 'bank-transfer', label: 'Bank Transfer', icon: '🏦' }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Subscription & Billing
        </h2>
        <Link 
          to="/subscription/plans" 
          className="text-blue-500 hover:text-blue-400"
        >
          View Plans
        </Link>
      </div>

      {/* Current Plan */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">
              {subscription.plan} Plan
            </h3>
            <p className="text-gray-400 mt-1">
              Billing {subscription.interval}ly
            </p>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">
              Next billing date
            </p>
            <p className="text-gray-400">
              {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            to="/subscription/upgrade"
            className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upgrade Plan
          </Link>
          <button
            onClick={() => {/* Handle cancel */}}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Payment Methods
        </h3>

        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div 
              key={method.id}
              className={`
                flex items-center justify-between p-4 rounded-lg cursor-pointer
                ${selectedPaymentMethod === method.id 
                  ? 'bg-blue-600/10 border border-blue-500'
                  : 'bg-gray-700 hover:bg-gray-600'
                }
              `}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
                <span className="text-white">{method.label}</span>
              </div>
              <input
                type="radio"
                checked={selectedPaymentMethod === method.id}
                onChange={() => setSelectedPaymentMethod(method.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-800"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <HapticButton
            onClick={() => setShowPaymentModal(true)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Payment Method
          </HapticButton>
        </div>
      </div>

      {/* Billing History */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white mb-4">
          Billing History
        </h3>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {[/* Billing history data */].map((bill, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-white">
                    {format(new Date(bill.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    ${bill.amount}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`
                      px-2 py-1 rounded-full text-xs
                      ${bill.status === 'paid' 
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                      }
                    `}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-500 hover:text-blue-400">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
