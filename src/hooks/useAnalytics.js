import { useState, useCallback } from 'react'

export function useAnalytics() {
  const getFunnelData = useCallback(async (dateRange, segment) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      totalConversionRate: 2.5,
      conversionRateTrend: 0.8,
      highestDropoff: {
        stage: 'Competition Entry',
        rate: 45,
        trend: -2.3
      },
      stages: {
        visitors: {
          count: 100000,
          conversionRate: 25,
          dropoffRate: 75,
          dropoffTrend: -1.2,
          averageTime: '2m 30s',
          timeTrend: 0.5,
          returnRate: 15,
          returnTrend: 2.1,
          successRate: 25,
          successTrend: 1.8,
          dropoffPoints: [
            { reason: 'Bounce on Landing', percentage: 45 },
            { reason: 'No Competition View', percentage: 30 },
            { reason: 'Registration Abandon', percentage: 25 }
          ]
        },
        signups: {
          count: 25000,
          conversionRate: 40,
          // ... similar metrics for each stage
        },
        competition_views: {
          count: 10000,
          conversionRate: 35,
          // ...
        },
        entries: {
          count: 3500,
          conversionRate: 85,
          // ...
        },
        tips: {
          count: 2975,
          conversionRate: 15,
          // ...
        },
        conversions: {
          count: 446,
          conversionRate: null, // Final stage
          // ...
        }
      },
      optimizations: [
        {
          title: 'Simplify Registration',
          description: 'Reduce form fields to improve sign-up completion rate',
          impact: 'high',
          difficulty: 'medium'
        },
        {
          title: 'Competition Preview',
          description: 'Show more competition details before requiring sign-up',
          impact: 'medium',
          difficulty: 'easy'
        },
        {
          title: 'Guided First Entry',
          description: 'Implement an interactive guide for first-time participants',
          impact: 'high',
          difficulty: 'hard'
        }
      ]
    }
  }, [])

  return {
    getFunnelData
  }
}
