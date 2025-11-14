import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  DollarSign,
  Users,
  FileText,
  ArrowRight,
  Clock,
  CheckCircle,
  MessageSquare
} from "lucide-react"
import jobsData from "@/data/jobs.json"
import bidsData from "@/data/bids.json"

const ClientDashboard = () => {
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const userName = userInfo.name || "Client"

  const stats = [
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: "5",
      color: "text-primary"
    },
    {
      icon: Users,
      label: "Total Proposals",
      value: "42",
      color: "text-accent"
    },
    {
      icon: DollarSign,
      label: "Total Spent",
      value: "$18,500",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      label: "Completed Projects",
      value: "12",
      color: "text-primary-light"
    }
  ]

  const activeJobs = jobsData.slice(0, 3)
  const recentProposals = bidsData.slice(0, 3)

  const activities = [
    {
      action: "New proposal received for",
      job: "Full Stack Developer position",
      time: "2 hours ago"
    },
    {
      action: "Accepted proposal for",
      job: "Mobile App UI/UX Design",
      time: "1 day ago"
    },
    {
      action: "Project completed",
      job: "WordPress Website Redesign",
      time: "3 days ago"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, {userName}! 👋</h1>
          <p className="text-muted-foreground">
            Manage your jobs and find the perfect freelancers for your projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Active Jobs</h2>
              <div className="flex gap-2">
                <Link to="/post-job">
                  <Button variant="outline" className="gap-2">
                    Post New Job
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="ghost" className="gap-2">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {activeJobs.map(job => (
                <Card
                  key={job.id}
                  className="p-6 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold hover:text-primary transition-colors mb-2">
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {job.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.proposals} proposals
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">
                      {job.budget}
                    </span>
                    <div className="flex gap-2">
                      <Link to={`/jobs/${job.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/jobs/${job.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Proposals
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Proposals & Activity */}
          <div className="space-y-6">
            {/* Recent Proposals */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Proposals</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  {recentProposals.map(proposal => (
                    <div
                      key={proposal.id}
                      className="border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <img
                          src={proposal.freelancer.avatar}
                          alt={proposal.freelancer.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {proposal.freelancer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {proposal.amount} • {proposal.duration}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            proposal.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {proposal.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {proposal.coverLetter}
                      </p>
                    </div>
                  ))}
                </div>
                <Link to="/jobs">
                  <Button variant="ghost" className="w-full mt-4" size="sm">
                    View All Proposals
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Activity Feed */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <p className="text-sm font-medium mb-1">
                        {activity.action}{" "}
                        <span className="text-primary">{activity.job}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-primary text-primary-foreground">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-sm opacity-90 mb-4">
                Post a new job to find talented freelancers
              </p>
              <Link to="/post-job">
                <Button variant="secondary" className="w-full">
                  Post a Job
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ClientDashboard

