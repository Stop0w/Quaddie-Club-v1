import { useHapticFeedback } from '../../hooks/useHapticFeedback'

export default function HapticButton({ 
  children, 
  onClick, 
  feedback = 'light',
  className = '',
  ...props 
}) {
  const haptics = useHapticFeedback()

  const handleClick = (e) => {
    haptics[feedback]()
    onClick?.(e)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        relative active:scale-95 transition-transform
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
