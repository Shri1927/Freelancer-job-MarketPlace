import {
  DollarSign,
  FileText,
  MessageSquare,
  Briefcase,
  CheckCircle,
  UserPlus,
  CreditCard,
  Bell,
} from "lucide-react"
import PageHeader from "@/components/client/PageHeader"

const MOCK_ACTIVITIES = [
  {
    id: 1,
    type: "invoice_paid",
    title: "Invoice paid",
    description: "INV-2024-003 — $3,200",
    time: "2 hours ago",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    type: "project_created",
    title: "Project created",
    description: "Website Redesign — Acme Corp",
    time: "5 hours ago",
    icon: Briefcase,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    type: "message_received",
    title: "Message received",
    description: "From John D. — Re: Milestone delivery",
    time: "Yesterday, 4:32 PM",
    icon: MessageSquare,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 4,
    type: "milestone_completed",
    title: "Milestone completed",
    description: "Phase 1 — Design mockups approved",
    time: "Yesterday, 11:00 AM",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 5,
    type: "freelancer_added",
    title: "Freelancer added to project",
    description: "Sarah M. — UX Designer",
    time: "Jan 29, 2025",
    icon: UserPlus,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 6,
    type: "payment_method",
    title: "Payment method updated",
    description: "Visa •••• 4242 set as default",
    time: "Jan 28, 2025",
    icon: CreditCard,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 7,
    type: "invoice_issued",
    title: "Invoice issued",
    description: "INV-2024-004 — $950 (Pending)",
    time: "Jan 27, 2025",
    icon: FileText,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    id: 8,
    type: "notification",
    title: "Notification preferences updated",
    description: "Email alerts for payments enabled",
    time: "Jan 26, 2025",
    icon: Bell,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
]

const ActivityLog = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Activity Log"
        description="Timeline of recent actions across your account, projects, and billing."
      />

      <div className="bg-white rounded-lg border border-green-200 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-green-100" />
          <div className="divide-y divide-green-100 relative z-10">
            {MOCK_ACTIVITIES.map((activity) => {
              const Icon = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.iconBg} ${activity.iconColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityLog
