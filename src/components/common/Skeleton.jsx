export default function Skeleton({ variant = 'default', count = 1, className = '' }) {
  const variants = {
    default: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    card: 'h-32 w-full rounded-lg',
    text: 'h-4 w-3/4'
  }

  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div
          key={i}
          className={`
            animate-pulse bg-gray-800/50 
            ${variants[variant]} 
            ${className}
          `}
        />
      ))}
    </>
  )
}
