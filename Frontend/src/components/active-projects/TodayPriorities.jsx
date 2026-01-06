import { CheckCircle2, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TodayPriorities({ priorities, onComplete, onSnooze }) {
  const getPriorityStyles = priority => {
    switch (priority) {
      case "high":
        return "border-l-danger"
      case "medium":
        return "border-l-warning"
      case "low":
        return "border-l-success"
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-full shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">Today's Priorities</h3>
          <p className="text-sm text-gray-500">
            {priorities.length} tasks need attention
          </p>
        </div>
        <Badge className="bg-red-500 text-white">
          {priorities.filter(p => p.priority === "high").length} urgent
        </Badge>
      </div>

      <div className="space-y-3">
        {priorities.map((priority) => (
          <div
            key={priority.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg bg-gray-50 border-l-4 transition-all duration-200 hover:bg-gray-100",
              getPriorityStyles(priority.priority)
            )}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-gray-900">{priority.task}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-600 truncate">
                  {priority.project}
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    priority.priority === "high"
                      ? "text-red-600"
                      : "text-gray-600"
                  )}
                >
                  {priority.dueTime}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="iconSm"
                onClick={() => onComplete(priority.id)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <CheckCircle2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="iconSm"
                onClick={() => onSnooze(priority.id)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Clock className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full mt-4 text-gray-600 hover:text-gray-900"
      >
        View All Tasks
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}
