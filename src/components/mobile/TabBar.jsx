import { motion } from 'framer-motion'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

export default function TabBar({ tabs, activeTab, onChange }) {
  const haptics = useHapticFeedback()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              haptics.light()
              onChange(tab.id)
            }}
            className="relative flex flex-col items-center justify-center"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-800 rounded-lg m-1"
              />
            )}
            
            <span className={`
              relative z-10 text-2xl mb-1
              ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}
            `}>
              {tab.icon}
            </span>
            
            <span className={`
              relative z-10 text-xs
              ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}
            `}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
