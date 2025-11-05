import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"

const PostJob = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState("")
  const [budget, setBudget] = useState("")
  const [duration, setDuration] = useState("")
  const [category, setCategory] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("Intermediate")

  const handleSubmit = e => {
    e.preventDefault()
    toast.success("Job posted! You can now invite freelancers.")
    navigate("/invitations")
  }

  const computedSkills = skills
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a Job</h1>
          <p className="text-muted-foreground">Describe the work and requirements</p>
        </div>

        <Card className="p-6 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={6} value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="skills">Skills required (comma separated)</Label>
              <Input id="skills" placeholder="React, Node.js, REST API" value={skills} onChange={e => setSkills(e.target.value)} />
              {computedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {computedSkills.map(s => (
                    <Badge key={s} variant="outline">{s}</Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" placeholder="$2000 - $3500" value={budget} onChange={e => setBudget(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="duration">Timeline / Duration</Label>
                <Input id="duration" placeholder="1-2 months" value={duration} onChange={e => setDuration(e.target.value)} required />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Web Development" value={category} onChange={e => setCategory(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Input id="experience" placeholder="Intermediate" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-gradient-primary">Post Job</Button>
              <Link to="/jobs">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>

        <div className="max-w-3xl mt-6">
          <Card className="p-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">After posting, invite freelancers or wait for proposals.</p>
            <Link to="/invitations">
              <Button size="sm" variant="secondary">Invite Freelancers</Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PostJob


