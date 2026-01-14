import { useState } from "react"
import { ConversationList } from "./ConversationList"
import { ChatWindow } from "./ChatWindow"
import { CallsHistory } from "./CallsHistory"
import {
  mockConversations,
  mockCalls,
  currentUserId_export
} from "@/data/mockDataa"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MessagesLayout() {
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversationId, setSelectedConversationId] = useState("1")
  const [mobileView, setMobileView] = useState("list")

  const selectedConversation =
    conversations.find(c => c.id === selectedConversationId) || null

  const handleSendMessage = (conversationId, content) => {
    const newMessage = {
      id: `m${Date.now()}`,
      conversationId,
      senderId: currentUserId_export,
      content,
      timestamp: new Date(),
      status: "sent",
      type: "text"
    }

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: content,
            lastMessageTime: new Date()
          }
        }
        return conv
      })
    )

    // Simulate message delivery after 1 second
    setTimeout(() => {
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
              )
            }
          }
          return conv
        })
      )
    }, 1000)

    // Simulate message read after 3 seconds
    setTimeout(() => {
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === newMessage.id ? { ...msg, status: "read" } : msg
              )
            }
          }
          return conv
        })
      )
    }, 3000)
  }

  const handleSelectConversation = id => {
    setSelectedConversationId(id)
    // Clear unread count
    setConversations(prev =>
      prev.map(conv => (conv.id === id ? { ...conv, unreadCount: 0 } : conv))
    )
    // On mobile, switch to chat view
    setMobileView("chat")
  }

  return (
    <div className="p-6 flex flex-col bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <h1 className="font-bold text-lg">Messages</h1>
        <div className="flex gap-2">
          <Button
            variant={mobileView === "list" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setMobileView("list")}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant={mobileView === "calls" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setMobileView("calls")}
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 overflow-hidden">
        {/* Left Panel - Conversations */}
        <div className="w-[320px] xl:w-[360px] flex-shrink-0">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId}
            onSelect={handleSelectConversation}
          />
        </div>

        {/* Center Panel - Chat */}
        <div className="flex-1 flex min-w-0">
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Right Panel - Calls (Collapsible) */}
       
        
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 overflow-hidden">
        {mobileView === "list" && (
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId}
            onSelect={handleSelectConversation}
          />
        )}
        {mobileView === "chat" && (
          <div className="h-full flex flex-col">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileView("list")}
              className="self-start m-2"
            >
              ← Back to chats
            </Button>
            <div className="flex-1 overflow-hidden">
              <ChatWindow
                conversation={selectedConversation}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        )}
        {mobileView === "calls" && <CallsHistory calls={mockCalls} />}
      </div>
    </div>
  )
}
