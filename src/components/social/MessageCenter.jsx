import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MessageCenter() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation?.messages])

  return (
    <div className="flex h-[600px]">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-800 pr-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="space-y-2">
          {conversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`
                w-full p-3 rounded-lg text-left
                ${selectedConversation?.id === conversation.id
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-white">
                    {conversation.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 pl-4">
        {selectedConversation ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.avatar}
                  alt={selectedConversation.name}
                  className="w-10 h-10 rounded-full"
                />
                <h3 className="font-medium text-white">
                  {selectedConversation.name}
                </h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4">
              {selectedConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`
                    flex mb-4
                    ${msg.isSelf ? 'justify-end' : 'justify-start'}
                  `}
                >
                  <div className={`
                    max-w-[70%] rounded-lg px-4 py-2
                    ${msg.isSelf
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-white'
                    }
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
                <button
                  disabled={!message.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
