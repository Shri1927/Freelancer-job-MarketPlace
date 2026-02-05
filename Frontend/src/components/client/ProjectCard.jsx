import StatusBadge from "./StatusBadge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ProjectCard = ({ project }) => {
  const navigate = useNavigate()
  const progress = typeof project.progress === "number" ? project.progress : 0

  return (
    <div className="bg-white rounded-lg border border-green-200 p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={project.status} type="project" />
          {project.deadline && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              Due {project.deadline}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span className="font-medium text-gray-800">{progress}%</span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-green-50 [&>div]:bg-green-500"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="border-green-200 text-xs"
          onClick={() =>
            navigate(`/dashboard/client/projects/${encodeURIComponent(project.id)}`)
          }
        >
          View project
        </Button>
      </div>
    </div>
  )
}

export default ProjectCard
