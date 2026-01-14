import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Check
} from "lucide-react"

const recentPayments = [
  {
    id: "1",
    project: "Brand Identity",
    client: "Design Studio",
    amount: 3500,
    date: "Jan 10, 2026",
    status: "completed"
  },
  {
    id: "2",
    project: "Landing Page",
    client: "FinanceHub",
    amount: 2800,
    date: "Jan 8, 2026",
    status: "completed"
  },
  {
    id: "3",
    project: "E-commerce Platform",
    client: "TechCorp Inc.",
    amount: 8500,
    date: "Jan 5, 2026",
    status: "completed"
  }
]

const upcomingPayments = [
  {
    id: "4",
    project: "Mobile App UI",
    client: "StartupXYZ",
    amount: 4200,
    date: "Jan 15, 2026",
    status: "pending"
  },
  {
    id: "5",
    project: "API Integration",
    client: "TechCorp Inc.",
    amount: 6200,
    date: "Jan 20, 2026",
    status: "pending"
  },
  {
    id: "6",
    project: "Website Redesign",
    client: "Global Media",
    amount: 7500,
    date: "Jan 25, 2026",
    status: "pending"
  }
]

const overduePayments = [
  {
    id: "7",
    project: "Dashboard Redesign",
    client: "Global Media",
    amount: 5200,
    date: "Jan 1, 2026",
    status: "overdue"
  },
  {
    id: "8",
    project: "Logo Design",
    client: "StartupXYZ",
    amount: 1500,
    date: "Dec 28, 2025",
    status: "overdue"
  }
]

const PaymentTracking = () => {
  const [activeTab, setActiveTab] = useState("recent")
  const [markedPaid, setMarkedPaid] = useState([])

  const tabs = [
    {
      id: "recent",
      label: "Recent",
      icon: CheckCircle2,
      count: recentPayments.length,
      color: "text-success"
    },
    {
      id: "upcoming",
      label: "Upcoming",
      icon: Clock,
      count: upcomingPayments.length,
      color: "text-primary"
    },
    {
      id: "overdue",
      label: "Overdue",
      icon: AlertTriangle,
      count: overduePayments.length,
      color: "text-destructive"
    }
  ]

  const getPayments = () => {
    switch (activeTab) {
      case "recent":
        return recentPayments
      case "upcoming":
        return upcomingPayments
      case "overdue":
        return overduePayments
      default:
        return recentPayments
    }
  }

  const handleMarkPaid = id => {
    setMarkedPaid([...markedPaid, id])
  }

  const statusStyles = {
    completed: {
      bg: "bg-success/10",
      text: "text-success",
      icon: CheckCircle2
    },
    pending: { bg: "bg-primary/10", text: "text-primary", icon: Clock },
    overdue: {
      bg: "bg-destructive/10",
      text: "text-destructive",
      icon: AlertTriangle
    }
  }

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-foreground">
            Payment Tracking
          </CardTitle>
          <div className="flex bg-secondary rounded-lg p-1">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs transition-all ${
                  activeTab === tab.id
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon
                  className={`w-3.5 h-3.5 mr-1.5 ${
                    activeTab !== tab.id ? tab.color : ""
                  }`}
                />
                {tab.label}
                <Badge
                  variant="secondary"
                  className={`ml-1.5 text-[10px] px-1.5 py-0 ${
                    activeTab === tab.id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-secondary-foreground/10"
                  }`}
                >
                  {tab.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {getPayments().map((payment, index) => {
            const isPaid = markedPaid.includes(payment.id)
            const style = statusStyles[isPaid ? "completed" : payment.status]
            const StatusIcon = style.icon

            return (
              <div
                key={payment.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 border ${
                  isPaid
                    ? "bg-success/5 border-success/20"
                    : payment.status === "overdue"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-secondary/30 border-transparent hover:border-border hover:bg-secondary/50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${style.bg}`}>
                    <StatusIcon className={`w-5 h-5 ${style.text}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {payment.project}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.client} • {payment.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold text-foreground">
                    ${payment.amount.toLocaleString()}
                  </p>
                  {(activeTab === "upcoming" || activeTab === "overdue") &&
                    !isPaid && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkPaid(payment.id)}
                        className="text-xs border-success/30 text-success hover:bg-success hover:text-success-foreground hover:border-success"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Mark Paid
                      </Button>
                    )}
                  {isPaid && (
                    <Badge className="bg-success/10 text-success border-success/20">
                      Marked as Paid
                    </Badge>
                  )}
                  {activeTab === "recent" && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentTracking
