import { useState, useEffect, useRef } from 'react'
import { useViewport } from '../../hooks/useViewport'
import { motion } from 'framer-motion'

export default function ResponsiveChart({
  data,
  type = 'line',
  height = 300,
  options = {},
  interactionMode = 'pan' // 'pan' | 'pinch' | 'both'
}) {
  const chartRef = useRef(null)
  const { width, isMobile } = useViewport()
  const [chartInstance, setChartInstance] = useState(null)
  const [touchState, setTouchState] = useState({
    isPanning: false,
    isZooming: false,
    startX: 0,
    startY: 0,
    startDistance: 0
  })

  // Responsive configuration
  const responsiveConfig = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: isMobile ? 'nearest' : 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          boxWidth: isMobile ? 8 : 12,
          padding: isMobile ? 10 : 20
        }
      },
      tooltip: {
        enabled: !isMobile, // Use custom touch tooltip for mobile
        mode: 'index',
        intersect: false,
        position: 'nearest'
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 6 : 12
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: isMobile ? 6 : 8
        }
      }
    },
    ...options
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && interactionMode !== 'pinch') {
      setTouchState({
        ...touchState,
        isPanning: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY
      })
    } else if (e.touches.length === 2 && interactionMode !== 'pan') {
      const distance = getTouchDistance(e.touches)
      setTouchState({
        ...touchState,
        isZooming: true,
        startDistance: distance
      })
    }
  }

  const handleTouchMove = (e) => {
    if (!chartInstance) return

    if (touchState.isPanning && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchState.startX
      const deltaY = e.touches[0].clientY - touchState.startY

      // Update chart pan
      const options = chartInstance.options
      options.pan.enabled = true
      chartInstance.pan({ x: deltaX, y: deltaY })
    } else if (touchState.isZooming && e.touches.length === 2) {
      const currentDistance = getTouchDistance(e.touches)
      const scale = currentDistance / touchState.startDistance

      // Update chart zoom
      const options = chartInstance.options
      options.zoom.enabled = true
      chartInstance.zoom(scale)
    }
  }

  const handleTouchEnd = () => {
    setTouchState({
      isPanning: false,
      isZooming: false,
      startX: 0,
      startY: 0,
      startDistance: 0
    })
  }

  // Custom mobile tooltip
  const [tooltipState, setTooltipState] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: null
  })

  const showTooltip = (e) => {
    if (!chartInstance) return

    const element = chartInstance.getElementsAtEventForMode(
      e,
      'nearest',
      { intersect: false },
      false
    )[0]

    if (element) {
      const datasetIndex = element.datasetIndex
      const index = element.index
      
      setTooltipState({
        visible: true,
        x: element.x,
        y: element.y,
        data: {
          label: data.labels[index],
          value: data.datasets[datasetIndex].data[index],
          dataset: data.datasets[datasetIndex].label
        }
      })
    }
  }

  const hideTooltip = () => {
    setTooltipState({ ...tooltipState, visible: false })
  }

  // Chart initialization
  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    const newChart = new Chart(ctx, {
      type,
      data,
      options: responsiveConfig
    })

    setChartInstance(newChart)

    return () => {
      newChart.destroy()
    }
  }, [])

  // Update chart on resize
  useEffect(() => {
    if (chartInstance) {
      chartInstance.resize()
    }
  }, [width])

  return (
    <div className="relative" style={{ height }}>
      <canvas
        ref={chartRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={isMobile ? showTooltip : undefined}
      />

      {/* Mobile Tooltip */}
      {isMobile && tooltipState.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bg-gray-900 rounded-lg shadow-lg p-3"
          style={{
            left: tooltipState.x,
            top: tooltipState.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="text-sm font-medium text-white">
            {tooltipState.data.dataset}
          </div>
          <div className="text-xs text-gray-400">
            {tooltipState.data.label}: {tooltipState.data.value}
          </div>
        </motion.div>
      )}

      {/* Mobile Controls */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => chartInstance?.resetZoom()}
            className="p-2 bg-gray-800 rounded-full shadow-lg"
          >
            <ResetIcon />
          </button>
          <button
            onClick={() => chartInstance?.zoom(1.2)}
            className="p-2 bg-gray-800 rounded-full shadow-lg"
          >
            <ZoomInIcon />
          </button>
          <button
            onClick={() => chartInstance?.zoom(0.8)}
            className="p-2 bg-gray-800 rounded-full shadow-lg"
          >
            <ZoomOutIcon />
          </button>
        </div>
      )}
    </div>
  )
}

// Helper functions
function getTouchDistance(touches) {
  const dx = touches[1].clientX - touches[0].clientX
  const dy = touches[1].clientY - touches[0].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// Icons
function ResetIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  )
}

function ZoomInIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
    </svg>
  )
}

function ZoomOutIcon() {
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
    </svg>
  )
}
