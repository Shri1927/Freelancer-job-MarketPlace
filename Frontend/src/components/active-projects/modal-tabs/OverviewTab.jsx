import {
  Play,
  Pause,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  Star,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function OverviewTab({
  project,
  isTimerActive,
  timerElapsed,
  onStartTimer,
  onPauseTimer
}) {
  const paidPercentage = Math.round((project.paid / project.budget) * 100)
  const hoursPercentage = Math.round(
    (project.hoursSpent / project.hoursEstimated) * 100
  )

  const nextTask = project.tasks.find(t => t.status !== "completed")

  return (
    <div className="p-6 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-[#2A6BFF]">{project.progress}%</p>
          <p className="text-sm text-gray-600">Progress</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">{project.hoursSpent}h</p>
          <p className="text-sm text-gray-600">
            of {project.hoursEstimated}h
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-green-600">
            ${project.paid.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            of ${project.budget.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-2xl font-bold text-gray-900">
            ${Math.round(project.paid / project.hoursSpent)}
          </p>
          <p className="text-sm text-gray-600">Hourly Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Project Details */}
        <div className="col-span-2 space-y-6">
          {/* Next Action */}
          {nextTask && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Next Action Required
                  </p>
                  <p className="font-semibold text-gray-900">{nextTask.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Due: {nextTask.dueDate}
                  </p>
                </div>
                <Button className="bg-[#2A6BFF] text-white hover:bg-[#1e5ae6]">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              </div>
            </div>
          )}

          {/* Time Tracker */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Time Tracker
                </p>
                {isTimerActive ? (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-green-600 font-mono text-lg font-semibold">
                      {timerElapsed}
                    </span>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-gray-900">Not tracking</p>
                )}
              </div>
              {isTimerActive ? (
                <Button variant="outline" onClick={onPauseTimer} className="border-gray-300">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause Timer
                </Button>
              ) : (
                <Button onClick={onStartTimer} className="bg-white text-black border-gray-300 hover:bg-green-600 hover:text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Timer
                </Button>
              )}
            </div>

            {/* Hours Progress */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Hours Used</span>
                <span className="font-medium text-gray-900">
                  {project.hoursSpent}h / {project.hoursEstimated}h
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full",
                    hoursPercentage > 100
                      ? "bg-red-500"
                      : hoursPercentage > 80
                      ? "bg-orange-500"
                      : "bg-[#2A6BFF]"
                  )}
                  style={{ width: `${Math.min(hoursPercentage, 100)}%` }}
                />
              </div>
              {hoursPercentage > 80 && (
                <p className={cn("text-xs mt-2 flex items-center gap-1", hoursPercentage > 100 ? "text-red-600" : "text-orange-600")}>
                  <AlertCircle className="w-3 h-3" />
                  {hoursPercentage > 100
                    ? "Exceeding estimated hours"
                    : "Approaching hour limit"}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-900">Project Description</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Requirements</h4>
            <ul className="space-y-2">
              {project.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Deliverables</h4>
            <ul className="space-y-2">
              {project.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Send className="w-4 h-4 text-[#2A6BFF] mt-0.5 flex-shrink-0" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-900">Skills Required</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <Badge key={skill} className="bg-gray-100 text-gray-700 border-gray-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Client & Payment */}
        <div className="space-y-6">
          {/* Client Info */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white">
            <h4 className="font-semibold mb-4 text-gray-900">About Client</h4>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-12 h-12 border-2 border-gray-200">
                <AvatarImage src={project.client.avatar} />
                <AvatarFallback className="bg-gray-100 text-gray-600">
                  {project.client.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{project.client.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{project.client.rating}/5</span>
                  <span className="text-gray-400">•</span>
                  <span>{project.client.totalProjects} projects</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{project.client.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Response: {project.client.responseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Member since {project.client.memberSince}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 border-gray-300">
              View Full Profile
            </Button>
          </div>

          {/* Payment Status */}
          <div className="p-4 rounded-xl border border-gray-200 bg-white">
            <h4 className="font-semibold mb-4 text-gray-900">Payment Status</h4>

            <div className="space-y-4">
              {project.milestones.map((milestone, i) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        milestone.status === "paid"
                          ? "bg-green-500"
                          : milestone.status === "in-escrow"
                          ? "bg-[#2A6BFF]"
                          : milestone.status === "requested"
                          ? "bg-orange-500"
                          : "bg-gray-300"
                      )}
                    />
                    <span className="truncate max-w-[120px] text-gray-700">
                      {milestone.title}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${milestone.amount}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {milestone.status.replace("-", " ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Total Budget</span>
                <span className="font-semibold text-gray-900">
                  ${project.budget.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${paidPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                ${project.paid.toLocaleString()} paid • $
                {(project.budget - project.paid).toLocaleString()} remaining
              </p>
            </div>
          </div>

          {/* Recent Messages Preview */}
          {project.messages.length > 0 && (
            <div className="p-4 rounded-xl border border-gray-200 bg-white">
              <h4 className="font-semibold mb-3 text-gray-900">Recent Messages</h4>
              <div className="space-y-3">
                {project.messages.slice(-2).map(msg => (
                  <div key={msg.id} className="text-sm">
                    <p className="text-xs text-gray-500 mb-1">
                      {msg.sender === "client" ? project.client.name : "You"}
                    </p>
                    <p className="text-gray-600 line-clamp-2">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-3 border-gray-300" size="sm">
                View All Messages
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button className="flex-1 bg-[#2A6BFF] text-white hover:bg-[#1e5ae6]">
          <Send className="w-4 h-4 mr-2" />
          Submit Work
        </Button>
        <Button variant="outline" className="flex-1 border-gray-300">
          <DollarSign className="w-4 h-4 mr-2" />
          Request Payment
        </Button>
      </div>
    </div>
  )
}
