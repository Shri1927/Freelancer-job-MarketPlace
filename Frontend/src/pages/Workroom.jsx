import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const Workroom = () => {
  const [diary, setDiary] = useState([])
  const [hours, setHours] = useState("")
  const [submission, setSubmission] = useState("")

  const addHours = () => {
    if (!hours) return
    setDiary(prev => [...prev, { id: Date.now(), hours }])
    setHours("")
  }

  const submitWork = () => {
    if (!submission.trim()) return
    toast.success("Work submitted for review")
    setSubmission("")
  }

  const approve = () => {
    toast.success("Approved. Payment released (minus platform fee)")
    window.location.href = "/feedback"
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Workroom</h1>
          <p className="text-muted-foreground">Track work, submit, and review</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Work Diary (Hourly)</h2>
            <div className="flex gap-2 mb-3">
              <Input placeholder="Hours (e.g., 3.5)" value={hours} onChange={e => setHours(e.target.value)} />
              <Button onClick={addHours}>Add</Button>
            </div>
            <div className="space-y-2">
              {diary.length === 0 && <p className="text-sm text-muted-foreground">No hours logged yet</p>}
              {diary.map(e => (
                <div key={e.id} className="rounded-md border border-border p-2 text-sm">Logged {e.hours} hour(s)</div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Submission (Fixed-price)</h2>
            <Textarea rows={6} placeholder="Describe milestone deliverable or paste links" value={submission} onChange={e => setSubmission(e.target.value)} />
            <div className="mt-3 flex gap-2">
              <Button onClick={submitWork}>Submit</Button>
              <Button variant="outline" onClick={approve}>Approve & Release Payment</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Workroom


