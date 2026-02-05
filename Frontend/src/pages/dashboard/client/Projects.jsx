import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeader from "@/components/client/PageHeader"
import EmptyState from "@/components/client/EmptyState"
import StatusBadge from "@/components/client/StatusBadge"
import { cn } from "@/lib/utils"

const JOBS_STORAGE_KEY = "client_jobs"

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
]

const Projects = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    // Simulate initial loading state for nicer UX
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOBS_STORAGE_KEY)
      if (!stored) {
        setJobs([])
        return
      }
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setJobs(parsed)
      } else {
        setJobs([])
      }
    } catch (error) {
      console.error("Failed to load client jobs from localStorage", error)
      setJobs([])
    }
  }, [])

  const filtered = useMemo(() => {
    if (filter === "all") return jobs

    return jobs.filter((job) => {
      const status = (job.status || "").toString().toLowerCase()
      if (filter === "open") return status === "open"
      if (filter === "in-progress") return status === "in progress" || status === "in-progress"
      if (filter === "completed") return status === "completed"
      return true
    })
  }, [jobs, filter])

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
      ) : jobs.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Post your first job to start working with top freelancers on FreelanceHub."
          action={
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate("/dashboard/client/post-job")}
            >
              Post your first job
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No projects match this filter"
          description="Try changing the status filter or creating a new project in your workspace."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => {
            const createdDate = job.createdAt
              ? new Date(job.createdAt)
              : null
            const formattedDate = createdDate
              ? createdDate.toLocaleDateString()
              : "—"

            return (
              <div
                key={job.id}
                className="bg-white rounded-lg border border-green-200 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={job.status} type="project" />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formattedDate !== "—"
                        ? `Created ${formattedDate}`
                        : "Creation date unavailable"}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-700">
                  <div>
                    <span className="font-medium text-gray-900">Budget: </span>
                    <span>{job.budget || "Not specified"}</span>
                  </div>
                  {job.timeline && (
                    <div className="text-gray-600">
                      <span className="font-medium text-gray-900">
                        Timeline:{" "}
                      </span>
                      <span>{job.timeline}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Projects
