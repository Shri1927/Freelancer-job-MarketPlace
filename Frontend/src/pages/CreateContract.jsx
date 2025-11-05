import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const CreateContract = () => {
  const [type, setType] = useState("hourly")
  const [hourlyRate, setHourlyRate] = useState("50")
  const [weeklyLimit, setWeeklyLimit] = useState("20")
  const [milestones, setMilestones] = useState([{ title: "Initial Draft", amount: "500" }])
  const [newMilestone, setNewMilestone] = useState({ title: "", amount: "" })

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.amount) return
    setMilestones(prev => [...prev, newMilestone])
    setNewMilestone({ title: "", amount: "" })
  }

  const create = () => {
    toast.success("Contract created")
    window.location.href = "/workroom"
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

        <div className="mt-6">
          <Button className="bg-gradient-primary" onClick={create}>Create Contract</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateContract


