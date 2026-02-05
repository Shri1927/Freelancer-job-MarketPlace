import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/client/PageHeader"
import { toast } from "sonner"

const JOBS_STORAGE_KEY = "client_jobs"

const PostJobClient = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [skills, setSkills] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [category, setCategory] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("Intermediate")

  const computedSkills = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newJob = {
      id: `job_${Date.now()}`,
      title,
      description,
      skills: computedSkills,
      budget,
      timeline,
      category,
      experience: experienceLevel,
      status: "Open",
      createdAt: new Date().toISOString(),
    }

    try {
      const existingRaw = localStorage.getItem(JOBS_STORAGE_KEY)
      const existing = existingRaw ? JSON.parse(existingRaw) : []
      const updated = Array.isArray(existing) ? [...existing, newJob] : [newJob]
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated))
      toast.success("Job posted successfully.")
      navigate("/dashboard/client/projects")
    } catch (error) {
      console.error("Failed to save job to localStorage", error)
      toast.error("Something went wrong while saving your job. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Post a Job"
        description="Create a new project brief to invite freelancers."
      />

      <Card className="bg-white border border-green-200 shadow-sm p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. React developer for dashboard redesign"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project scope, goals, deliverables, and any important details freelancers should know."
              required
            />
          </div>

          <div>
            <Label htmlFor="skills">Skills required (comma separated)</Label>
            <Input
              id="skills"
              placeholder="React, Node.js, REST API"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            {computedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {computedSkills.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="$2000 - $3500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline / Duration</Label>
              <Input
                id="timeline"
                placeholder="1-2 months"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Web Development"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Input
                id="experience"
                placeholder="Intermediate"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              Post Job
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/client/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default PostJobClient

