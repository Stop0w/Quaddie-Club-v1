import { useViewport } from '../../hooks/useViewport'
import { useSafeArea } from '../../hooks/useSafeArea'

export function ResponsiveContainer({ children, className = '' }) {
  const { topInset, bottomInset } = useSafeArea()

  return (
    <div
      className={`
        w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        ${className}
      `}
      style={{
        paddingTop: topInset,
        paddingBottom: bottomInset
      }}
    >
      {children}
    </div>
  )
}

export function ResponsiveGrid({
  children,
  columns = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  },
  gap = 6,
  className = ''
}) {
  const { width } = useViewport()
  
  // Determine columns based on viewport
  const getColumns = () => {
    if (width >= 1280) return columns.xl
    if (width >= 1024) return columns.lg
    if (width >= 768) return columns.md
    return columns.sm
  }

  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${getColumns()}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  )
}

export function ResponsiveStack({
  children,
  spacing = 4,
  horizontal = false,
  wrap = false,
  className = ''
}) {
  return (
    <div
      className={`
        ${horizontal ? 'flex' : 'flex flex-col'}
        ${wrap ? 'flex-wrap' : ''}
        ${`gap-${spacing}`}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
