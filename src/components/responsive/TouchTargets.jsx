import { motion } from 'framer-motion'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

// Enhanced button with proper touch target size and feedback
export function TouchButton({ 
  children, 
  onClick, 
  className = '', 
  hapticFeedback = 'light',
  disabled = false,
  size = 'default' // 'small' | 'default' | 'large'
}) {
  const haptics = useHapticFeedback()

  const sizeClasses = {
    small: 'min-h-[36px] min-w-[36px] p-2',
    default: 'min-h-[44px] min-w-[44px] p-3',
    large: 'min-h-[52px] min-w-[52px] p-4'
  }

  const handleClick = (e) => {
    if (!disabled) {
      haptics[hapticFeedback]()
      onClick?.(e)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        rounded-lg
        flex items-center justify-center
        transition-colors
        active:bg-opacity-80
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        touchAction: 'manipulation'
      }}
    >
      {children}
    </motion.button>
  )
}

// Enhanced input with proper touch target size
export function TouchInput({
  type = 'text',
  value,
  onChange,
  className = '',
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    default: 'h-11 px-4',
    large: 'h-13 px-5 text-lg'
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`
        ${sizeClasses[size]}
        w-full
        rounded-lg
        bg-gray-800
        border border-gray-700
        text-white
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-colors
        ${className}
      `}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
      {...props}
    />
  )
}

// Enhanced select with proper touch target size
export function TouchSelect({
  options,
  value,
  onChange,
  className = '',
  size = 'default',
  ...props
}) {
  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    default: 'h-11 px-4',
    large: 'h-13 px-5 text-lg'
  }

  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        ${sizeClasses[size]}
        w-full
        rounded-lg
        bg-gray-800
        border border-gray-700
        text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-colors
        appearance-none
        ${className}
      `}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
