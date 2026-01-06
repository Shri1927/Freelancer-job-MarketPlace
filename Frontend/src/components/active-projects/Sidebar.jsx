import {
  Play,
  Pause,
  Square,
  Bell,
  Clock,
  DollarSign,
  MessageSquare,
  Send,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function Sidebar({
  timerState,
  formattedTime,
  notifications,
  transactions,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
  onQuickAction
}) {
  const unreadNotifications = notifications.filter(n => !n.read)

  const getNotificationIcon = type => {
    switch (type) {
      case "deadline":
        return AlertTriangle
      case "payment":
        return DollarSign
      case "message":
        return MessageSquare
      case "approval":
        return CheckCircle2
      default:
        return Bell
    }
  }

  const getNotificationStyles = level => {
    switch (level) {
      case "urgent":
        return "border-l-blue-500 bg-blue-50"
      case "warning":
        return "border-l-gray-300 bg-white"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-300 bg-white"
    }
  }

  const totalCredits = transactions
    .filter(t => t.type === "credit")
    .reduce((a, b) => a + b.amount, 0)
  const totalPending = transactions
    .filter(t => t.type === "pending")
    .reduce((a, b) => a + b.amount, 0)
  const totalEscrow = transactions
    .filter(t => t.type === "escrow")
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className="  space-y-5">
      {/* Active Timer */}
      {timerState.projectId && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-900">Timer Active</span>
            </div>
            <Badge className="bg-green-500 text-white">Recording</Badge>
          </div>

          <p className="text-sm text-gray-600 mb-2 truncate">
            {timerState.projectTitle}
          </p>

          <div className="text-green-600 mb-4 text-center py-3 bg-white rounded-lg font-mono text-xl font-bold">
            {formattedTime}
          </div>

          <div className="flex gap-2">
            {timerState.isRunning ? (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300"
                onClick={onPauseTimer}
              >
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-green-500 text-white border-green-500 hover:bg-green-600"
                onClick={onResumeTimer}
              >
                <Play className="w-4 h-4 mr-1" />
                Resume
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300"
              onClick={onStopTimer}
            >
              <Square className="w-4 h-4 mr-1" />
              Stop
            </Button>
          </div>
        </div>
      )}


      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Notifications</span>
          </div>
          {unreadNotifications.length > 0 && (
            <Badge className="bg-red-500 text-white">{unreadNotifications.length} new</Badge>
          )}
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {notifications.slice(0, 4).map((notification) => {
            const Icon = getNotificationIcon(notification.type)
            return (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg border-l-2",
                  getNotificationStyles(notification.level)
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg flex-shrink-0",
                    notification.level === "urgent"
                      ? "bg-blue-100 text-blue-600"
                      : notification.level === "warning"
                      ? "bg-white text-black"
                      : "bg-blue-100 text-blue-600"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm truncate", !notification.read && "font-medium")}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {notification.message}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2 mt-3">
          <Button variant="ghost" size="sm" className="flex-1 text-xs text-gray-600 hover:text-gray-900">
            View All
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-xs text-gray-600 hover:text-gray-900">
            Mark Read
          </Button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">Recent Transactions</span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Credits Received</span>
            </div>
            <span className="font-semibold text-green-600">
              +${totalCredits.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <span className="font-semibold text-orange-600">
              ${totalPending.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-[#2A6BFF]" />
              <span className="text-sm text-gray-600">In Escrow</span>
            </div>
            <span className="font-semibold text-[#2A6BFF]">
              ${totalEscrow.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 text-center">
          <p className="text-xs text-gray-500">This Week</p>
          <p className="text-xl font-bold text-gray-900">
            ${(totalCredits + totalEscrow).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <p className="font-medium mb-3 text-gray-900">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-50"
            onClick={() => onQuickAction("timer")}
          >
            <Clock className="w-5 h-5 text-[#2A6BFF]" />
            <span className="text-xs text-gray-700">Quick Timer</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-50"
            onClick={() => onQuickAction("submit")}
          >
            <Send className="w-5 h-5 text-green-600" />
            <span className="text-xs text-gray-700">Submit Work</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-50"
            onClick={() => onQuickAction("message")}
          >
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <span className="text-xs text-gray-700">Message</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 flex flex-col items-center gap-2 border-gray-300 hover:bg-gray-50"
            onClick={() => onQuickAction("payment")}
          >
            <DollarSign className="w-5 h-5 text-purple-600" />
            <span className="text-xs text-gray-700">Request Pay</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
