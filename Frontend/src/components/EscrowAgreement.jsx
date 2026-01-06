import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import * as escrowService from "@/lib/escrowService"
import demoAgreements from "@/lib/demoAgreements"

const Box = ({ title, subtitle }) => (
  <div className="flex flex-col items-center gap-2 p-3 rounded-md border border-border w-40">
    <div className="font-semibold">{title}</div>
    {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
  </div>
)

const EscrowAgreement = ({ contract, onSigned, openTerms }) => {
  const [accepted, setAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const defaultAgreement = useMemo(() => contract?.agreement?.id || demoAgreements[0].id, [contract])
  const [selected, setSelected] = useState(defaultAgreement)

  const selectedAgreement = demoAgreements.find(a => a.id === selected)

  const handleSign = async () => {
    if (!contract) return toast.error("No contract available")
    if (!accepted) return toast.error("You must accept the terms before signing")
    setLoading(true)
    try {
      const updated = await escrowService.signContract(contract.id, selectedAgreement?.id)
      toast.success("Escrow agreement signed")
      onSigned && onSigned(updated)
    } catch (err) {
      toast.error(err.message || "Unable to sign agreement")
    } finally {
      setLoading(false)
    }
  }

  if (!contract) return null

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Escrow Agreement</h3>
      <p className="text-sm text-muted-foreground mb-4">Sign the terms and conditions to enable escrow funding and protection for both client and freelancer.</p>

      <div className="mb-4">
        <svg className="w-full max-w-xl mx-auto" viewBox="0 0 800 240" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4A5568" />
            </marker>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.06" />
            </filter>
          </defs>

          {/* Left: Buyer */}
          <g>
            <rect x="40" y="20" width="220" height="80" rx="10" fill="#E6FFFA" stroke="#2F855A" strokeWidth="2" />
            <text x="150" y="50" textAnchor="middle" fill="#1A202C" fontSize="18" fontWeight="700">Buyer</text>
            <text x="150" y="72" textAnchor="middle" fill="#4A5568" fontSize="12">Client</text>
          </g>

          {/* Right: Seller */}
          <g>
            <rect x="540" y="20" width="220" height="80" rx="10" fill="#E6FFFA" stroke="#2F855A" strokeWidth="2" />
            <text x="650" y="50" textAnchor="middle" fill="#1A202C" fontSize="18" fontWeight="700">Seller</text>
            <text x="650" y="72" textAnchor="middle" fill="#4A5568" fontSize="12">Freelancer</text>
          </g>

          {/* Arrow between buyer & seller */}
          <g>
            <line x1="260" y1="60" x2="540" y2="60" stroke="#4A5568" strokeWidth="6" markerEnd="url(#arrow)" strokeLinecap="round" />
            <text x="400" y="40" textAnchor="middle" fill="#2D3748" fontSize="12">Dispatch deliverables</text>
          </g>

          {/* Escrow Agent below */}
          <g>
            <rect x="330" y="110" width="140" height="60" rx="10" fill="#fff" stroke="#2F855A" strokeWidth="1.5" filter="url(#shadow)" />
            <circle cx="400" cy="100" r="26" fill="#2F855A" />
            <text x="400" y="104" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Agent</text>
            <text x="400" y="148" textAnchor="middle" fill="#4A5568" fontSize="12">Therefore, Appoints Escrow Agent</text>
          </g>
        </svg>

        <div className="mt-4 p-3 rounded-md border border-border bg-secondary/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm">To Sign the Terms and Conditions of <strong>Escrow Agreement</strong></div>
            <div className="flex items-center gap-2">
              <button onClick={() => openTerms(selectedAgreement)} className="text-sm text-primary underline">View Terms</button>
              <div className="p-2 rounded-md bg-primary text-white">✍️</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground w-32">Select Agreement</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} className="rounded-md border px-2 py-1">
              {demoAgreements.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
            <div className="text-xs text-muted-foreground ml-4">{selectedAgreement?.summary}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox checked={accepted} onCheckedChange={val => setAccepted(!!val)} />
          <div className="text-sm">I have read and accept the <button onClick={() => openTerms(selectedAgreement)} className="text-primary underline">terms & conditions</button></div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openTerms(selectedAgreement)}>View Terms</Button>
          <Button onClick={handleSign} disabled={loading || !accepted}>{loading ? "Signing..." : (contract?.signed ? "Signed" : "Sign Agreement")}</Button>
        </div>
      </div>
    </Card>
  )
}

export default EscrowAgreement