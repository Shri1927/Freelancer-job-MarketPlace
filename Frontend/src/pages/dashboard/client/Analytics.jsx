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
  BarChart,
  Bar,
} from "recharts"
import PageHeader from "@/components/client/PageHeader"

const PIE_DATA = [
  { name: "Completed", value: 24, fill: "#22c55e" },
  { name: "Active", value: 8, fill: "#16a34a" },
  { name: "In Review", value: 6, fill: "#f97316" },
  { name: "On Hold", value: 2, fill: "#ef4444" },
]

const SPENDING_TREND = [
  { month: "Jul", amount: 4200 },
  { month: "Aug", amount: 5100 },
  { month: "Sep", amount: 4800 },
  { month: "Oct", amount: 6200 },
  { month: "Nov", amount: 5500 },
  { month: "Dec", amount: 7200 },
]

const MONTHLY_ACTIVITY = [
  { month: "Jul", projects: 3, invoices: 4 },
  { month: "Aug", projects: 4, invoices: 5 },
  { month: "Sep", projects: 2, invoices: 3 },
  { month: "Oct", projects: 5, invoices: 6 },
  { month: "Nov", projects: 4, invoices: 5 },
  { month: "Dec", projects: 6, invoices: 7 },
]

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const total = PIE_DATA.reduce((s, d) => s + d.value, 0)
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

const ActivityTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-green-200 bg-white px-3 py-2 shadow-md">
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-600">
        {payload
          .map((p) => `${p.name}: ${p.value}`)
          .join(" • ")}
      </p>
    </div>
  )
}

const Analytics = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Track spending, project health, and monthly activity across your workspace."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project status breakdown
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
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
                  {PIE_DATA.map((entry, index) => (
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
            Spending trend
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SPENDING_TREND}>
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

      <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly activity
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" allowDecimals={false} />
              <Tooltip content={<ActivityTooltip />} />
              <Legend />
              <Bar
                dataKey="projects"
                name="Projects created"
                fill="#16a34a"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="invoices"
                name="Invoices paid"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics
