import { useState } from 'react'
import { validatePassword } from '../../utils/validation'

export default function RegistrationForm({ onSubmit, selectedPlan }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              bg-gray-700 border-gray-600 placeholder-gray-400 text-white
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors.email ? 'border-red-500' : ''}
            `}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-white">
          First name
        </label>
        <div className="mt-1">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              bg-gray-700 border-gray-600 placeholder-gray-400 text-white
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors.firstName ? 'border-red-500' : ''}
            `}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-white">
          Last name
        </label>
        <div className="mt-1">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              bg-gray-700 border-gray-600 placeholder-gray-400 text-white
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors.lastName ? 'border-red-500' : ''}
            `}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              bg-gray-700 border-gray-600 placeholder-gray-400 text-white
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors.password ? 'border-red-500' : ''}
            `}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
          Confirm password
        </label>
        <div className="mt-1">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className={`
              appearance-none block w-full px-3 py-2 border rounded-md shadow-sm
              bg-gray-700 border-gray-600 placeholder-gray-400 text-white
              focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors.confirmPassword ? 'border-red-500' : ''}
            `}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
      </div>
    </form>
  )
}
