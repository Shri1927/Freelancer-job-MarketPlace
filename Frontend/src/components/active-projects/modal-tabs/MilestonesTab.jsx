import {
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  ArrowRight,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MilestonesTab({ project }) {
  const getStatusColor = status => {
    switch (status) {
      case "paid":
        return "bg-success"
      case "in-escrow":
        return "bg-[#2A6BFF]"
      case "requested":
        return "bg-warning"
      case "pending":
        return "bg-gray-100"
    }
  }

  const getStatusBadge = status => {
    switch (status) {
      case "paid":
        return <Badge variant="success">Paid</Badge>
      case "in-escrow":
        return <Badge variant="info">In Escrow</Badge>
      case "requested":
        return <Badge variant="warning">Requested</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const paidAmount = project.milestones
    .filter(m => m.status === "paid")
    .reduce((a, b) => a + b.amount, 0)

  const escrowAmount = project.milestones
    .filter(m => m.status === "in-escrow")
    .reduce((a, b) => a + b.amount, 0)

  const pendingAmount = project.milestones
    .filter(m => m.status === "pending" || m.status === "requested")
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 rounded-xl bg-gray-100/50">
          <p className="text-2xl font-bold">
            ${project.budget.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Total Budget</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-success/10">
          <p className="text-2xl font-bold text-success">
            ${paidAmount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Paid</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-[#2A6BFF]/10">
          <p className="text-2xl font-bold text-[#2A6BFF]">
            ${escrowAmount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">In Escrow</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-warning/10">
          <p className="text-2xl font-bold text-warning">
            ${pendingAmount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Milestone Progress</h4>
        <div className="flex items-center gap-2">
          {project.milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex items-center flex-1">
              <div className="flex-1">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all",
                    milestone.status === "paid"
                      ? "bg-success"
                      : milestone.status === "in-escrow"
                      ? "bg-[#2A6BFF]"
                      : milestone.status === "requested"
                      ? "bg-warning"
                      : "bg-gray-100"
                  )}
                />
              </div>
              {index < project.milestones.length - 1 && (
                <ArrowRight className="w-4 h-4 mx-2 text-gray-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {project.milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className={cn(
              "milestone-item animate-fade-in",
              index === project.milestones.length - 1 && "pb-0"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={cn("milestone-dot", getStatusColor(milestone.status))}
            />

            <div className="flex items-start justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-[#2A6BFF]/20 transition-all">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-medium">{milestone.title}</h5>
                  {getStatusBadge(milestone.status)}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-foreground">
                      ${milestone.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Due{" "}
                      {new Date(milestone.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {milestone.status === "in-escrow" && (
                  <Button variant="success" size="sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Request Release
                  </Button>
                )}
                {milestone.status === "pending" && (
                  <Button variant="outline" size="sm" disabled>
                    <Clock className="w-4 h-4 mr-1" />
                    Awaiting
                  </Button>
                )}
                {milestone.status === "requested" && (
                  <Button variant="warning" size="sm" disabled>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Pending Approval
                  </Button>
                )}
                {milestone.status === "paid" && (
                  <div className="flex items-center gap-1 text-success text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Paid</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request Payment Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Ready to request payment?
            </p>
            <p className="text-xs text-gray-600">
              {project.milestones.filter(m => m.status === "in-escrow").length}{" "}
              milestone(s) eligible for release
            </p>
          </div>
          <Button
            disabled={
              project.milestones.filter(m => m.status === "in-escrow")
                .length === 0
            }
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Request Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
