import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import useSubscriptionStore from '../../store/subscriptionStore'

export default function SubscriptionPlans() {
  const [billingInterval, setBillingInterval] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { plans, selectPlan } = useSubscriptionStore()

  const handlePlanSelect = async (plan) => {
    setSelectedPlan(plan)
    await selectPlan(plan.id, billingInterval)
    navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan for your betting strategy. All plans include core features with additional benefits as you upgrade.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-800 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${billingInterval === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
              }
            `}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${billingInterval === 'yearly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
              }
            `}
          >
            Yearly
            <span className="ml-1 text-xs text-green-500">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              relative bg-gray-800 rounded-2xl overflow-hidden
              ${plan.recommended ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm">
                Recommended
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-400 mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">
                    ${billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingInterval === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingInterval === 'yearly' && (
                  <p className="text-green-500 text-sm mt-1">
                    Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(2)} per year
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanSelect(plan)}
                className={`
                  w-full py-3 px-4 rounded-lg font-medium transition-colors
                  ${plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                  }
                `}
              >
                {user?.subscription?.plan === plan.id
                  ? 'Current Plan'
                  : 'Select Plan'
                }
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "What's included in each plan?",
    answer: "Each plan includes core betting features, with additional benefits such as advanced analytics, priority support, and exclusive competitions as you upgrade."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. You won't be charged until the trial period ends."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for yearly subscriptions."
  }
]
