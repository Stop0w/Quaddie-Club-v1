import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'

// Lazy load components
const HomePage = lazy(() => import('../pages/HomePage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const CompetitionsPage = lazy(() => import('../pages/CompetitionListPage'))
const CompetitionDetailsPage = lazy(() => import('../pages/CompetitionDetailsPage'))
const TipsPage = lazy(() => import('../pages/TipsDetail'))
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const PaymentPage = lazy(() => import('../pages/CheckoutPage'))
const AdminDashboard = lazy(() => import('../pages/admin/BusinessIntelligence'))
const SupportPage = lazy(() => import('../pages/SupportPage'))
const SocialPage = lazy(() => import('../pages/SocialPage'))

export const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
  },
  {
    path: '/competitions',
    element: <ProtectedRoute><CompetitionsPage /></ProtectedRoute>
  },
  {
    path: '/competitions/:competitionId',
    element: <ProtectedRoute><CompetitionDetailsPage /></ProtectedRoute>
  },
  {
    path: '/tips/:competitionId',
    element: <ProtectedRoute><TipsPage /></ProtectedRoute>
  },
  {
    path: '/leaderboard',
    element: <LeaderboardPage />
  },
  {
    path: '/profile',
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/payment',
    element: <ProtectedRoute><PaymentPage /></ProtectedRoute>
  },
  {
    path: '/management-hub/*',
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>
  },
  {
    path: '/support',
    element: <SupportPage />,
    children: [
      { path: 'faq', element: <FAQ /> },
      { path: 'contact', element: <ContactForm /> },
      { path: 'tickets', element: <SupportTickets /> }
    ]
  },
  {
    path: '/social',
    element: <ProtectedRoute><SocialPage /></ProtectedRoute>,
    children: [
      { path: 'friends', element: <FriendsList /> },
      { path: 'messages', element: <MessageCenter /> },
      { path: 'sharing', element: <SharingHub /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]
