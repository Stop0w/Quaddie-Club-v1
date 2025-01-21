import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function UserMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuthStore()

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-white gap-2"
      >
        <span>User</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded shadow-lg py-1">
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link 
            to="/settings" 
            className="block px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <button
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
