import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./modal-tabs/OverviewTab"
import { TasksTab } from "./modal-tabs/TasksTab"
import { MessagesTab } from "./modal-tabs/MessagesTab"
import { MilestonesTab } from "./modal-tabs/MilestonesTab"
import { FilesTab } from "./modal-tabs/FilesTab"
import { PaymentsTab } from "./modal-tabs/PaymentsTab"
import {
  LayoutDashboard,
  ListTodo,
  MessageSquare,
  Milestone,
  FolderOpen,
  CreditCard
} from "lucide-react"

export function ProjectModal({
  project,
  isOpen,
  onClose,
  isTimerActive,
  timerElapsed,
  onStartTimer,
  onPauseTimer
}) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[100vh] overflow-hidden flex flex-col p-0 bg-gray-50">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            {project.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {project.client.name} • {project.category}
          </p>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="px-6 py-0 h-auto bg-transparent border-b border-border justify-start gap-0 rounded-none">
            <TabsTrigger
              value="overview"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <ListTodo className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <MessageSquare className="w-4 h-4" />
              Messages
              {project.unreadMessages > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#2A6BFF] text-white rounded-full text-xs">
                  {project.unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <Milestone className="w-4 h-4" />
              Milestones
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <FolderOpen className="w-4 h-4" />
              Files
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="tab-trigger gap-2 rounded-none data-[state=active]:shadow-none"
            >
              <CreditCard className="w-4 h-4" />
              Payments
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="m-0 h-full">
              <OverviewTab
                project={project}
                isTimerActive={isTimerActive}
                timerElapsed={timerElapsed}
                onStartTimer={onStartTimer}
                onPauseTimer={onPauseTimer}
              />
            </TabsContent>
            <TabsContent value="tasks" className="m-0 h-full">
              <TasksTab project={project} />
            </TabsContent>
            <TabsContent value="messages" className="m-0 h-full">
              <MessagesTab project={project} />
            </TabsContent>
            <TabsContent value="milestones" className="m-0 h-full">
              <MilestonesTab project={project} />
            </TabsContent>
            <TabsContent value="files" className="m-0 h-full">
              <FilesTab project={project} />
            </TabsContent>
            <TabsContent value="payments" className="m-0 h-full">
              <PaymentsTab project={project} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
