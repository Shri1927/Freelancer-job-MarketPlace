import { useState } from "react"
import {
  Clock,
  MessageSquare,
  Play,
  Pause,
  MoreHorizontal,
  Calendar,
  DollarSign,
  ChevronRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function ProjectCard({
  project,
  isTimerActive,
  onStartTimer,
  onPauseTimer,
  onViewDetails,
  timerElapsed
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getDeadlineStatus = () => {
    const deadline = new Date(project.deadline)
    const today = new Date()
    const diffDays = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diffDays < 0) return { text: "Overdue", variant: "danger" }
    if (diffDays === 0) return { text: "Due Today", variant: "danger" }
    if (diffDays <= 3) return { text: `${diffDays}d left`, variant: "warning" }
    return { text: `${diffDays}d left`, variant: "default" }
  }

  const getStatusBadge = () => {
    switch (project.status) {
      case "in-progress":
        return <Badge variant="inProgress">In Progress</Badge>
      case "pending-review":
        return <Badge variant="pendingReview">Pending Review</Badge>
      case "completed":
        return <Badge variant="completed">Completed</Badge>
      case "on-hold":
        return <Badge variant="onHold">On Hold</Badge>
    }
  }

  const getHealthBadge = () => {
    switch (project.healthStatus) {
      case "on-track":
        return (
          <Badge variant="onTrack" className="gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success" /> On Track
          </Badge>
        )
      case "needs-attention":
        return (
          <Badge variant="needsAttention" className="gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" /> Needs
            Attention
          </Badge>
        )
      case "at-risk":
        return (
          <Badge variant="atRisk" className="gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />{" "}
            At Risk
          </Badge>
        )
    }
  }

  const deadlineStatus = getDeadlineStatus()
  const pendingAmount = project.budget - project.paid

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-gray-200">
              <AvatarImage
                src={project.client.avatar}
                alt={project.client.name}
              />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {project.client.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-600">
                {project.client.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="text-yellow-500">★</span>
                <span>{project.client.rating}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="iconSm"
            onClick={e => {
              e.stopPropagation()
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-gray-900">
          {project.title}
        </h3>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {getStatusBadge()}
          {getHealthBadge()}
          <Badge
            variant={
              deadlineStatus.variant === "danger"
                ? "danger"
                : deadlineStatus.variant === "warning"
                ? "warning"
                : "secondary"
            }
          >
            <Calendar className="w-3 h-3 mr-1" />
            {deadlineStatus.text}
          </Badge>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs text-gray-600">
              +{project.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all",
              project.progress >= 75
                ? "bg-green-500"
                : project.progress >= 50
                ? "bg-[#2A6BFF]"
                : "bg-orange-500"
            )}
            style={{ width: `${project.progress}%` }}
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{project.hoursSpent}h</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">
              {project.hoursEstimated}h
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-green-600 font-medium">
              ${project.paid.toLocaleString()}
            </span>
            {pendingAmount > 0 && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">
                  ${project.budget.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isTimerActive ? (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  onPauseTimer()
                }}
                className="gap-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <Pause className="w-3.5 h-3.5" />
                <span className="font-mono text-xs">{timerElapsed}</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  onStartTimer()
                }}
                className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start Timer</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
              }}
              className="gap-1.5 text-gray-600 hover:text-gray-900"
            >
              <MessageSquare className="w-4 h-4" />
              {project.unreadMessages > 0 && (
                <span className="bg-[#2A6BFF] text-white rounded-full px-1.5 text-xs font-medium">
                  {project.unreadMessages}
                </span>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Active {project.lastActivity}</span>
            <ChevronRight
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isHovered && "translate-x-1"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
