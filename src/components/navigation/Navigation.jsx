import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import UserMenuDropdown from './UserMenuDropdown'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const UnauthenticatedMenuItems = () => (
    <div className="menu-items">
      <Link to="/free-tips" className="nav-link">Free Tips</Link>
      <Link to="/how-it-works" className="nav-link">How It Works</Link>
      <Link to="/leaderboard-preview" className="nav-link">Leaderboard Preview</Link>
      <Link to="/demo-competition" className="nav-link">Demo Competition</Link>
    </div>
  )

  const AuthenticatedMenuItems = () => (
    <div className="menu-items">
      <Link to="/form-guide" className="nav-link">Form Guide</Link>
      <Link to="/mailbag" className="nav-link">Mailbag</Link>
    </div>
  )

  const MobileMenuItems = () => (
    <div className="mobile-menu-items">
      {isAuthenticated ? (
        <>
          <Link to="/form-guide" onClick={() => setIsMobileMenuOpen(false)}>Form Guide</Link>
          <Link to="/competitions" onClick={() => setIsMobileMenuOpen(false)}>Competitions</Link>
          <Link to="/tips" onClick={() => setIsMobileMenuOpen(false)}>Tips</Link>
          <Link to="/mailbag" onClick={() => setIsMobileMenuOpen(false)}>Mailbag</Link>
          <Link to="/more" onClick={() => setIsMobileMenuOpen(false)}>More</Link>
        </>
      ) : (
        <>
          <Link to="/free-tips" onClick={() => setIsMobileMenuOpen(false)}>Free Tips</Link>
          <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
          <Link to="/leaderboard-preview" onClick={() => setIsMobileMenuOpen(false)}>Leaderboard Preview</Link>
          <Link to="/demo-competition" onClick={() => setIsMobileMenuOpen(false)}>Demo Competition</Link>
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
        </>
      )}
    </div>
  )

  return (
    <nav className="navigation bg-black">
      <div className="nav-left">
        <Link to="/">
          <img src="/qc-logo-white.svg" alt="Quaddie Club Logo" className="logo" />
        </Link>
        {!isMobile && (
          <div className="desktop-menu">
            {isAuthenticated ? <AuthenticatedMenuItems /> : <UnauthenticatedMenuItems />}
          </div>
        )}
      </div>
      <div className="nav-right">
        {!isMobile && (
          <>
            {isAuthenticated ? (
              <>
                <Link to="/create-competition" className="create-comp-button">
                  Create Comp
                </Link>
                <UserMenuDropdown />
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </>
            )}
          </>
        )}
        {isMobile && (
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </div>
      {isMobile && isMobileMenuOpen && <MobileMenuItems />}
    </nav>
  )
}
