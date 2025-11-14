import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  FileText,
  CheckCircle
} from "lucide-react"
import jobsData from "@/data/jobs.json"

const FreelancerDashboard = () => {
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const userName = userInfo.name || "Freelancer"

  const stats = [
    {
      icon: Briefcase,
      label: "Active Proposals",
      value: "8",
      color: "text-primary"
    },
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: "$12,450",
      color: "text-accent"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "92%",
      color: "text-primary-light"
    }
  ]

  const recentJobs = jobsData.slice(0, 3)

  const activities = [
    {
      action: "Submitted proposal for",
      job: "Full Stack Developer position",
      time: "2 hours ago"
    },
    {
      action: "Accepted by client for",
      job: "Mobile App UI/UX Design",
      time: "1 day ago"
    },
    {
      action: "Completed project",
      job: "WordPress Website Redesign",
      time: "3 days ago"
    }
  ]

  const myProposals = [
    {
      jobTitle: "Full Stack Developer for E-commerce Platform",
      amount: "$6,500",
      status: "pending",
      submittedDate: "2 days ago"
    },
    {
      jobTitle: "Python Backend Developer for AI Integration",
      amount: "$8,000",
      status: "accepted",
      submittedDate: "5 days ago"
    },
    {
      jobTitle: "Content Writer for Tech Blog",
      amount: "$750",
      status: "pending",
      submittedDate: "1 week ago"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, {userName}! 👋</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your freelance work
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
          {/* Recommended Jobs */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Jobs</h2>
              <Link to="/jobs">
                <Button variant="ghost" className="gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentJobs.map(job => (
                <Card
                  key={job.id}
                  className="p-6 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                      <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">
                      {job.budget}
                    </span>
                    <Link to={`/jobs/${job.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Proposals */}
            <div>
              <h2 className="text-2xl font-bold mb-6">My Proposals</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  {myProposals.map((proposal, index) => (
                    <div
                      key={index}
                      className="border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <p className="font-semibold text-sm mb-1 line-clamp-1">
                        {proposal.jobTitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {proposal.amount} • {proposal.submittedDate}
                        </span>
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

            {/* Profile Completion */}
            <Card className="p-6 bg-gradient-primary text-primary-foreground">
              <h3 className="font-bold text-lg mb-2">Ready to grow?</h3>
              <p className="text-sm opacity-90 mb-4">
                Complete your profile to get more job matches
              </p>
              <Link to="/profile">
                <Button variant="secondary" className="w-full">
                  Update Profile
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

export default FreelancerDashboard

