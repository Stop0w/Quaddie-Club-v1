import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './routes/routes'
import Navigation from './components/navigation/Navigation'
import MobileNavigation from './components/navigation/MobileNavigation'
import MobileFooter from './components/navigation/MobileFooter'
import useAuthStore from './store/authStore'

function App() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  // Don't show navigation on login and register pages
  const hideNavigation = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-black">
      {!hideNavigation && (
        <>
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </>
      )}
      
      <main className={`
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        ${!hideNavigation ? 'pt-20 lg:pt-8 pb-24 lg:pb-8' : 'py-8'}
      `}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </main>

      {!hideNavigation && isAuthenticated && <MobileFooter />}
    </div>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
