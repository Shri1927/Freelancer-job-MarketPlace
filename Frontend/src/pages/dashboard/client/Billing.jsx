import { useState } from "react"
import { CreditCard, Wallet, Calendar, DollarSign, ArrowDownCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/client/PageHeader"
import StatusBadge from "@/components/client/StatusBadge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const MOCK_BILLING = {
  totalSpent: 45200,
  thisMonth: 7200,
  upcomingDue: 3200,
  currentBalance: 12450.0,
  lastPayment: { amount: 2500, date: "Nov 28, 2024", method: "Visa •••• 4242" },
  paymentMethods: [
    { id: "pm_1", brand: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
    { id: "pm_2", brand: "Mastercard", last4: "8844", expiry: "08/27", isDefault: false },
  ],
  recentPayments: [
    { id: "pay_1", date: "Dec 2, 2024", description: "Invoice INV-2024-003", amount: 3200, status: "Paid" },
    { id: "pay_2", date: "Nov 28, 2024", description: "Invoice INV-2024-001", amount: 2500, status: "Paid" },
    { id: "pay_3", date: "Nov 10, 2024", description: "Invoice INV-2024-002", amount: 1800, status: "Paid" },
  ],
}

const Billing = () => {
  const [recentPayments, setRecentPayments] = useState(MOCK_BILLING.recentPayments)
  const [paymentMethods, setPaymentMethods] = useState(MOCK_BILLING.paymentMethods)

  const [makePaymentOpen, setMakePaymentOpen] = useState(false)
  const [addMethodOpen, setAddMethodOpen] = useState(false)

  const [selectedInvoice, setSelectedInvoice] = useState("INV-2024-003")
  const [selectedMethod, setSelectedMethod] = useState(MOCK_BILLING.paymentMethods[0]?.id || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [newCard, setNewCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  })

  const handleConfirmPayment = async () => {
    if (!selectedInvoice || !selectedMethod) {
      toast.error("Select invoice and payment method")
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      const invoiceAmount = 3200
      setRecentPayments((prev) => [
        {
          id: `pay_${Date.now()}`,
          date: "Today",
          description: `Invoice ${selectedInvoice}`,
          amount: invoiceAmount,
          status: "Paid",
        },
        ...prev,
      ])
      toast.success(`Payment for ${selectedInvoice} processed (mock)`)
      setMakePaymentOpen(false)
    } catch {
      toast.error("Payment failed (mock error)")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddMethod = async () => {
    if (!newCard.name || !newCard.number || !newCard.expiry || !newCard.cvv) {
      toast.error("Please fill all fields")
      return
    }

    if (newCard.number.length < 12) {
      toast.error("Card number looks invalid")
      return
    }

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))

    const last4 = newCard.number.slice(-4)

    const newMethod = {
      id: `pm_${Date.now()}`,
      brand: "Card",
      last4,
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods((prev) => [newMethod, ...prev])
    setNewCard({ name: "", number: "", expiry: "", cvv: "" })
    setAddMethodOpen(false)
    setIsSubmitting(false)

    toast.success("Payment method added")
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Billing & Payments"
        description="Review spending, manage payment methods, and see recent payments."
        actions={
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setMakePaymentOpen(true)}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Make payment
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Wallet className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total spent</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${MOCK_BILLING.totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <ArrowDownCircle className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">This month</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${MOCK_BILLING.thisMonth.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Upcoming due</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${MOCK_BILLING.upcomingDue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Current balance</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${MOCK_BILLING.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent payments
          </h3>
          <div className="divide-y divide-green-100">
            {recentPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {payment.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {payment.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-green-600">
                    +${payment.amount.toLocaleString()}
                  </span>
                  <StatusBadge status={payment.status} type="payment" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Payment methods</h3>
            </div>
            <Button
              variant="outline"
              className="border-green-200 text-xs h-8"
              onClick={() => setAddMethodOpen(true)}
            >
              Add method
            </Button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="flex items-center justify-between rounded-md border border-green-100 bg-gray-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {pm.brand} •••• {pm.last4}
                  </p>
                  <p className="text-xs text-gray-500">Expires {pm.expiry}</p>
                </div>
                {pm.isDefault && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Make Payment Modal */}
      <Dialog open={makePaymentOpen} onOpenChange={setMakePaymentOpen}>
        <DialogContent className="border-green-200">
          <DialogHeader>
            <DialogTitle>Make a payment</DialogTitle>
            <DialogDescription>
              Select an invoice and payment method to process a mock payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Invoice</Label>
              <Select
                value={selectedInvoice}
                onValueChange={setSelectedInvoice}
              >
                <SelectTrigger className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                  <SelectValue placeholder="Select invoice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INV-2024-003">INV-2024-003 — $3,200</SelectItem>
                  <SelectItem value="INV-2024-004">INV-2024-004 — $950</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment method</Label>
              <Select
                value={selectedMethod}
                onValueChange={setSelectedMethod}
              >
                <SelectTrigger className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((pm) => (
                    <SelectItem key={pm.id} value={pm.id}>
                      {pm.brand} •••• {pm.last4}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-green-200"
              onClick={() => setMakePaymentOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirmPayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Modal */}
      <Dialog open={addMethodOpen} onOpenChange={setAddMethodOpen}>
        <DialogContent className="border-green-200">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Enter your card details. This is a mock form.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label>Cardholder Name</Label>
              <input
                className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                placeholder="Shruti Bandaswami"
              />
            </div>

            <div>
              <Label>Card Number</Label>
              <input
                className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry (MM/YY)</Label>
                <input
                  className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newCard.expiry}
                  onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                  placeholder="12/26"
                />
              </div>

              <div>
                <Label>CVV</Label>
                <input
                  className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="border-green-200"
              onClick={() => setAddMethodOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAddMethod}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Card"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Billing
