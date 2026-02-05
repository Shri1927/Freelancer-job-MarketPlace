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

const MOCK_REPORTS = {
  totalSpend: 45200,
  completedProjects: 24,
  activeProjects: 8,
}

const SPEND_BY_MONTH = [
  { month: "Jul", spend: 4200 },
  { month: "Aug", spend: 5100 },
  { month: "Sep", spend: 4800 },
  { month: "Oct", spend: 6200 },
  { month: "Nov", spend: 5500 },
  { month: "Dec", spend: 7200 },
]

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
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Key metrics and summarized reports for your projects and spending."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={DollarSign}
          label="Total spend"
          value={`$${MOCK_REPORTS.totalSpend.toLocaleString()}`}
          change="+$2,500 vs last period"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed projects"
          value={String(MOCK_REPORTS.completedProjects)}
          change="+3 this month"
        />
        <StatCard
          icon={Briefcase}
          label="Active projects"
          value={String(MOCK_REPORTS.activeProjects)}
          change="+2"
        />
      </div>

      <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Spending by month
        </h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SPEND_BY_MONTH}>
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
