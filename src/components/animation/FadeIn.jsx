import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function FadeIn({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '' 
}) {
  const { targetRef, hasIntersected } = useIntersectionObserver({ once: true })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0
    }
  }

  return (
    <motion.div
      ref={targetRef}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
