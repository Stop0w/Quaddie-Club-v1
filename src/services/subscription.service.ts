import { ApiResponse } from '../types/auth'
import { subscriptionPlans } from '../data/dummySubscriptionPlans'

/**
 * Subscription Service
 * Handles all subscription-related operations
 * 
 * TODO: Integration Points
 * Base URL: /api/subscriptions
 * Required Headers: 
 * - Authorization: Bearer <token>
 * - Content-Type: application/json
 */
export const subscriptionService = {
  /**
   * Get available subscription plans
   * 
   * TODO: Integration Point
   * - GET /api/subscriptions/plans
   * - Response: { plans: SubscriptionPlan[] }
   */
  getPlans: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      success: true,
      data: subscriptionPlans
    }
  },

  /**
   * Update user subscription
   * 
   * TODO: Integration Point
   * - POST /api/subscriptions/update
   * - Body: { plan: string, interval: string }
   * - Response: { subscription: Subscription }
   */
  updateSubscription: async (plan: string, interval: 'monthly' | 'yearly') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      success: true,
      data: {
        plan,
        interval,
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    }
  },

  /**
   * Cancel subscription
   * 
   * TODO: Integration Point
   * - POST /api/subscriptions/cancel
   * - Response: { success: boolean, endDate: string }
   */
  cancelSubscription: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    return {
      success: true,
      data: {
        success: true,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    }
  }
}
