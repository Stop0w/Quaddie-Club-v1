import { Outlet } from 'react-router-dom'
import MobileTipsNavigation from '../navigation/MobileTipsNavigation'
import { useViewport } from '../../hooks/useViewport'

export default function TipsLayout() {
  const { isMobile } = useViewport()

  return (
    <div className="min-h-screen bg-black">
      {isMobile && <MobileTipsNavigation />}
      
      <main className={`
        ${isMobile ? 'pt-14 pb-16' : 'py-8'}
        max-w-7xl mx-auto px-4
      `}>
        <Outlet />
      </main>
    </div>
  )
}
