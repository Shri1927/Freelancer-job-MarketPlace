import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CheckCircle } from "lucide-react"
import * as escrowService from "@/lib/escrowService"

const FundEscrowModal = ({ contract, onClose, onFunded }) => {
  const remaining = useMemo(() => {
    if (!contract) return 0
    return Math.max(0, Number(contract.amount) - Number(contract.fundedAmount))
  }, [contract])

  const [amount, setAmount] = useState(remaining || 0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handlePay = async () => {
    if (!contract) return
    const value = Number(amount)
    if (!value || value <= 0) return toast.error("Enter a valid amount")
    if (value > remaining) return toast.error("Amount exceeds remaining due")

    setLoading(true)
    try {
      // simulate payment
      const updated = await escrowService.fundContract(contract.id, value)
      setSuccess({ amount: value, updated })
      onFunded && onFunded(updated)
      toast.success(`$${value} funded to escrow`)
    } catch (err) {
      toast.error(err.message || "Payment failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDone = () => {
    setSuccess(null)
    onClose && onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black/50 ${loading || success ? "pointer-events-none" : "cursor-pointer"}`}
        onClick={() => { if (!loading && !success) onClose && onClose() }}
      />

      <Card className={`z-10 p-6 w-full max-w-md ${success ? "animate-fade-in-up" : ""}`}>
        {!success ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Fund Escrow</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Paying into escrow for contract <strong>{contract?.id}</strong>
            </p>

            <div className="grid gap-2 mb-4">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  min={1}
                  max={remaining}
                  step="1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Remaining due: <strong>${remaining}</strong></p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
              <Button className="bg-gradient-primary" onClick={handlePay} disabled={loading}>{loading ? "Processing..." : "Pay"}</Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold">Payment successful</h4>
            <p className="text-sm text-muted-foreground">${success.amount} has been added to escrow.</p>
            <div className="mt-2 w-full">
              <div className="rounded-md border border-border p-3 bg-secondary/50">
                <p className="text-sm">Contract: <strong>{success.updated.id}</strong></p>
                <p className="text-sm">Funded: <strong>${success.updated.fundedAmount} / ${success.updated.amount}</strong></p>
                <p className="text-sm text-muted-foreground">Status: {success.updated.status}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button onClick={handleDone} className="bg-gradient-primary">Done</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default FundEscrowModal
