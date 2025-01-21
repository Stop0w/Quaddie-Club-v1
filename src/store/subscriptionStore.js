import { create } from 'zustand'

const useSubscriptionStore = create((set, get) => ({
  // State
  plans: [
    {
      id: 'maiden',
      name: 'Maiden',
      description: 'Perfect for getting started with racing tips',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        'Access to basic competitions',
        'Standard tips interface',
        'Basic analytics',
        'Email support'
      ],
      recommended: false
    },
    {
      id: 'benchmark',
      name: 'Benchmark',
      description: 'Advanced features for serious players',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'All Maiden features',
        'Advanced analytics',
        'Priority support',
        'Custom competitions',
        'Real-time updates'
      ],
      recommended: true
    },
    {
      id: 'group',
      name: 'Group 1',
      description: 'Ultimate package for professionals',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: [
        'All Benchmark features',
        'VIP competitions',
        'Premium analytics',
        '24/7 priority support',
        'Custom API access',
        'White-label options'
      ],
      recommended: false
    }
  ],
  selectedPlan: null,
  processingPayment: false,
  error: null,

  // Actions
  selectPlan: (planId, interval) => {
    const plan = get().plans.find(p => p.id === planId)
    if (!plan) return

    set({
      selectedPlan: {
        ...plan,
        interval,
        price: interval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
      }
    })
  },

  processPayment: async (paymentDetails) => {
    const { selectedPlan } = get()
    if (!selectedPlan) throw new Error('No plan selected')

    set({ processingPayment: true, error: null })

    try {
      // TODO: Replace with actual payment processing API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate successful payment
      const subscription = {
        id: `sub_${Date.now()}`,
        planId: selectedPlan.id,
        interval: selectedPlan.interval,
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      }

      set({
        processingPayment: false,
        selectedPlan: null
      })

      return subscription
    } catch (error) {
      set({
        processingPayment: false,
        error: error.message
      })
      throw error
    }
  },

  cancelSubscription: async () => {
    set({ processingPayment: true, error: null })

    try {
      // TODO: Replace with actual cancellation API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      set({ processingPayment: false })
      return true
    } catch (error) {
      set({
        processingPayment: false,
        error: error.message
      })
      throw error
    }
  },

  clearError: () => set({ error: null })
}))

export default useSubscriptionStore
