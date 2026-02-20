import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import PageHeader from "@/components/client/PageHeader"
import DataTable from "@/components/client/DataTable"
import StatusBadge from "@/components/client/StatusBadge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiFetch } from "@/lib/apiClient"

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
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadInvoices = async () => {
      setLoading(true)
      try {
        const data = await apiFetch("/client/invoices", {
          method: "GET",
        })

        if (!isMounted) return

        // Expecting array of invoices from backend
        const normalized = (Array.isArray(data) ? data : data?.invoices || []).map(
          (inv) => ({
            id: inv.invoice_number || inv.id,
            date: inv.invoice_date || inv.date,
            amount: inv.amount,
            status: (inv.status || "").charAt(0).toUpperCase() + (inv.status || "").slice(1),
          })
        )

        setInvoices(normalized)
      } catch (err) {
        console.error("Failed to load invoices", err)
        toast.error(err.message || "Failed to load invoices")
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadInvoices()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="View, filter, and download invoices for your projects."
      />

      {loading ? (
        <div className="bg-white rounded-lg border border-green-200 p-6 text-sm text-gray-600">
          Loading invoices...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={invoices}
          emptyTitle="No invoices yet"
          emptyDescription="You’ll see invoices here once you start working with freelancers."
        />
      )}
    </div>
  )
}

export default Invoices
