import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

export function MobileForm({
  onSubmit,
  children,
  validation,
  autoComplete = true,
  keyboardType = 'default'
}) {
  const [focusedField, setFocusedField] = useState(null)
  const [errors, setErrors] = useState({})
  const haptics = useHapticFeedback()

  const handleSubmit = async (e) => {
    e.preventDefault()
    haptics.light()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    // Validate
    const validationErrors = validation?.(data) || {}
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      haptics.error()
      return
    }

    try {
      await onSubmit(data)
      haptics.success()
    } catch (error) {
      setErrors({ submit: error.message })
      haptics.error()
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="space-y-4"
      autoComplete={autoComplete ? 'on' : 'off'}
    >
      {/* Keyboard spacer when field is focused */}
      <AnimatePresence>
        {focusedField && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-black"
            style={{ height: 270 }} // Approximate keyboard height
          />
        )}
      </AnimatePresence>

      {/* Form fields with enhanced mobile handling */}
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child

        return React.cloneElement(child, {
          onFocus: () => setFocusedField(child.props.name),
          onBlur: () => setFocusedField(null),
          error: errors[child.props.name],
          inputMode: getInputMode(keyboardType),
          ...child.props
        })
      })}

      {/* General form error */}
      {errors.submit && (
        <div className="p-4 bg-red-500/10 rounded-lg">
          <p className="text-red-500 text-sm">{errors.submit}</p>
        </div>
      )}
    </form>
  )
}

export function MobileFormField({
  label,
  name,
  type = 'text',
  error,
  onFocus,
  onBlur,
  inputMode,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-2">
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-400"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          inputMode={inputMode}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-gray-800 text-white
            border ${error ? 'border-red-500' : 'border-gray-700'}
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
            transition-colors
          `}
          onFocus={(e) => {
            setIsFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            onBlur?.(e)
          }}
          {...props}
        />

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById(name)
                  input.value = ''
                  input.focus()
                }}
                className="p-2 text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
