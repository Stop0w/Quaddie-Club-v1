import { motion, AnimatePresence } from 'framer-motion'
import { HorseshoeIcon } from './HorseshoeIcon'

export default function AnimatedAccordion({ sections, activeSection, onToggle }) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div 
          key={section.id}
          className="bg-gray-900 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => onToggle(section.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-gray-800 transition-colors"
          >
            <span className="text-lg font-semibold">{section.title}</span>
            <motion.div
              animate={{ rotate: activeSection === section.id ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <HorseshoeIcon className="w-6 h-6 text-blue-500" />
            </motion.div>
          </button>

          <AnimatePresence>
            {activeSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 border-t border-gray-800">
                  {section.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
