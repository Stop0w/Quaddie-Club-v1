import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HapticButton } from '../feedback/HapticButton'

export default function ProfileForm({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.preferences.displayName,
      timezone: user.preferences.timezone
    }
  })

  const onSubmit = async (data) => {
    try {
      await onUpdate({
        ...data,
        preferences: {
          ...user.preferences,
          displayName: data.displayName,
          timezone: data.timezone
        }
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Profile Information</h2>
        <HapticButton
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-400"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </HapticButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              First Name
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              disabled={!isEditing}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Last Name
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              disabled={!isEditing}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            disabled={!isEditing}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Display Name
          </label>
          <input
            {...register('displayName', { required: 'Display name is required' })}
            disabled={!isEditing}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
          />
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-500">{errors.displayName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Timezone
          </label>
          <select
            {...register('timezone')}
            disabled={!isEditing}
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
          >
            <option value="Australia/Sydney">Sydney</option>
            <option value="Australia/Melbourne">Melbourne</option>
            <option value="Australia/Brisbane">Brisbane</option>
            <option value="Australia/Adelaide">Adelaide</option>
            <option value="Australia/Perth">Perth</option>
          </select>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <HapticButton
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </HapticButton>
          </div>
        )}
      </form>
    </div>
  )
}
