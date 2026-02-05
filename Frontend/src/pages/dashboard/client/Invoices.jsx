import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import PageHeader from "@/components/client/PageHeader"
import DataTable from "@/components/client/DataTable"
import StatusBadge from "@/components/client/StatusBadge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DEFAULT_INVOICES = [
  { id: "INV-2024-001", date: "Nov 28, 2024", amount: 2500, status: "Paid" },
  { id: "INV-2024-002", date: "Nov 15, 2024", amount: 1800, status: "Paid" },
  { id: "INV-2024-003", date: "Dec 5, 2024", amount: 3200, status: "Unpaid" },
  { id: "INV-2024-004", date: "Oct 30, 2024", amount: 950, status: "Overdue" },
  { id: "INV-2024-005", date: "Oct 10, 2024", amount: 4100, status: "Paid" },
]

const columns = [
  {
    key: "id",
    header: "Invoice ID",
    headerClassName: "text-gray-700",
    className: "font-medium",
  },
  {
    key: "date",
    header: "Date",
    headerClassName: "text-gray-700",
    className: "text-gray-600",
  },
  {
    key: "amount",
    header: "Amount",
    headerClassName: "text-gray-700",
    className: "font-medium text-green-600",
    render: (row) => `$${row.amount.toLocaleString()}`,
  },
  {
    key: "status",
    header: "Status",
    headerClassName: "text-gray-700",
    render: (row) => <StatusBadge status={row.status} type="invoice" />,
  },
  {
    key: "actions",
    header: "",
    headerClassName: "",
    className: "text-right",
    render: (row) => (
      <Button
        variant="outline"
        size="sm"
        className="border-green-200 text-xs"
        onClick={() => {
          toast.success(`Invoice ${row.id} downloaded (mock)`)
        }}
      >
        <Download className="w-4 h-4 mr-1" />
        Download
      </Button>
    ),
  },
]

const Invoices = () => {
  const [invoices] = useState(() => {
    // In a real app this would load from API or localStorage
    return DEFAULT_INVOICES
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="View, filter, and download invoices for your projects."
      />

      <DataTable
        columns={columns}
        data={invoices}
        emptyTitle="No invoices yet"
        emptyDescription="You’ll see invoices here once you start working with freelancers."
      />
    </div>
  )
}

export default Invoices
