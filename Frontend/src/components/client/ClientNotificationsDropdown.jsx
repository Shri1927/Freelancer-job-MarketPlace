import { useMemo, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const INITIAL_NOTIFICATIONS = [
  {
    id: "1",
    title: "New message from freelancer",
    timestamp: "5 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Project status updated to In Review",
    timestamp: "30 min ago",
    read: false,
  },
  {
    id: "3",
    title: "Invoice generated for \"Website Redesign\"",
    timestamp: "Yesterday",
    read: true,
  },
]

const ClientNotificationsDropdown = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  )

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={
            unreadCount > 0
              ? `${unreadCount} unread notifications`
              : "No unread notifications"
          }
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-white border border-green-200 shadow-lg"
      >
        <DropdownMenuLabel className="flex items-center justify-between text-xs font-semibold text-gray-500">
          <span>Notifications</span>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-[11px] font-medium text-green-600 hover:text-green-700"
          >
            Mark all as read
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="px-3 py-4 text-xs text-gray-500">
            You have no notifications yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onSelect={(event) => {
                event.preventDefault()
                handleNotificationClick(notification.id)
              }}
              className={`flex flex-col items-start gap-0.5 py-2.5 px-3 text-sm ${
                notification.read
                  ? "bg-white text-gray-600"
                  : "bg-green-50 text-gray-900"
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-medium truncate">
                  {notification.title}
                </span>
                {!notification.read && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-gray-500">
                {notification.timestamp}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ClientNotificationsDropdown

