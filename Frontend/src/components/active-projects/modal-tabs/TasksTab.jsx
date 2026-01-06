import { useState } from "react"
import {
  CheckCircle2,
  Circle,
  Clock,
  Plus,
  GripVertical,
  Calendar,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function TasksTab({ project }) {
  const [tasks, setTasks] = useState(project.tasks)

  const toggleTaskStatus = taskId => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          const statuses = ["pending", "in-progress", "completed"]
          const currentIndex = statuses.indexOf(task.status)
          const nextIndex = (currentIndex + 1) % statuses.length
          return { ...task, status: statuses[nextIndex] }
        }
        return task
      })
    )
  }

  const getStatusIcon = status => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-success" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-[#2A6BFF] animate-pulse" />
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getPriorityBadge = priority => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="danger" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="warning" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="success" className="text-xs">
            Low
          </Badge>
        )
    }
  }

  const completedCount = tasks.filter(t => t.status === "completed").length
  const progressPercentage = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="p-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Project Tasks</h3>
          <p className="text-sm text-gray-600">
            {completedCount} of {tasks.length} tasks completed
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 text-center mt-1">
              {progressPercentage}%
            </p>
          </div>
          <Button size="sm" className="bg-[#2A6BFF] text-white hover:bg-[#1e5ae6]">
            <Plus className="w-4 h-4 mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mb-8">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#2A6BFF]" />
          Project Requirements
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {project.requirements.map((req, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-[#2A6BFF]/20 animate-fade-in",
              task.status === "completed"
                ? "bg-muted/30 border-border/50"
                : "bg-white border-gray-200"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />

            <button
              onClick={() => toggleTaskStatus(task.id)}
              className="flex-shrink-0 hover:scale-110 transition-transform"
            >
              {getStatusIcon(task.status)}
            </button>

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-medium",
                  task.status === "completed" &&
                    "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </p>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  <span>Due {task.dueDate}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {getPriorityBadge(task.priority)}
              <Badge
                variant={
                  task.status === "completed"
                    ? "completed"
                    : task.status === "in-progress"
                    ? "inProgress"
                    : "secondary"
                }
              >
                {task.status.replace("-", " ")}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Deliverables Section */}
      <div className="mt-8">
        <h4 className="font-medium mb-3">Expected Deliverables</h4>
        <div className="grid grid-cols-2 gap-3">
          {project.deliverables.map((del, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-lg border border-border/50 text-sm"
            >
              <div className="w-6 h-6 rounded-full bg-[#2A6BFF]/10 text-[#2A6BFF] flex items-center justify-center text-xs font-medium">
                {i + 1}
              </div>
              <span>{del}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
