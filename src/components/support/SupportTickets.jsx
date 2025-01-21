import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SupportTickets() {
  const [tickets, setTickets] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Support Tickets
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          New Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No support tickets yet</p>
          <button
            onClick={() => setIsCreating(true)}
            className="text-blue-500 hover:text-blue-400 mt-2"
          >
            Create your first ticket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {isCreating && (
          <CreateTicketModal onClose={() => setIsCreating(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function TicketCard({ ticket }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-white">{ticket.subject}</h3>
          <p className="text-sm text-gray-400 mt-1">
            Ticket #{ticket.id} • {ticket.status}
          </p>
        </div>
        <span className={`
          px-2 py-1 text-xs rounded-full
          ${ticket.status === 'open' ? 'bg-green-500/10 text-green-500' :
            ticket.status === 'closed' ? 'bg-gray-500/10 text-gray-500' :
            'bg-yellow-500/10 text-yellow-500'}
        `}>
          {ticket.status}
        </span>
      </div>
    </div>
  )
}

function CreateTicketModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-lg p-6 max-w-lg w-full"
      >
        <h3 className="text-lg font-medium text-white mb-4">
          Create Support Ticket
        </h3>
        
        {/* Add ticket creation form */}
        
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </div>
      </motion.div>
    </div>
  )
}
