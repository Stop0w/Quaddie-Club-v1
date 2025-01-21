import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(null)

  const faqItems = [
    {
      question: "How do I join a competition?",
      answer: "You can join competitions from the Competitions page. Click on a competition to view details and join if spots are available."
    },
    {
      question: "How does the points system work?",
      answer: "Points are awarded based on your horse selections and their finishing positions. Winners receive more points, with bonuses for correctly predicting multiple races."
    },
    // Add more FAQ items
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-6">
        Frequently Asked Questions
      </h2>

      {faqItems.map((item, index) => (
        <div key={index} className="border-b border-gray-800 last:border-0">
          <button
            onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
            className="w-full py-4 flex justify-between items-center text-left"
          >
            <span className="text-white font-medium">{item.question}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transform transition-transform ${
                openQuestion === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence>
            {openQuestion === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-gray-400">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
