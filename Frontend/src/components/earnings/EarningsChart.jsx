import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const dailyData = [
  { name: "Mon", earnings: 420, projects: 2 },
  { name: "Tue", earnings: 380, projects: 1 },
  { name: "Wed", earnings: 520, projects: 3 },
  { name: "Thu", earnings: 290, projects: 1 },
  { name: "Fri", earnings: 680, projects: 4 },
  { name: "Sat", earnings: 450, projects: 2 },
  { name: "Sun", earnings: 320, projects: 1 }
]

const weeklyData = [
  { name: "Week 1", earnings: 2850, projects: 8 },
  { name: "Week 2", earnings: 3200, projects: 10 },
  { name: "Week 3", earnings: 2950, projects: 9 },
  { name: "Week 4", earnings: 3420, projects: 12 }
]

const monthlyData = [
  { name: "Jan", earnings: 8500, projects: 24 },
  { name: "Feb", earnings: 9200, projects: 28 },
  { name: "Mar", earnings: 7800, projects: 22 },
  { name: "Apr", earnings: 10500, projects: 32 },
  { name: "May", earnings: 11200, projects: 35 },
  { name: "Jun", earnings: 9800, projects: 30 },
  { name: "Jul", earnings: 12400, projects: 38 },
  { name: "Aug", earnings: 8420, projects: 26 }
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-lg font-bold text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {payload[0].payload.projects} projects
        </p>
      </div>
    )
  }
  return null
}

const EarningsChart = () => {
  const [timeRange, setTimeRange] = useState("monthly")
  const [dateRange, setDateRange] = useState(new Date())

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return monthlyData
    }
  }

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-foreground">
            Earnings Timeline
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-secondary rounded-lg p-1">
              {["daily", "weekly", "monthly"].map(range => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={`text-xs capitalize transition-all ${
                    timeRange === range
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </Button>
              ))}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-border hover:border-primary/50 hover:bg-primary/5"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {dateRange
                    ? format(dateRange, "MMM dd, yyyy")
                    : "Select date"}
                  <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-card border-border"
                align="end"
              >
                <CalendarComponent
                  mode="single"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getData()}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(158 64% 40%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(158 64% 40%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(145 20% 88%)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(150 10% 45%)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(150 10% 45%)", fontSize: 12 }}
                tickFormatter={value =>
                  `$${value >= 1000 ? `${value / 1000}k` : value}`
                }
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="hsl(158 64% 40%)"
                strokeWidth={2.5}
                fill="url(#earningsGradient)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "hsl(158 64% 40%)",
                  stroke: "white",
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningsChart
