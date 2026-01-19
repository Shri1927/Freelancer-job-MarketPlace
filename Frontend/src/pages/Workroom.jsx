import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { projectsAPI } from "@/services/api"

const Workroom = () => {
  const { projectId } = useParams()
  const [diary, setDiary] = useState([])
  const [hours, setHours] = useState("")
  const [submission, setSubmission] = useState("")
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (projectId) {
      loadProject()
    }
  }, [projectId])

  const loadProject = async () => {
    try {
      setLoading(true)
      const response = await projectsAPI.getById(projectId)
      setProject(response.data.data || response.data)
    } catch (error) {
      console.error('Error loading project:', error)
      toast.error('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  const addHours = async () => {
    if (!hours || !projectId) return
    try {
      await projectsAPI.updateProgress(projectId, {
        hours: parseFloat(hours),
        note: 'Hours logged',
      })
      setDiary(prev => [...prev, { id: Date.now(), hours }])
      setHours("")
      toast.success("Hours logged successfully")
    } catch (error) {
      console.error('Error logging hours:', error)
      toast.error('Failed to log hours')
    }
  }

  const submitWork = async () => {
    if (!submission.trim() || !projectId) return
    try {
      await projectsAPI.updateProgress(projectId, {
        submission: submission.trim(),
        status: 'submitted',
      })
      toast.success("Work submitted for review")
      setSubmission("")
    } catch (error) {
      console.error('Error submitting work:', error)
      toast.error('Failed to submit work')
    }
  }

  const approve = async () => {
    if (!projectId) return
    try {
      await projectsAPI.updateStatus(projectId, 'completed')
      toast.success("Approved. Payment released (minus platform fee)")
      window.location.href = "/feedback"
    } catch (error) {
      console.error('Error approving work:', error)
      toast.error('Failed to approve work')
    }
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


