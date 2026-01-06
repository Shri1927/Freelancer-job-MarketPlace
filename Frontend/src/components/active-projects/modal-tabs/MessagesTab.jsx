import { useState } from "react"
import {
  Send,
  Paperclip,
  Image,
  Mic,
  MoreHorizontal,
  Check,
  CheckCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const quickReplies = [
  "Thanks for the update!",
  "I'll get back to you shortly.",
  "Could you provide more details?",
  "Work is in progress."
]

export function MessagesTab({ project }) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(project.messages)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "freelancer",
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    })
  }

  const formatDate = timestamp => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <div className="flex flex-col h-[500px]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-gray-200">
            <AvatarImage src={project.client.avatar} />
            <AvatarFallback className="bg-gray-100 text-gray-600">{project.client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{project.client.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Online • Response time: {project.client.responseTime}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-500">{date}</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            <div className="space-y-4">
              {msgs.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === "freelancer" ? "flex-row-reverse" : ""
                  )}
                >
                  {message.sender === "client" && (
                    <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-gray-200">
                      <AvatarImage src={project.client.avatar} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        {project.client.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      message.sender === "freelancer"
                        ? "bg-[#2A6BFF] text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={cn(
                        "flex items-center gap-1 mt-1 text-xs",
                        message.sender === "freelancer"
                          ? "text-blue-100 justify-end"
                          : "text-gray-500"
                      )}
                    >
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === "freelancer" &&
                        (message.read ? (
                          <CheckCheck className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No messages yet</p>
            <p className="text-sm text-gray-500">
              Start a conversation with your client
            </p>
          </div>
        )}
      </div>

      {/* Quick Replies */}
      <div className="px-6 py-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
          {quickReplies.map(reply => (
            <button
              key={reply}
              onClick={() => setNewMessage(reply)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Image className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Type a message..."
              className="w-full resize-none min-h-[44px] max-h-[120px] pr-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent"
              rows={1}
            />
          </div>

          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="h-11 bg-[#2A6BFF] text-white hover:bg-[#1e5ae6]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
