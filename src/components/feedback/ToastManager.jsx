import { motion, AnimatePresence } from 'framer-motion'
import { create } from 'zustand'

const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'info') => set(state => ({
    toasts: [...state.toasts, { id: Date.now(), message, type }]
  })),
  removeToast: (id) => set(state => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  }))
}))

export default function ToastManager() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              mb-2 p-4 rounded-lg shadow-lg pointer-events-auto
              ${getToastStyle(toast.type)}
            `}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function getToastStyle(type) {
  switch (type) {
    case 'success': return 'bg-green-600/90 text-white'
    case 'error': return 'bg-red-600/90 text-white'
    case 'warning': return 'bg-yellow-600/90 text-white'
    default: return 'bg-gray-900/90 text-white'
  }
}

export { useToastStore }
