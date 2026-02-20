import { useEffect, useMemo, useState } from "react"
import {
  Briefcase,
  Clock,
  MessageSquare,
  DollarSign,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import StatCard from "@/components/client/StatCard"
import PageHeader from "@/components/client/PageHeader"
import { useUser } from "@/contexts/UserContext.jsx"
import { apiFetch } from "@/lib/apiClient"

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const total = item?.payload?.__total || 0
  const pct = total ? ((item.value / total) * 100).toFixed(1) : 0
  return (
    <div className="rounded-lg border border-green-200 bg-white px-3 py-2 shadow-md">
      <p className="font-medium text-gray-900">{item.name}</p>
      <p className="text-sm text-gray-600">
        {item.value} <span className="text-gray-400">({pct}%)</span>
      </p>
    </div>
  )
}

const SpendingTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-green-200 bg-white px-3 py-2 shadow-md">
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-green-600">
        ${payload[0].value?.toLocaleString()}
      </p>
    </div>
  )
}

const ClientDashboard = () => {
  const { user } = useUser()
  const name = user?.name || "Client"

  const [summary, setSummary] = useState(null)
  const [statusData, setStatusData] = useState([])
  const [spendingData, setSpendingData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadDashboard = async () => {
      setLoading(true)
      try {
        const data = await apiFetch("/client/dashboard", { method: "GET" })
        if (!isMounted) return

        setSummary(data.summary || {})

        const rawStatus = Array.isArray(data.charts?.project_status)
          ? data.charts.project_status
          : []

        const totalStatus = rawStatus.reduce((sum, row) => sum + (row.count || 0), 0)

        const mappedStatus = rawStatus.map((row) => {
          const name =
            row.status === "completed"
              ? "Completed"
              : row.status === "active"
              ? "Active"
              : row.status === "in_review"
              ? "In Review"
              : row.status || "Other"

          const fill =
            row.status === "completed"
              ? "#22c55e"
              : row.status === "active"
              ? "#15803d"
              : row.status === "in_review"
              ? "#f97316"
              : "#e5e7eb"

          return {
            name,
            value: row.count || 0,
            fill,
            __total: totalStatus,
          }
        })

        setStatusData(mappedStatus)

        const rawSpending = Array.isArray(data.charts?.spending_trend)
          ? data.charts.spending_trend
          : []

        const mappedSpending = rawSpending.map((row) => ({
          month: String(row.month),
          amount: row.total || 0,
        }))

        setSpendingData(mappedSpending)
      } catch (err) {
        console.error("Failed to load client dashboard:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const stats = useMemo(() => {
    if (!summary) return []

    return [
      {
        icon: Briefcase,
        label: "Active Projects",
        value: String(summary.active_projects ?? 0),
      },
      {
        icon: CheckCircle,
        label: "Completed",
        value: String(summary.completed_projects ?? 0),
      },
      {
        icon: AlertCircle,
        label: "In Review",
        value: String(summary.in_review_projects ?? 0),
      },
      {
        icon: Clock,
        label: "Pending Actions",
        value: String(summary.pending_actions ?? 0),
      },
      {
        icon: MessageSquare,
        label: "Unread Messages",
        value: String(summary.unread_messages ?? 0),
      },
      {
        icon: DollarSign,
        label: "Total Spent",
        value: `₹${(summary.total_spent ?? 0).toLocaleString()}`,
      },
    ]
  }, [summary])

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${name}`}
        description="Overview of your projects, activity, and spending on FreelanceHub."
      />

      {loading && !summary ? (
        <div className="text-sm text-gray-500">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Status
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Spending Trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis
                  stroke="#6b7280"
                  tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
                />
                <Tooltip content={<SpendingTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ fill: "#16a34a" }}
                  name="Amount ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
