import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function MobileImage({
  src,
  alt,
  aspectRatio = '16/9',
  loading = 'lazy',
  onClick,
  className = ''
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div
      ref={ref}
      className={`
        relative overflow-hidden bg-gray-800
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{ aspectRatio }}
      onClick={onClick}
    >
      {/* Placeholder */}
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />

      {/* Actual Image */}
      {inView && (
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-800"
          >
            <p className="text-gray-400">Failed to load image</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MobileVideo({
  src,
  poster,
  aspectRatio = '16/9',
  autoPlay = false,
  controls = true,
  muted = true,
  loop = false,
  className = ''
}) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(false)
  const { ref: containerRef, inView } = useInView({
    threshold: 0.5
  })

  // Auto-pause when out of view
  useEffect(() => {
    if (!inView && isPlaying) {
      videoRef.current?.pause()
    }
  }, [inView, isPlaying])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-800 ${className}`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        poster={poster}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-800"
          >
            <p className="text-gray-400">Failed to load video</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
