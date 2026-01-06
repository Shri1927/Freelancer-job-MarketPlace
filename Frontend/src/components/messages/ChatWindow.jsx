import { useState, useRef, useEffect } from "react"
import {
  Phone,
  Video,
  MoreVertical,
  Star,
  Smile,
  Paperclip,
  Camera,
  IndianRupee,
  Mic,
  Send,
  Check,
  CheckCheck,
  FileText,
  User,
  FolderOpen,
  BellOff,
  MessageCircle,
  Trash2,
  Download,
  Ban,
  Flag
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { currentUserId_export } from "@/data/mockDataa"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

export function ChatWindow({ conversation, onSendMessage }) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation?.messages])

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-secondary/20">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            Select a conversation
          </h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Choose from your existing conversations
          </p>
        </div>
      </div>
    )
  }

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(conversation.id, message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-11 w-11">
              <AvatarImage
                src={conversation.client.avatar}
                alt={conversation.client.name}
              />
              <AvatarFallback>
                {conversation.client.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {conversation.client.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-card" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{conversation.client.name}</h2>
              {conversation.client.rating > 0 && (
                <span className="flex items-center gap-0.5 text-sm text-status-favorite">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {conversation.client.rating}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {conversation.client.online
                ? "Online"
                : `Last seen: ${conversation.client.lastSeen}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Video className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Video call</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Voice call</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                View Project Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <BellOff className="h-4 w-4 mr-2" />
                Mute Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="h-4 w-4 mr-2" />
                Mark as Unread
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Ban className="h-4 w-4 mr-2" />
                Block
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-secondary/10">
        {conversation.messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === currentUserId_export}
            showAvatar={
              index === 0 ||
              conversation.messages[index - 1]?.senderId !== msg.senderId
            }
            clientAvatar={conversation.client.avatar}
            clientName={conversation.client.name}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-border bg-card">
        <div className="flex items-center gap-2 mb-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Emoji</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <Camera className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Camera</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <IndianRupee className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send payment request</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Type your message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1"
          />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 text-muted-foreground hover:text-foreground transition-all",
                  isRecording && "text-destructive animate-pulse"
                )}
                onMouseDown={() => setIsRecording(true)}
                onMouseUp={() => setIsRecording(false)}
                onMouseLeave={() => setIsRecording(false)}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hold to record voice</TooltipContent>
          </Tooltip>

          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="h-10 px-5"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  isOwn,
  showAvatar,
  clientAvatar,
  clientName
}) {
  const StatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="h-3.5 w-3.5 text-gray-300" />
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5 text-gray-50" />
      case "read":
        return <CheckCheck className="h-3.5 w-3.5 text-blue-700" />
    }
  }

  return (
    <div
      className={cn(
        "flex gap-3 animate-message-in",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isOwn && showAvatar ? (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={clientAvatar} alt={clientName} />
          <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8" />
      )}

      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5",
          isOwn
            ? "bg-accent/30 text-gray-900 rounded-tr-md"
            : "bg-message-received text-message-received-foreground rounded-tl-md"
        )}
      >
        {message.type === "file" && message.attachment && (
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg mb-2",
              isOwn ? "bg-white/10" : "bg-black/5"
            )}
          >
            <FileText className="h-8 w-8 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">
                {message.attachment.name}
              </p>
              <p className="text-xs opacity-70">{message.attachment.size}</p>
            </div>
          </div>
        )}

        {message.type === "payment" && message.paymentRequest && (
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg mb-2",
              isOwn ? "bg-white/10" : "bg-black/5"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center",
                message.paymentRequest.status === "paid"
                  ? "bg-status-online/20"
                  : "bg-status-favorite/20"
              )}
            >
              <IndianRupee className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">
                ₹{message.paymentRequest.amount.toLocaleString()}
              </p>
              <p
                className={cn(
                  "text-xs capitalize",
                  message.paymentRequest.status === "paid" &&
                    "text-status-online"
                )}
              >
                {message.paymentRequest.status}
              </p>
            </div>
          </div>
        )}

        {message.type === "text" && (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}

        <div
          className={cn(
            "flex items-center gap-1.5 mt-1.5",
            isOwn ? "justify-end" : "justify-start"
          )}
        >
          <span className="text-xs opacity-70">
            {format(message.timestamp, "h:mm a")}
          </span>
          {isOwn && <StatusIcon />}
        </div>
      </div>
    </div>
  )
}
