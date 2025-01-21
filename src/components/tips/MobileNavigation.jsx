export default function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black border-t border-gray-800">
      <div className="grid grid-cols-5 h-full">
        <NavItem icon="🏠" label="Dashboard" href="/dashboard" />
        <NavItem icon="🏆" label="Competitions" href="/competitions" />
        <NavItem icon="📝" label="Tips" href="/tips" />
        <NavItem icon="⚙️" label="Management" href="/management" />
        <NavItem icon="👤" label="Profile" href="/profile" />
      </div>
    </nav>
  )
}

function NavItem({ icon, label, href }) {
  const isActive = useLocation().pathname === href

  return (
    <Link 
      to={href}
      className={`
        flex flex-col items-center justify-center
        ${isActive ? 'text-blue-500' : 'text-gray-400'}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  )
}
