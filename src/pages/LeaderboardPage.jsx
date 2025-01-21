import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import PublicLeaderboard from '../components/leaderboard/PublicLeaderboard'
import AuthenticatedLeaderboard from '../components/leaderboard/AuthenticatedLeaderboard'

export default function LeaderboardPage() {
  const { isAuthenticated } = useAuthStore()
  
  return isAuthenticated ? <AuthenticatedLeaderboard /> : <PublicLeaderboard />
}
