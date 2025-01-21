import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { HapticButton } from '../feedback/HapticButton'

export default function DeleteAccountModal({ isOpen, onClose }) {
  const [confirmation, setConfirmation] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') return

    setIsDeleting(true)
    try {
      // TODO: Implement account deletion API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      await logout()
      navigate('/register')
    } catch (error) {
      console.error('Failed to delete account:', error)
    } finally {
      setIsDeleting(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">
          Delete Account
        </h3>

        <div className="space-y-4">
          <p className="text-gray-400">
            This action cannot be undone. All your data, including competition history and tips, will be permanently deleted.
          </p>

          <div className="bg-red-500/10 text-red-500 p-4 rounded-md">
            <p className="text-sm">
              Type <strong>DELETE</strong> to confirm account deletion
            </p>
          </div>

          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
            placeholder="Type DELETE to confirm"
          />

          <div className="flex justify-end space-x-4 pt-4">
            <HapticButton
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300"
            >
              Cancel
            </HapticButton>
            <HapticButton
              onClick={handleDelete}
              disabled={confirmation !== 'DELETE' || isDeleting}
              className={`
                ${confirmation === 'DELETE' && !isDeleting
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-700 cursor-not-allowed'
                }
                text-white px-6 py-2 rounded-md
              `}
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </HapticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
