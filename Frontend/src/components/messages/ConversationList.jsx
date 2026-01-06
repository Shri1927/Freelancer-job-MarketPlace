import { useState } from "react"
import {
  Search,
  X,
  Star,
  Users,
  Archive,
  MessageCircle,
  Inbox
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const filterTabs = [
  { id: "all", label: "All", icon: Inbox },
  { id: "unread", label: "Unread", icon: MessageCircle },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "groups", label: "Groups", icon: Users },
  { id: "archived", label: "Archived", icon: Archive }
]

export function ConversationList({ conversations, selectedId, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredConversations = conversations.filter(conv => {
    // Search filter
    const matchesSearch =
      conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    // Tab filter
    switch (activeFilter) {
      case "unread":
        return conv.unreadCount > 0
      case "favorites":
        return conv.isFavorite
      case "groups":
        return conv.isGroup
      case "archived":
        return conv.isArchived
      default:
        return !conv.isArchived
    }
  })

  const getCounts = () => ({
    all: conversations.filter(c => !c.isArchived).length,
    unread: conversations.filter(c => c.unreadCount > 0).length,
    favorites: conversations.filter(c => c.isFavorite).length,
    groups: conversations.filter(c => c.isGroup).length,
    archived: conversations.filter(c => c.isArchived).length
  })

  const counts = getCounts()

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 bg-secondary/50 border-0 focus-visible:ring-1"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-2 border-b border-border overflow-x-auto scrollbar-thin">
        {filterTabs.map(tab => {
          const count = counts[tab.id]
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeFilter === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                    activeFilter === tab.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : tab.id === "unread"
                      ? "bg-red-500 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <MessageCircle className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedId === conversation.id}
              onClick={() => onSelect(conversation.id)}
            />
          ))
        )}
      </div>

      {/* User Status */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Your Status</p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <button className="text-xs text-primary hover:underline">Edit</button>
        </div>
      </div>
    </div>
  )
}

function ConversationItem({ conversation, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 flex gap-3 text-left transition-all hover:bg-accent/20",
        isSelected && "bg-accent/30"
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={conversation.client.avatar}
            alt={conversation.client.name}
          />
          <AvatarFallback>{conversation.client.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.client.online && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-primary border-2 border-card" />
        )}
        {conversation.isGroup && (
          <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
            <Users className="h-3 w-3 text-primary-foreground" />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-semibold truncate flex items-center gap-1.5">
            {conversation.client.name}
            {conversation.isFavorite && (
              <Star className="h-3.5 w-3.5 fill-status-favorite text-status-favorite" />
            )}
          </span>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatDistanceToNow(conversation.lastMessageTime, {
              addSuffix: false
            })}
          </span>
        </div>

        <p className="text-sm text-muted-foreground truncate mb-1.5">
          {conversation.lastMessage}
        </p>

        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-xs font-normal truncate max-w-[140px]"
          >
            📋 {conversation.project}
          </Badge>
          {conversation.unreadCount > 0 && (
            <span className="flex-shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
