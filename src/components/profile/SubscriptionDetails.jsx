import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { HapticButton } from '../feedback/HapticButton'

export default function SubscriptionDetails({ subscription }) {
  const [showCancelModal, setShowCancelModal] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Subscription</h2>
        <Link 
          to="/subscription/upgrade"
          className="text-blue-500 hover:text-blue-400"
        >
          Upgrade Plan
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
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

        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-400 mb-2">
            Features included in your plan:
          </h4>
          <ul className="space-y-2">
            {subscription.features.map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <svg 
                  className="w-5 h-5 text-green-500 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <HapticButton
            onClick={() => setShowCancelModal(true)}
            className="text-red-500 hover:text-red-400"
          >
            Cancel Subscription
          </HapticButton>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Cancel Subscription
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </p>
            <div className="flex justify-end space-x-4">
              <HapticButton
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                Keep Subscription
              </HapticButton>
              <HapticButton
                onClick={() => {
                  // Handle cancellation
                  setShowCancelModal(false)
                }}
                className="text-red-500 hover:text-red-400"
              >
                Cancel Subscription
              </HapticButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
