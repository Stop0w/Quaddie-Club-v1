import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import MobileNavigation from '../components/navigation/MobileNavigation'
import { useViewport } from '../hooks/useViewport'

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isMobile } = useViewport()

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}

      {/* Main Content */}
      <main className={`
        transition-all duration-200
        ${!isMobile && isSidebarOpen ? 'ml-64' : 'ml-0'}
      `}>
        <Outlet />
      </main>
    </div>
  )
}
