import { useState, useMemo } from "react"
import { Briefcase, DollarSign, Clock, AlertTriangle } from "lucide-react"
import {
  mockProjects,
  mockNotifications,
  mockTransactions,
  todaysPriorities
} from "@/data/mockData"
import { useTimer } from "@/hooks/useTimer"
import { Header } from "@/components/active-projects/Header"
import { StatsCard } from "@/components/active-projects/StatsCard"
import { TodayPriorities } from "@/components/active-projects/TodayPriorities"
import { ProjectHealth } from "@/components/active-projects/ProjectHealth"
import { ProjectCard } from "@/components/active-projects/ProjectCard"
import { Sidebar } from "@/components/active-projects/Sidebar"
import { ProjectModal } from "@/components/active-projects/ProjectModal"
import { useToast } from "@/hooks/use-toast"

export default function ActiveProjects() {
  const [projects] = useState(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedProject, setSelectedProject] = useState(null)
  const [priorities, setPriorities] = useState(todaysPriorities)

  const { toast } = useToast()
  const {
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    formatTime
  } = useTimer()

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter
      const matchesPriority =
        priorityFilter === "all" || project.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [projects, searchQuery, statusFilter, priorityFilter])

  // Calculate stats
  const stats = useMemo(() => {
    const activeCount = projects.filter(p => p.status !== "completed").length
    const totalEarnings = projects.reduce((acc, p) => acc + p.paid, 0)
    const pendingPayments = projects.reduce(
      (acc, p) => acc + (p.budget - p.paid),
      0
    )
    const urgentDeadlines = projects.filter(p => {
      const deadline = new Date(p.deadline)
      const today = new Date()
      const diffDays = Math.ceil(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      return diffDays <= 3 && p.status !== "completed"
    }).length
    return { activeCount, totalEarnings, pendingPayments, urgentDeadlines }
  }, [projects])

  const handleCompletePriority = id => {
    setPriorities(prev => prev.filter(p => p.id !== id))
    toast({
      title: "Task Completed!",
      description: "Great work! Keep up the momentum."
    })
  }

  const handleSnoozePriority = id => {
    toast({
      title: "Task Snoozed",
      description: "We'll remind you later."
    })
  }

  const handleStartProjectTimer = project => {
    startTimer(project.id, project.title)
    toast({
      title: "Timer Started",
      description: `Tracking time for ${project.title}`
    })
  }

  const handleStopProjectTimer = () => {
    const elapsed = stopTimer()
    const hours = Math.floor(elapsed / 3600)
    const minutes = Math.floor((elapsed % 3600) / 60)
    toast({
      title: "Time Logged",
      description: `${hours}h ${minutes}m logged successfully`
    })
  }

  const handleQuickAction = action => {
    toast({
      title: "Quick Action",
      description: `${action} action triggered`
    })
  }

  return (
    <div className="p-6 bg-gray-50">
      {/* Header with Clean Design */}
      <div className="bg-white   sticky top-0 z-40">
        <Header
          projectCount={filteredProjects.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      </div>

      <div className="flex gap-6 py-6">
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Top Dashboard Section */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <TodayPriorities
              priorities={priorities}
              onComplete={handleCompletePriority}
              onSnooze={handleSnoozePriority}
            />
            <ProjectHealth projects={projects} />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              {
                title: "Active Projects",
                value: stats.activeCount,
                subtitle: "In progress",
                icon: Briefcase,
                variant: "primary",
                delay: 0
              },
              {
                title: "Total Earnings",
                value: `$${stats.totalEarnings.toLocaleString()}`,
                subtitle: "This month",
                icon: DollarSign,
                variant: "success",
                trend: { value: 12, isPositive: true },
                delay: 0.1
              },
              {
                title: "Pending Payments",
                value: `$${stats.pendingPayments.toLocaleString()}`,
                subtitle: "Awaiting release",
                icon: Clock,
                variant: "warning",
                delay: 0.2
              },
              {
                title: "Urgent Deadlines",
                value: stats.urgentDeadlines,
                subtitle: "Within 3 days",
                icon: AlertTriangle,
                variant: stats.urgentDeadlines > 0 ? "danger" : "default",
                delay: 0.3
              }
            ].map((stat) => (
              <StatsCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
                variant={stat.variant}
                trend={stat.trend}
              />
            ))}
          </div>

          {/* Projects Grid */}
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-2 gap-5" : "space-y-4"
            }
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <ProjectCard
                  project={project}
                  isTimerActive={
                    timerState.projectId === project.id && timerState.isRunning
                  }
                  timerElapsed={
                    timerState.projectId === project.id
                      ? formatTime(timerState.elapsed)
                      : undefined
                  }
                  onStartTimer={() => handleStartProjectTimer(project)}
                  onPauseTimer={pauseTimer}
                  onViewDetails={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
              <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2 text-gray-900">No projects found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 flex-shrink-0">
          <div className=" rounded-xl shadow-sm sticky top-6">
            <Sidebar
              timerState={timerState}
              formattedTime={formatTime(timerState.elapsed)}
              notifications={mockNotifications}
              transactions={mockTransactions}
              onPauseTimer={pauseTimer}
              onResumeTimer={resumeTimer}
              onStopTimer={handleStopProjectTimer}
              onQuickAction={handleQuickAction}
            />
          </div>
        </aside>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isTimerActive={
          selectedProject
            ? timerState.projectId === selectedProject.id &&
              timerState.isRunning
            : false
        }
        timerElapsed={formatTime(timerState.elapsed)}
        onStartTimer={() =>
          selectedProject && handleStartProjectTimer(selectedProject)
        }
        onPauseTimer={pauseTimer}
      />
    </div>
  )
}
