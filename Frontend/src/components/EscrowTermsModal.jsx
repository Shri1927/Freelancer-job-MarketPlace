import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import * as escrowService from "@/lib/escrowService"

const EscrowTermsModal = ({ contract, agreement, onClose, onAgreed }) => {
  const [loading, setLoading] = useState(false)

  const handleAgree = async () => {
    if (!contract) return toast.error("No contract to sign")
    setLoading(true)
    try {
      const updated = await escrowService.signContract(contract.id, agreement?.id)
      toast.success("Agreement signed")
      onAgreed && onAgreed(updated)
      onClose && onClose()
    } catch (err) {
      toast.error(err.message || "Failed to sign agreement")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => !loading && onClose && onClose()} />
      <Card className="z-10 p-6 w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-3">{agreement ? agreement.title : 'Escrow Agreement — Terms & Conditions'}</h3>

        <div className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
          {agreement ? agreement.text : `This is a demo escrow agreement. By signing, you acknowledge that funds deposited into escrow will be held until the client releases them to the freelancer upon successful delivery or until a refund is processed.`}
        </div>

        {agreement && (
          <div className="space-y-2 mb-4 text-sm">
            <p><strong>Summary:</strong> {agreement.summary}</p>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onClose && onClose()} disabled={loading}>Close</Button>
          <Button onClick={handleAgree} disabled={loading}>{loading ? "Signing..." : "I Agree & Sign"}</Button>
        </div>
      </Card>
    </div>
  )
}

export default EscrowTermsModal
