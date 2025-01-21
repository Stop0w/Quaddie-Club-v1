import { motion } from 'framer-motion'

export default function AchievementsList() {
  const achievements = [
    {
      icon: '🏆',
      title: 'Best Month Ever!',
      description: 'Achieved highest ROI in October',
      date: '2023-10-31'
    },
    {
      icon: '🔥',
      title: 'Hot Streak',
      description: '5 winners in a row',
      date: '2023-11-15'
    }
    // Add more achievements
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
      
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 bg-gray-800 rounded-lg p-4"
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <h4 className="font-medium text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(achievement.date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
