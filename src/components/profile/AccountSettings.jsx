import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { HapticButton } from '../feedback/HapticButton'

export default function AccountSettings({ onDeleteAccount }) {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    try {
      // TODO: Implement password change API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setIsChangingPassword(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      setError(error.message)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>

      <div className="space-y-6">
        {/* Password Change Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Password</h3>
            <HapticButton
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-blue-500 hover:text-blue-400"
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </HapticButton>
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    currentPassword: e.target.value
                  }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    newPassword: e.target.value
                  }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex justify-end">
                <HapticButton
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Update Password
                </HapticButton>
              </div>
            </form>
          )}
        </div>

        {/* Account Actions */}
        <div className="space-y-4">
          <HapticButton
            onClick={handleLogout}
            className="w-full bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700"
          >
            Log Out
          </HapticButton>

          <HapticButton
            onClick={onDeleteAccount}
            className="w-full bg-red-600/10 text-red-500 px-6 py-3 rounded-md hover:bg-red-600/20"
          >
            Delete Account
          </HapticButton>
        </div>
      </div>
    </div>
  )
}
