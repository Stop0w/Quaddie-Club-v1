import { motion } from 'framer-motion'

export default function FunnelChart({ data, onStageClick, selectedStage }) {
  const maxWidth = 100
  const minWidth = 20

  return (
    <div className="relative h-[500px] flex flex-col justify-between">
      {data.stages.map((stage, index) => {
        const width = maxWidth - (index * ((maxWidth - minWidth) / (data.stages.length - 1)))
        const nextWidth = maxWidth - ((index + 1) * ((maxWidth - minWidth) / (data.stages.length - 1)))
        
        return (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
            style={{ height: `${100 / data.stages.length}%` }}
          >
            <div
              className={`
                absolute left-1/2 transform -translate-x-1/2
                ${selectedStage === stage.id ? 'z-10' : 'z-0'}
              `}
              style={{ width: `${width}%` }}
            >
              <button
                onClick={() => onStageClick(stage.id)}
                className={`
                  w-full group relative
                  ${selectedStage === stage.id ? 'scale-105' : ''}
                `}
              >
                {/* Funnel Shape */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={`
                    w-full h-full transition-colors duration-200
                    ${selectedStage === stage.id
                      ? 'fill-blue-600'
                      : 'fill-gray-700 group-hover:fill-gray-600'
                    }
                  `}
                >
                  <path
                    d={`
                      M 0 0
                      L ${width} 0
                      L ${nextWidth} 100
                      L 0 100
                      Z
                    `}
                  />
                </svg>

                {/* Stage Label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-medium">
                      {stage.label}
                    </p>
                    <p className="text-sm text-gray-400">
                      {stage.count.toLocaleString()} users
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
