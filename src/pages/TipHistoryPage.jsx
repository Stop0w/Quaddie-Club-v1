import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import AdminTipHistory from '../components/tips/history/AdminTipHistory'
import UserTipHistory from '../components/tips/history/UserTipHistory'
import VenueTipHistory from '../components/tips/history/VenueTipHistory'

export default function TipHistoryPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isVenueAdmin = user?.role === 'venue_admin'

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        {isAdmin ? (
          <AdminTipHistory />
        ) : isVenueAdmin ? (
          <VenueTipHistory venueId={user.venueId} />
        ) : (
          <UserTipHistory userId={user.id} />
        )}
      </div>
    </div>
  )
}
