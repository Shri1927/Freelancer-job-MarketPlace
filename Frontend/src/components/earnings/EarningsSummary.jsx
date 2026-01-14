import { DollarSign, TrendingUp, Clock, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

const SummaryCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  delay = 0,
  variant = "default"
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/5 border-primary/20",
    success: "bg-success/5 border-success/20",
    warning: "bg-pending/10 border-pending/30"
  }

  const iconStyles = {
    default: "bg-secondary text-secondary-foreground",
    primary: "gradient-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-pending text-pending-foreground"
  }

  return (
    <Card
      className={`${
        variantStyles[variant]
      } border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {change && (
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    changeType === "positive"
                      ? "text-success"
                      : changeType === "negative"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconStyles[variant]} shadow-sm`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const EarningsSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Earned (Lifetime)"
        value="$124,580"
        change="+12.5%"
        changeType="positive"
        icon={<DollarSign className="w-6 h-6" />}
        delay={0}
        variant="primary"
      />
      <SummaryCard
        title="Current Month"
        value="$8,420"
        change="+8.2%"
        changeType="positive"
        icon={<TrendingUp className="w-6 h-6" />}
        delay={100}
        variant="success"
      />
      <SummaryCard
        title="Pending Balance"
        value="$2,350"
        icon={<Clock className="w-6 h-6" />}
        delay={200}
        variant="warning"
      />
      <SummaryCard
        title="Available to Withdraw"
        value="$6,070"
        icon={<Wallet className="w-6 h-6" />}
        delay={300}
        variant="default"
      />
    </div>
  )
}

export default EarningsSummary
