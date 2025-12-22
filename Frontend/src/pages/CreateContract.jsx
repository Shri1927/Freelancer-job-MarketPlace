import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import FundEscrowModal from "@/components/FundEscrowModal"
import EscrowAgreement from "@/components/EscrowAgreement"
import EscrowTermsModal from "@/components/EscrowTermsModal"
import * as escrowService from "@/lib/escrowService"

const CreateContract = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const prefillJobId = params.get("jobId")
  const prefillFreelancerId = params.get("freelancerId")
  const prefillAmount = params.get("amount")

  const [type, setType] = useState("hourly")
  const [hourlyRate, setHourlyRate] = useState("50")
  const [weeklyLimit, setWeeklyLimit] = useState("20")
  const [milestones, setMilestones] = useState([{ title: "Initial Draft", amount: "500" }])
  const [newMilestone, setNewMilestone] = useState({ title: "", amount: "" })

  // Contract/funding state for demo
  const [contract, setContract] = useState(null)
  const [showFundModal, setShowFundModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [termsAgreement, setTermsAgreement] = useState(null)

  useEffect(() => {
    // if prefill params exist, pre-create a contract in draft mode for demo
    const prefill = async () => {
      if (prefillJobId && prefillFreelancerId && prefillAmount) {
        try {
          const c = await escrowService.createContract({ jobId: prefillJobId, clientId: "demo-client", freelancerId: prefillFreelancerId, amount: Number(prefillAmount) })
          setContract(c)
        } catch (err) {
          console.error(err)
        }
      }
    }
    prefill()
  }, [prefillJobId, prefillFreelancerId, prefillAmount])

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.amount) return
    setMilestones(prev => [...prev, newMilestone])
    setNewMilestone({ title: "", amount: "" })
  }

  const create = () => {
    toast.success("Contract created")
    navigate("/workroom")
  }

  const handleOpenFund = () => {
    if (!contract) {
      toast.error("No contract found to fund — try passing jobId, freelancerId and amount as query params to prefill the contract for demo.")
      return
    }
    if (!contract.signed) {
      toast.error("You must sign the escrow agreement before funding")
      return
    }
    setShowFundModal(true)
  }

  const handleFunded = updatedContract => {
    setContract(updatedContract)
    toast.success("Escrow funded — contract status: " + updatedContract.status)
  }

  const handleRelease = async () => {
    if (!window.confirm("Are you sure you want to release funds to the freelancer?")) return
    try {
      const updated = await escrowService.releaseFunds(contract.id)
      setContract(updated)
      toast.success("Funds released to freelancer")
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleRefund = async () => {
    if (!window.confirm("Are you sure you want to refund the client? This will empty the escrow.")) return
    try {
      const updated = await escrowService.refundContract(contract.id)
      setContract(updated)
      toast.success("Funds refunded to client")
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Create Contract</h1>
          <p className="text-muted-foreground">Choose hourly or fixed-price</p>
        </div>

        <div className="flex gap-3 mb-6">
          <Button variant={type === "hourly" ? "default" : "outline"} onClick={() => setType("hourly")}>Hourly</Button>
          <Button variant={type === "fixed" ? "default" : "outline"} onClick={() => setType("fixed")}>Fixed-price</Button>
        </div>

        {type === "hourly" ? (
          <Card className="p-6 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input id="rate" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="limit">Weekly Limit (hours)</Label>
                <Input id="limit" value={weeklyLimit} onChange={e => setWeeklyLimit(e.target.value)} />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Track time with Work Diary after starting the contract.</p>
            </div>
          </Card>
        ) : (
          <Card className="p-6 max-w-2xl">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Set milestones for the project.</p>
            </div>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-border p-3">
                  <div>
                    <p className="font-medium">{m.title}</p>
                    <Badge variant="outline">${m.amount}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <Input placeholder="Milestone title" value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })} />
              <Input placeholder="Amount" value={newMilestone.amount} onChange={e => setNewMilestone({ ...newMilestone, amount: e.target.value })} />
            </div>
            <div className="mt-3">
              <Button variant="outline" onClick={addMilestone}>Add Milestone</Button>
            </div>
          </Card>
        )}

        <div className="mt-6 flex flex-col gap-3 max-w-2xl">
          {/* Agreement & actions */}
          {contract && (
            <div className="space-y-3">
              {!contract.signed && (
                <EscrowAgreement contract={contract} onSigned={(c) => { setContract(c); toast.success("Agreement signed") }} openTerms={(agreement) => { setTermsAgreement(agreement); setShowTermsModal(true) }} />
              )}

              <div className="flex gap-3">
                <Button className="bg-gradient-primary" onClick={create}>Create Contract</Button>
                <Button variant="outline" onClick={handleOpenFund} disabled={!contract || !contract.signed}>Fund Escrow</Button>
              </div>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Contract ID</p>
                    <p className="font-medium">{contract.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold">{contract.status}{contract.signed ? " • Signed" : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Funded</p>
                    <p className="font-semibold">${contract.fundedAmount} / ${contract.amount}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                  <Button onClick={handleRelease} disabled={contract.fundedAmount <= 0}>Release Funds</Button>
                  <Button variant="destructive" onClick={handleRefund} disabled={contract.fundedAmount <= 0}>Refund</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {showTermsModal && contract && (
        <EscrowTermsModal contract={contract} agreement={termsAgreement} onClose={() => { setShowTermsModal(false); setTermsAgreement(null) }} onAgreed={(c) => { setContract(c); setTermsAgreement(null); toast.success("Agreement signed") }} />
      )}

      {showFundModal && contract && (
        <FundEscrowModal contract={contract} onClose={() => setShowFundModal(false)} onFunded={handleFunded} />
      )}
    </div>
  )
}

export default CreateContract


