import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import usersData from "@/data/users.json"
import { toast } from "sonner"

const InviteFreelancers = () => {
  const [selectedIds, setSelectedIds] = useState([])

  const toggle = id => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }

  const invite = () => {
    if (selectedIds.length === 0) {
      toast.message("Select at least one freelancer")
      return
    }
    toast.success(`Invited ${selectedIds.length} freelancer(s)`)    
    setSelectedIds([])
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Invite Freelancers</h1>
          <p className="text-muted-foreground">Send invitations to relevant talent</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {usersData.map(user => (
            <Card key={user.id} className={`p-6 ${selectedIds.includes(user.id) ? "ring-2 ring-primary" : ""}`}>
              <div className="flex items-start gap-4">
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                    <Button size="sm" variant={selectedIds.includes(user.id) ? "secondary" : "outline"} onClick={() => toggle(user.id)}>
                      {selectedIds.includes(user.id) ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.skills.slice(0, 6).map(s => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="bg-gradient-primary" onClick={invite}>Send Invitations</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/messages")}>Open Messages</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default InviteFreelancers


