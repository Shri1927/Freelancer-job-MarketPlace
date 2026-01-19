import { useState, useEffect } from "react"
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
import { messagesAPI } from "@/services/api"
import { useAuthStore } from "@/store/auth"
import { toast } from "sonner"

export function MessagesLayout() {
  const { user } = useAuthStore()
  const [conversations, setConversations] = useState([])
  const [selectedConversationId, setSelectedConversationId] = useState(null)
  const [mobileView, setMobileView] = useState("list")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setLoading(true)
      // Load conversations from projects
      // Note: This may need a dedicated endpoint
      const unreadCountResponse = await messagesAPI.getUnreadCount()
      // For now, use mock data but structure it for API integration
      setConversations(mockConversations)
    } catch (error) {
      console.error('Error loading conversations:', error)
      toast.error('Failed to load conversations')
      setConversations(mockConversations) // Fallback
    } finally {
      setLoading(false)
    }
  }

  const selectedConversation =
    conversations.find(c => c.id === selectedConversationId) || null

  const handleSendMessage = async (conversationId, content) => {
    if (!conversationId || !content.trim()) return
    
    try {
      // Extract project ID from conversation
      const projectId = conversationId
      await messagesAPI.send({
        project_id: projectId,
        message: content.trim(),
      })
      
      // Update local state
      const newMessage = {
        id: `m${Date.now()}`,
        conversationId,
        senderId: user?.id || currentUserId_export,
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

      // Reload messages to get updated status
      setTimeout(() => {
        loadConversations()
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
    }
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
