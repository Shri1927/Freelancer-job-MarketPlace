import { cn } from "@/lib/utils"

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default"
}) {
  const cardVariants = {
    default: "bg-white border-gray-200",
    primary: "bg-white border-gray-200",
    success: "bg-white border-gray-200",
    warning: "bg-white border-gray-200",
    danger: "bg-white border-gray-200"
  }

  const iconVariants = {
    default: "bg-gray-100 text-gray-600",
    primary: "bg-blue-100 text-[#2A6BFF]",
    success: "bg-green-100 text-green-600",
    warning: "bg-orange-100 text-orange-600",
    danger: "bg-red-100 text-red-600"
  }

  return (
    <div className={cn("rounded-xl p-6 border shadow-sm", cardVariants[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl flex-shrink-0",
            iconVariants[variant]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
