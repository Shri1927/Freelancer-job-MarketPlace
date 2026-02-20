import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ProjectCard from "@/components/client/ProjectCard"
import PageHeader from "@/components/client/PageHeader"
import EmptyState from "@/components/client/EmptyState"
import { cn } from "@/lib/utils"
import { apiFetch } from "@/lib/apiClient"

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "In Review", value: "in-review" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "on-hold" },
]

const Projects = () => {
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      setIsLoading(true)
      try {
        const data = await apiFetch("/client/projects", { method: "GET" })
        if (!isMounted) return

        const normalized = (Array.isArray(data) ? data : data?.projects || []).map(
          (p) => ({
            id: p.id,
            name: p.title || p.name,
            description: p.description,
            status: p.status || "active",
            deadline: p.deadline || p.due_date,
            progress: p.progress ?? 0,
          })
        )

        setProjects(normalized)
      } catch (err) {
        console.error("Failed to load client projects:", err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    if (filter === "all") return projects
    return projects.filter((p) => p.status === filter)
  }, [filter, projects])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="View, filter, and track the progress of your projects."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.value}
            variant="outline"
            size="sm"
            onClick={() => setFilter(f.value)}
            className={cn(
              "border-green-200",
              filter === f.value && "bg-green-50 text-green-700 border-green-300"
            )}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-green-200 p-5"
            >
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects match this filter"
          description="Try changing the status filter or creating a new project in your workspace."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects
