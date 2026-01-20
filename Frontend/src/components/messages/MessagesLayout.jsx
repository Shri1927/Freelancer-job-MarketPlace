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
  const [hasRealProjects, setHasRealProjects] = useState(false)

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setLoading(true)
      
      // Load projects based on user role
      let projects = []
      if (user?.role === 'freelancer') {
        const response = await fetch('http://localhost:8000/api/freelancer/projects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json',
          }
        })
        if (response.ok) {
          const data = await response.json()
          projects = data
        }
      } else if (user?.role === 'client') {
        const response = await fetch('http://localhost:8000/api/client/projects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            'Content-Type': 'application/json',
          }
        })
        if (response.ok) {
          const data = await response.json()
          projects = data
        }
      }
      
      // Transform projects into conversations format
      const conversationsData = projects.map(project => {
        // Determine who the "other person" is based on user role
        const otherPerson = user?.role === 'freelancer' 
          ? project.client 
          : project.freelancer
        
        return {
          id: project.id, // Use project ID as conversation ID
          client: {
            name: otherPerson?.name || 'Unknown User',
            avatar: null,
            online: false,
            lastSeen: 'Recently',
            rating: 0
          },
          project: project.title,
          lastMessage: "Start a conversation...",
          lastMessageTime: new Date(project.updated_at || project.created_at),
          unreadCount: 0,
          isOnline: false,
          isFavorite: false,
          isGroup: false,
          isArchived: false,
          messages: []
        }
      })
      
      setConversations(conversationsData)
      setHasRealProjects(true)
      
      // If no projects, show mock data for demo
      if (conversationsData.length === 0) {
        setConversations(mockConversations)
        setHasRealProjects(false)
        toast.info('No active projects yet. Create a project to start messaging!')
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
      toast.error('Failed to load conversations')
      setConversations(mockConversations) // Fallback to mock data
    } finally {
      setLoading(false)
    }
  }

  const selectedConversation =
    conversations.find(c => c.id === selectedConversationId) || null

  const handleSendMessage = async (conversationId, content) => {
    if (!conversationId || !content.trim()) return
    
    // Prevent sending messages to mock conversations
    if (!hasRealProjects) {
      toast.error('Cannot send messages to demo conversations. Please create a project first!')
      return
    }
    
    try {
      // Extract project ID from conversation
      const projectId = conversationId
      const response = await messagesAPI.send({
        project_id: projectId,
        message: content.trim(),
      })
      
      // Get the saved message from the backend
      const savedMessage = response.data
      
      // Update local state with the actual saved message
      const newMessage = {
        id: savedMessage.id,
        conversationId,
        senderId: savedMessage.sender_id,
        content: savedMessage.message,
        timestamp: new Date(savedMessage.created_at),
        status: "sent",
        type: "text"
      }

      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...(conv.messages || []), newMessage],
              lastMessage: content,
              lastMessageTime: new Date()
            }
          }
          return conv
        })
      )
      
      toast.success('Message sent!')
    } catch (error) {
      console.error('Error sending message:', error)
      if (error.response?.status === 404) {
        toast.error('Project not found. Please refresh and try again.')
      } else if (error.response?.status === 403) {
        toast.error('You do not have access to this project.')
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    }
  }

  const handleSelectConversation = async (id) => {
    setSelectedConversationId(id)
    
    // Load messages for this conversation (project)
    try {
      const response = await messagesAPI.getByProject(id)
      const messages = response.data || []
      
      // Transform backend messages to frontend format
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        conversationId: id,
        senderId: msg.sender_id,
        content: msg.message,
        timestamp: new Date(msg.created_at),
        status: "sent",
        type: "text"
      }))
      
      // Update conversation with loaded messages
      setConversations(prev =>
        prev.map(conv => {
          if (conv.id === id) {
            return {
              ...conv,
              messages: formattedMessages,
              unreadCount: 0,
              lastMessage: formattedMessages.length > 0 
                ? formattedMessages[formattedMessages.length - 1].content 
                : conv.lastMessage
            }
          }
          return conv
        })
      )
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error('Failed to load messages')
    }
    
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
        <div className="flex-1 flex min-w-0 flex-col">
          {!hasRealProjects && selectedConversation && (
            <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400 flex items-center justify-center gap-2">
              <span className="font-semibold">Demo Mode:</span>
              <span>This is a demo conversation. Create a project to enable messaging.</span>
            </div>
          )}
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
            {!hasRealProjects && selectedConversation && (
              <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-sm text-yellow-700 dark:text-yellow-400 flex items-center justify-center gap-2">
                <span className="font-semibold">Demo Mode:</span>
                <span>Create a project to enable messaging.</span>
              </div>
            )}
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
