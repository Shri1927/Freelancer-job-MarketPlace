import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import {
  Briefcase,
  Home,
  MessageSquare,
  DollarSign,
  FileText,
  User,
  Star,
  Settings,
  BarChart3,
  Activity,
  Wallet,
  Image as ImageIcon,
  Folder,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MyProposals from "./MyProposals"
import FreelancerDashboard from "./FreelancerDashboard"


 // Your MyProposals content
// ... import other content components

const FreelancerSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const viewParam = searchParams.get('view') || 'dashboard'
  
  // State to track current page
  const [currentPage, setCurrentPage] = useState(viewParam)

  // Update current page when URL query parameter changes
  useEffect(() => {
    const view = searchParams.get('view') || 'dashboard'
    setCurrentPage(view)
  }, [searchParams])

  // Function to render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <FreelancerDashboard/>
      case 'proposals':
        return <MyProposals/>
      case 'jobs':
        return 1
      case 'projects':
        return 1
      case 'messages':
        return 1
      case 'earnings':
        return 1
      case 'withdraw':
        return 1
      case 'transactions':
        return 1
      case 'portfolio':
        return 1
      case 'reviews':
        return 1
      case 'analytics':
        return 1
      case 'activity':
        return 1
      case 'settings':
        return 1
      default:
        return 1
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Left side */}
      <div className="w-64 border-r border-primary/20 sticky top-0 h-screen">
        {/* Sidebar Header */}
        <div className="border-b border-primary/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">FreelanceHub</h2>
              <p className="text-xs text-muted-foreground">Freelancer Portal</p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Main Menu */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Main Menu</h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentPage('dashboard')
                  setSearchParams({ view: 'dashboard' })
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('jobs')
                  setSearchParams({ view: 'jobs' })
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'jobs' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Find Jobs</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('proposals')
                  setSearchParams({ view: 'proposals' })
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'proposals' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>My Proposals</span>
                </div>
                <Badge variant="secondary">18</Badge>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('projects')
                  setSearchParams({ view: 'projects' })
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'projects' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className="w-4 h-4" />
                  <span>Active Projects</span>
                </div>
                <Badge variant="secondary" className="bg-primary text-white">6</Badge>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('messages')
                  setSearchParams({ view: 'messages' })
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'messages' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </div>
                <Badge variant="secondary" className="bg-primary text-white">5</Badge>
              </button>
            </div>
          </div>

          {/* Financial */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Financial</h4>
            <div className="space-y-1">
              <button
                onClick={() => setCurrentPage('earnings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'earnings' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Earnings</span>
              </button>

              <button
                onClick={() => setCurrentPage('withdraw')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'withdraw' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Withdraw Funds</span>
              </button>

              <button
                onClick={() => setCurrentPage('transactions')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'transactions' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Transactions</span>
              </button>
            </div>
          </div>

          {/* Profile & Portfolio */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Profile & Portfolio</h4>
            <div className="space-y-1">
              <button
                onClick={() => setCurrentPage('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'profile' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setCurrentPage('portfolio')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'portfolio' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Portfolio</span>
              </button>

              <button
                onClick={() => setCurrentPage('reviews')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'reviews' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                </div>
                <Badge variant="secondary">42</Badge>
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Analytics</h4>
            <div className="space-y-1">
              <button
                onClick={() => setCurrentPage('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'analytics' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setCurrentPage('activity')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'activity' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Activity Log</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Settings</h4>
            <div className="space-y-1">
              <button
                onClick={() => setCurrentPage('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentPage === 'settings' 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Browse Jobs Button */}
          <div className="mt-8">
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              <Search className="w-4 h-4 mr-2" />
              Browse Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area - Right side */}
      <div className="flex-1 overflow-y-auto bg-gray-50 ">
        {renderContent()}
      </div>
    </div>
  )
}

export default FreelancerSidebar