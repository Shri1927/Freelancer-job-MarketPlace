import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Building2, FolderOpen, ArrowUpDown } from "lucide-react"

const clientsData = [
  {
    id: "1",
    name: "TechCorp Inc.",
    initials: "TC",
    color: "bg-primary",
    totalEarned: 28500,
    projects: 8,
    status: "paid",
    lastPayment: "Jan 8, 2026"
  },
  {
    id: "2",
    name: "StartupXYZ",
    initials: "SX",
    color: "bg-accent",
    totalEarned: 18200,
    projects: 5,
    status: "pending",
    lastPayment: "Dec 28, 2025"
  },
  {
    id: "3",
    name: "Design Studio",
    initials: "DS",
    color: "bg-success",
    totalEarned: 15800,
    projects: 12,
    status: "paid",
    lastPayment: "Jan 5, 2026"
  },
  {
    id: "4",
    name: "Global Media",
    initials: "GM",
    color: "bg-warning",
    totalEarned: 12400,
    projects: 4,
    status: "partial",
    lastPayment: "Jan 2, 2026"
  },
  {
    id: "5",
    name: "FinanceHub",
    initials: "FH",
    color: "bg-destructive",
    totalEarned: 9800,
    projects: 3,
    status: "paid",
    lastPayment: "Jan 10, 2026"
  }
]

const projectsData = [
  {
    id: "1",
    name: "E-commerce Platform",
    client: "TechCorp Inc.",
    amount: 8500,
    status: "paid",
    dueDate: "Jan 5, 2026"
  },
  {
    id: "2",
    name: "Mobile App UI",
    client: "StartupXYZ",
    amount: 4200,
    status: "pending",
    dueDate: "Jan 15, 2026"
  },
  {
    id: "3",
    name: "Brand Identity",
    client: "Design Studio",
    amount: 3500,
    status: "paid",
    dueDate: "Jan 3, 2026"
  },
  {
    id: "4",
    name: "Dashboard Redesign",
    client: "Global Media",
    amount: 5200,
    status: "overdue",
    dueDate: "Jan 1, 2026"
  },
  {
    id: "5",
    name: "Landing Page",
    client: "FinanceHub",
    amount: 2800,
    status: "paid",
    dueDate: "Jan 8, 2026"
  },
  {
    id: "6",
    name: "API Integration",
    client: "TechCorp Inc.",
    amount: 6200,
    status: "pending",
    dueDate: "Jan 20, 2026"
  }
]

const StatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-success/10 text-success border-success/20",
    pending: "bg-pending/10 text-pending-foreground border-pending/30",
    partial: "bg-accent/10 text-accent border-accent/20",
    overdue: "bg-destructive/10 text-destructive border-destructive/20"
  }

  return (
    <Badge
      variant="outline"
      className={`${styles[status]} capitalize text-xs font-medium`}
    >
      {status}
    </Badge>
  )
}

const ClientBreakdown = () => {
  const [view, setView] = useState("clients")
  const [sortOrder, setSortOrder] = useState("desc")

  const sortedClients = [...clientsData].sort((a, b) =>
    sortOrder === "desc"
      ? b.totalEarned - a.totalEarned
      : a.totalEarned - b.totalEarned
  )

  const sortedProjects = [...projectsData].sort((a, b) =>
    sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount
  )

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-foreground">
            Earnings Breakdown
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex bg-secondary rounded-lg p-1">
              <Button
                variant={view === "clients" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("clients")}
                className={`text-xs transition-all ${
                  view === "clients"
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                By Client
              </Button>
              <Button
                variant={view === "projects" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("projects")}
                className={`text-xs transition-all ${
                  view === "projects"
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5 mr-1.5" />
                By Project
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              className="text-xs border-border hover:border-primary/50 hover:bg-primary/5"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
              {sortOrder === "desc" ? "Highest" : "Lowest"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {view === "clients"
            ? sortedClients.map((client, index) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback
                        className={`${client.color} text-primary-foreground text-sm font-semibold`}
                      >
                        {client.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {client.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {client.projects} projects • Last: {client.lastPayment}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={client.status} />
                    <p className="text-lg font-bold text-foreground min-w-[100px] text-right">
                      ${client.totalEarned.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            : sortedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.client} • Due: {project.dueDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={project.status} />
                    <p className="text-lg font-bold text-foreground min-w-[100px] text-right">
                      ${project.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientBreakdown
