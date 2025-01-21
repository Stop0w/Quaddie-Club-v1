import { useState } from 'react'
import { subscriptionPlans } from '../../data/dummySubscriptionPlans'

export default function SubscriptionSelector({
  selectedPlan,
  billingInterval,
  onBillingIntervalChange,
  onSelect
}) {
  // Toggle switch for billing interval
  const [isYearly, setIsYearly] = useState(billingInterval === 'yearly')

  const handleIntervalChange = () => {
    setIsYearly(!isYearly)
    onBillingIntervalChange(isYearly ? 'monthly' : 'yearly')
  }

  return (
    <div className="space-y-8">
      {/* Billing Interval Toggle */}
      <div className="flex justify-center items-center space-x-4">
        <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
          Monthly
        </span>
        <button
          onClick={handleIntervalChange}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            ${isYearly ? 'bg-blue-600' : 'bg-gray-700'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition
              ${isYearly ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
        <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>
          Yearly
        </span>
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(subscriptionPlans).map(([key, plan]) => {
          const pricing = isYearly ? plan.yearly : plan.monthly
          const isSelected = selectedPlan === key

          return (
            <div
              key={key}
              className={`
                relative rounded-lg p-6 cursor-pointer transition-all
                ${isSelected 
                  ? 'bg-gray-800 border-2 border-blue-500' 
                  : 'bg-gray-900 border border-gray-700 hover:border-gray-600'
                }
              `}
              onClick={() => onSelect(key)}
            >
              {/* Plan Name */}
              <h3 className="text-xl font-bold text-blue-500 mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  ${pricing.price}
                </span>
                <span className="text-gray-400 ml-2">
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6">
                {pricing.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {pricing.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-white">
                    <svg
                      className="h-5 w-5 text-blue-500 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Get Started Button */}
              <button
                className={`
                  w-full mt-6 py-2 px-4 rounded-md transition-colors
                  ${isSelected
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }
                `}
              >
                Get started
              </button>

              {/* Savings Badge for Yearly */}
              {isYearly && pricing.discount && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {pricing.discount}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
