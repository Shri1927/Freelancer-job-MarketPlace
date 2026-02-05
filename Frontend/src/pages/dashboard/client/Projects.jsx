import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ProjectCard from "@/components/client/ProjectCard"
import PageHeader from "@/components/client/PageHeader"
import EmptyState from "@/components/client/EmptyState"
import { cn } from "@/lib/utils"

const MOCK_PROJECTS = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    description:
      "Full redesign of the e-commerce platform with modern UI, improved checkout flow, and mobile responsiveness.",
    status: "active",
    deadline: "Dec 15, 2024",
    progress: 72,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Native iOS and Android app for the fitness product. Integration with wearables and cloud sync.",
    status: "in-review",
    deadline: "Jan 20, 2025",
    progress: 58,
  },
  {
    id: "3",
    name: "Logo & Brand Identity",
    description:
      "Complete brand identity including logo, color palette, typography, and brand guidelines.",
    status: "completed",
    deadline: "Nov 1, 2024",
    progress: 100,
  },
  {
    id: "4",
    name: "API Integration Project",
    description:
      "Integration of third-party payment and shipping APIs into the existing backend with full documentation.",
    status: "active",
    deadline: "Dec 28, 2024",
    progress: 40,
  },
  {
    id: "5",
    name: "Content Marketing Strategy",
    description:
      "Six-month content strategy, including blog calendar, social media plan, and SEO recommendations.",
    status: "on-hold",
    deadline: "Jan 10, 2025",
    progress: 20,
  },
  {
    id: "6",
    name: "Data Analytics Dashboard",
    description:
      "Internal analytics dashboard with real-time KPIs, charts, and export functionality for leadership.",
    status: "completed",
    deadline: "Oct 15, 2024",
    progress: 100,
  },
]

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

  useEffect(() => {
    // Simulate initial loading state for nicer UX
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    if (filter === "all") return MOCK_PROJECTS
    return MOCK_PROJECTS.filter((p) => p.status === filter)
  }, [filter])

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
