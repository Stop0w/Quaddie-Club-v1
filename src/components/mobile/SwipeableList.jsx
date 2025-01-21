import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGestures } from '../../hooks/useGestures'

export default function SwipeableList({ items, onSwipe, threshold = 100 }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <SwipeableItem 
          key={item.id} 
          item={item}
          onSwipe={(direction) => onSwipe(item.id, direction)}
          threshold={threshold}
        />
      ))}
    </div>
  )
}

function SwipeableItem({ item, onSwipe, threshold }) {
  const [offset, setOffset] = useState(0)
  const itemRef = useRef(null)
  const gesture = useGestures(itemRef)

  useEffect(() => {
    if (Math.abs(gesture.distance) > threshold) {
      onSwipe(gesture.direction)
      setOffset(0)
    } else {
      setOffset(gesture.distance)
    }
  }, [gesture])

  return (
    <motion.div
      ref={itemRef}
      animate={{ x: offset }}
      className="bg-gray-800 rounded-lg overflow-hidden"
    >
      <div className="p-4">
        {item.content}
      </div>
    </motion.div>
  )
}
