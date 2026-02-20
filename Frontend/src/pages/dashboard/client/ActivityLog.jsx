import { useEffect, useState } from "react"
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
import { apiFetch } from "@/lib/apiClient"

const iconForType = (type) => {
  switch (type) {
    case "payment_made":
    case "invoice_paid":
      return { icon: DollarSign, bg: "bg-green-100", color: "text-green-600" }
    case "project_created":
    case "project_completed":
      return { icon: Briefcase, bg: "bg-emerald-100", color: "text-emerald-600" }
    case "message_sent":
    case "message_received":
      return { icon: MessageSquare, bg: "bg-blue-100", color: "text-blue-600" }
    case "milestone_completed":
      return { icon: CheckCircle, bg: "bg-green-100", color: "text-green-600" }
    case "freelancer_added":
      return { icon: UserPlus, bg: "bg-purple-100", color: "text-purple-600" }
    case "payment_method":
      return { icon: CreditCard, bg: "bg-amber-100", color: "text-amber-600" }
    case "invoice_issued":
      return { icon: FileText, bg: "bg-gray-100", color: "text-gray-600" }
    default:
      return { icon: Bell, bg: "bg-slate-100", color: "text-slate-600" }
  }
}

const ActivityLog = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadActivities = async () => {
      setLoading(true)
      try {
        const data = await apiFetch("/client/activity-log", { method: "GET" })
        if (!isMounted) return

        setActivities(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to load activity log:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

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
            {loading && activities.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">Loading activity...</div>
            ) : activities.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">No recent activity yet.</div>
            ) : (
              activities.map((activity) => {
                const meta = iconForType(activity.type)
                const Icon = meta.icon
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${meta.bg} ${meta.color}`}
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
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityLog
