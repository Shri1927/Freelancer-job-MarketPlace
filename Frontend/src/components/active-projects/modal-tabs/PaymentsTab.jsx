import {
  DollarSign,
  Download,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function PaymentsTab({ project }) {
  const paidMilestones = project.milestones.filter(m => m.status === "paid")
  const escrowMilestones = project.milestones.filter(
    m => m.status === "in-escrow"
  )
  const pendingMilestones = project.milestones.filter(
    m => m.status === "pending" || m.status === "requested"
  )

  const totalPaid = paidMilestones.reduce((a, b) => a + b.amount, 0)
  const totalEscrow = escrowMilestones.reduce((a, b) => a + b.amount, 0)
  const totalPending = pendingMilestones.reduce((a, b) => a + b.amount, 0)

  const hourlyRate =
    project.hoursSpent > 0 ? Math.round(totalPaid / project.hoursSpent) : 0

  // Mock payment history
  const paymentHistory = paidMilestones.map((m, i) => ({
    id: i + 1,
    milestone: m.title,
    amount: m.amount,
    date: new Date(m.dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }),
    method: "Direct Deposit",
    status: "completed"
  }))

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-success/10 to-success/5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm text-gray-600">Total Earned</span>
          </div>
          <p className="text-2xl font-bold text-success">
            ${totalPaid.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {paidMilestones.length} payments received
          </p>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-[#2A6BFF]/10 to-[#2A6BFF]/5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#2A6BFF]" />
            <span className="text-sm text-gray-600">In Escrow</span>
          </div>
          <p className="text-2xl font-bold text-[#2A6BFF]">
            ${totalEscrow.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Ready for release
          </p>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-warning/10 to-warning/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            ${totalPending.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {pendingMilestones.length} milestones
          </p>
        </div>

        <div className="p-4 rounded-xl border border-gray-200 bg-gray-100/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Hourly Rate</span>
          </div>
          <p className="text-2xl font-bold">${hourlyRate}</p>
          <p className="text-xs text-gray-600 mt-1">
            {project.hoursSpent}h logged
          </p>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Payment Progress</h4>
          <span className="text-sm text-gray-600">
            ${totalPaid.toLocaleString()} of ${project.budget.toLocaleString()}
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-success transition-all"
            style={{ width: `${(totalPaid / project.budget) * 100}%` }}
          />
          <div
            className="h-full bg-[#2A6BFF] transition-all"
            style={{ width: `${(totalEscrow / project.budget) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-success" />
              <span className="text-gray-600">Paid</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-[#2A6BFF]" />
              <span className="text-gray-600">Escrow</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-gray-100" />
              <span className="text-gray-600">Pending</span>
            </div>
          </div>
          <span className="text-gray-600">
            {Math.round((totalPaid / project.budget) * 100)}% complete
          </span>
        </div>
      </div>

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Payment History</h4>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        {paymentHistory.length > 0 ? (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100/50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    Milestone
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={cn(
                      "border-t border-gray-200 animate-fade-in",
                      index % 2 === 0 ? "bg-white" : "bg-gray-100/20"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{payment.milestone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-success">
                        ${payment.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {payment.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {payment.method}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success">Completed</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="iconSm"
                          title="View Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="iconSm"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 border border-gray-200 rounded-xl bg-gray-100/20">
            <DollarSign className="w-12 h-12 mx-auto text-gray-600/50 mb-4" />
            <p className="text-gray-600">No payments received yet</p>
            <p className="text-sm text-gray-600/70">
              Complete milestones to receive payments
            </p>
          </div>
        )}
      </div>

      {/* Request Payment CTA */}
      {escrowMilestones.length > 0 && (
        <div className="mt-6 p-4 rounded-xl border border-success/20 bg-success/5 flex items-center justify-between">
          <div>
            <p className="font-medium text-success">
              ${totalEscrow.toLocaleString()} ready for release
            </p>
            <p className="text-sm text-gray-600">
              {escrowMilestones.length} milestone(s) in escrow
            </p>
          </div>
          <Button variant="success">
            <DollarSign className="w-4 h-4 mr-2" />
            Request Payment
          </Button>
        </div>
      )}
    </div>
  )
}
