import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageHeader from "@/components/client/PageHeader"
import StatusBadge from "@/components/client/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, DollarSign, ArrowLeft } from "lucide-react"

// Mirror the mock projects used in Projects.jsx
const PROJECTS = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    status: "active",
    budget: 28000,
    deadline: "Dec 15, 2024",
    description:
      "Full redesign of the e-commerce platform with modern UI, improved checkout flow, and mobile responsiveness.",
  },
  {
    id: "2",
    name: "Mobile App Development",
    status: "in-review",
    budget: 42000,
    deadline: "Jan 20, 2025",
    description:
      "Native iOS and Android app for the fitness product. Integration with wearables and cloud sync.",
  },
  {
    id: "3",
    name: "Logo & Brand Identity",
    status: "completed",
    budget: 6500,
    deadline: "Nov 1, 2024",
    description:
      "Complete brand identity including logo, color palette, typography, and brand guidelines.",
  },
  {
    id: "4",
    name: "API Integration Project",
    status: "active",
    budget: 18000,
    deadline: "Dec 28, 2024",
    description:
      "Integration of third-party payment and shipping APIs into the existing backend with full documentation.",
  },
]

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const project = useMemo(
    () => PROJECTS.find((p) => p.id === id) || null,
    [id]
  )

  const title = project ? project.name : "Project not found"

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={
          project
            ? "Overview, status, and recent activity for this project."
            : "We couldn’t find a project with this ID."
        }
        actions={
          <Button
            variant="outline"
            className="border-green-200"
            onClick={() => navigate("/dashboard/client/projects")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to projects
          </Button>
        }
      />

      {!project ? (
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            Double-check the URL or return to the projects list to select a
            project.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <StatusBadge status={project.status} type="project" />
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {project.deadline}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>

            <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Timeline
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Project created and brief finalized</li>
                <li>• Kickoff call completed with assigned freelancer</li>
                <li>• First milestone in progress</li>
                <li>• Next: Design review and implementation</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Budget
              </h3>
              <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                <DollarSign className="w-5 h-5" />
                {project.budget.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Includes all milestones and service fees.
              </p>
            </div>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  Messages (mock)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>
                  • You: “Can we align on the final deliverables this week?”
                </p>
                <p>
                  • Freelancer: “Yes, I’ll share an updated timeline by
                  tomorrow.”
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-green-200 text-xs"
                >
                  Open message thread
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails

