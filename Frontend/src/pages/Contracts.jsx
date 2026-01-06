import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as escrowService from "@/lib/escrowService"
import { toast } from "sonner"

const Contracts = () => {
  const [contracts, setContracts] = useState([])

  const load = () => {
    setContracts(escrowService.listContracts())
  }

  useEffect(() => {
    load()
  }, [])

  const handleRelease = async id => {
    if (!window.confirm("Release funds to freelancer?")) return
    try {
      await escrowService.releaseFunds(id)
      toast.success("Released")
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleRefund = async id => {
    if (!window.confirm("Refund this contract? This will empty the escrow.")) return
    try {
      await escrowService.refundContract(id)
      toast.success("Refunded")
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const clearAll = () => {
    escrowService.clearContracts()
    load()
    toast.success("Cleared demo contracts")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Demo Contracts</h1>
          <Button variant="outline" onClick={clearAll}>Clear Demo Data</Button>
        </div>

        <div className="space-y-4">
          {contracts.length === 0 && (
            <Card className="p-6">No demo contracts. Use the Jobs page and click "Hire & Fund" on a bid to create one.</Card>
          )}

          {contracts.map(c => (
            <Card key={c.id} className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{c.id}</p>
                <p className="font-semibold">${c.fundedAmount} / ${c.amount} — {c.status}</p>
                <p className="text-sm">Job: {c.jobId} • Freelancer: {c.freelancerId}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleRelease(c.id)} disabled={c.fundedAmount <= 0}>Release</Button>
                <Button variant="destructive" onClick={() => handleRefund(c.id)} disabled={c.fundedAmount <= 0}>Refund</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contracts
