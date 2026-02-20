import { useEffect, useState } from "react"
import { DollarSign, CheckCircle, Briefcase } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import StatCard from "@/components/client/StatCard"
import PageHeader from "@/components/client/PageHeader"
import { apiFetch } from "@/lib/apiClient"

const SpendTooltip = ({ active, payload, label }) => {
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

const Reports = () => {
  const [summary, setSummary] = useState(null)
  const [spendByMonth, setSpendByMonth] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadReports = async () => {
      setLoading(true)
      try {
        const [summaryRes, analyticsRes] = await Promise.all([
          apiFetch("/client/reports/summary", { method: "GET" }),
          apiFetch("/client/reports/analytics", { method: "GET" }),
        ])

        if (!isMounted) return

        setSummary(summaryRes)

        const monthly = Array.isArray(analyticsRes?.monthly_spending)
          ? analyticsRes.monthly_spending
          : []

        setSpendByMonth(
          monthly.map((row) => ({
            month: String(row.month),
            spend: row.total || 0,
          }))
        )
      } catch (err) {
        console.error("Failed to load client reports:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadReports()

    return () => {
      isMounted = false
    }
  }, [])

  const totalSpend = summary?.total_spent ?? 0
  const completedProjects = summary?.completed_projects ?? 0
  const activeProjects = summary?.active_projects ?? 0

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Key metrics and summarized reports for your projects and spending."
      />

      {loading && !summary ? (
        <div className="text-sm text-gray-500">Loading reports...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={DollarSign}
            label="Total spend"
            value={`₹${totalSpend.toLocaleString()}`}
          />
          <StatCard
            icon={CheckCircle}
            label="Completed projects"
            value={String(completedProjects)}
          />
          <StatCard
            icon={Briefcase}
            label="Active projects"
            value={String(activeProjects)}
          />
        </div>
      )}

      <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Spending by month
        </h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
              />
              <Tooltip content={<SpendTooltip />} />
              <Legend />
              <Bar
                dataKey="spend"
                name="Spend ($)"
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Reports
