import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Crown,
  BarChart3
} from "lucide-react"

const StatCard = ({ label, value, subtext, icon, trend, trendValue }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border">
    <div className="p-3 rounded-xl bg-primary/10">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold text-foreground">{value}</p>
        {trend && trendValue && (
          <span
            className={`flex items-center text-sm font-medium ${
              trend === "up" ? "text-success" : "text-destructive"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4 mr-0.5" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-0.5" />
            )}
            {trendValue}
          </span>
        )}
      </div>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>
      )}
    </div>
  </div>
)

const QuickStats = () => {
  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatCard
          label="Average Per Project"
          value="$2,840"
          subtext="Based on 44 projects"
          icon={<BarChart3 className="w-5 h-5 text-primary" />}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          label="Best Paying Client"
          value="TechCorp Inc."
          subtext="$28,500 total • 8 projects"
          icon={<Crown className="w-5 h-5 text-primary" />}
        />
        <StatCard
          label="Monthly Growth"
          value="+$680"
          subtext="Compared to last month"
          icon={<Target className="w-5 h-5 text-primary" />}
          trend="up"
          trendValue="+8.2%"
        />
        <StatCard
          label="Project Success Rate"
          value="96%"
          subtext="42 of 44 projects completed"
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          trend="up"
          trendValue="+2%"
        />
      </CardContent>
    </Card>
  )
}

export default QuickStats
