import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Briefcase,
  Home,
  MessageSquare,
  DollarSign,
  Bell,
  Settings,
  BarChart3,
  Activity,
  FileText,
  User,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Upload,
  Download,
  Search,
  Filter,
  LogOut,
  Mail,
  Calendar,
  PieChart,
  LineChart as LineChartIcon,
  File,
  Award,
  Target,
  Zap,
  Wallet,
  CreditCard,
  TrendingDown,
  Eye,
  ThumbsUp,
  Users,
  Plus,
  Edit,
  Camera,
  Sparkles,
  Timer,
  Folder,
  MoreVertical,
  Send,
  PlayCircle,
  Image as ImageIcon,
  Menu,
  X,
  Users2,
  CheckSquare,
  GraduationCap
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

import { useAuthStore } from '@/store/auth'
import jobsData from '@/data/jobs.json'
import bidsData from '@/data/bids.json'

// Import your content components
import MyProposals from './MyProposals'
import ActiveProjects from './ActiveProjects'
import Discover from './Discover'
import { MessagesLayout } from '@/components/messages/MessagesLayout'
import MilestonesTasks from './MilestonesTasks'
import Earning from './Earnings'
import Withdraws from './Withdraws'
import Transactions from './Transactions'
import Portfolio from './Portfolio'
import Profile from './Profile'
import Setting from './Settings'
import Achievements from './Achievements'

const FreelancerDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, user } = useAuthStore()
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  const userName = userInfo.name || 'Freelancer'
  const userEmail = userInfo.email || 'freelancer@example.com'
  const profileCompletion = 75 // Percentage

  // State for current view
  const [currentView, setCurrentView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Dashboard Overview Stats - UPDATED with all essential metrics
  const stats = [
    { icon: DollarSign, label: 'Total Earnings', value: '$24,850', change: '+3,200', trend: 'up', color: 'text-green-600', bgColor: 'bg-green-100' },
    { icon: Wallet, label: 'Available Balance', value: '$8,450', change: 'Ready to withdraw', trend: 'up', color: 'text-primary', bgColor: 'bg-primary/10' },
    { icon: Clock, label: 'Pending Earnings', value: '$4,200', change: 'In progress', trend: 'neutral', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { icon: Briefcase, label: 'Active Projects', value: '6', change: '+2', trend: 'up', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { icon: FileText, label: 'Proposals Sent', value: '18', change: '3 this week', trend: 'up', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { icon: Star, label: 'Average Rating', value: '4.9', change: 'From 42 reviews', trend: 'up', color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ]

  // Earnings Chart Data
  const earningsData = [
    { month: 'Jan', earnings: 3200, pending: 800 },
    { month: 'Feb', earnings: 4100, pending: 1200 },
    { month: 'Mar', earnings: 3800, pending: 900 },
    { month: 'Apr', earnings: 5200, pending: 1500 },
    { month: 'May', earnings: 4800, pending: 1100 },
    { month: 'Jun', earnings: 6200, pending: 1800 }
  ]

  // Proposal Status Data
  const proposalStatusData = [
    { name: 'Active', value: 8, fill: 'hsl(142, 76%, 36%)' },
    { name: 'Accepted', value: 6, fill: 'hsl(142, 70%, 45%)' },
    { name: 'Declined', value: 3, fill: 'hsl(0, 72%, 51%)' },
    { name: 'Expired', value: 1, fill: 'hsl(24, 95%, 53%)' }
  ]

  // Performance Metrics - UPDATED with key freelancer metrics
  const performanceData = [
    { metric: 'Job Success Score', value: 92, target: 90 },
    { metric: 'On-Time Delivery', value: 96, target: 90 },
    { metric: 'Response Rate', value: '100%', target: '90%' },
    { metric: 'Repeat Client Rate', value: 68, target: 70 }
  ]

  // Active Projects
  const activeProjects = jobsData.slice(0, 6).map((job, index) => ({
    ...job,
    status: ['In Progress', 'Review', 'Pending Feedback', 'On Hold'][index % 4],
    deadline: new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    progress: [65, 90, 45, 30][index % 4],
    client: { name: ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Wilson'][index % 4] },
    rating: (4.8 + Math.random() * 0.2).toFixed(1),
    earnings: [2500, 4500, 1800, 3200][index % 4],
    hours: [40, 60, 25, 35][index % 4]
  }))

  // Proposals
  const proposals = [
    { id: 1, jobTitle: 'Full Stack Developer for E-commerce Platform', amount: '$6,500', status: 'Submitted', submittedDate: '2 days ago', views: 5, clientName: 'Tech Corp' },
    { id: 2, jobTitle: 'Python Backend Developer for AI Integration', amount: '$8,000', status: 'Accepted', submittedDate: '5 days ago', views: 12, clientName: 'AI Solutions' },
    { id: 3, jobTitle: 'Content Writer for Tech Blog', amount: '$750', status: 'Declined', submittedDate: '1 week ago', views: 3, clientName: 'Blog Media' },
    { id: 4, jobTitle: 'Mobile App UI/UX Design', amount: '$4,200', status: 'Submitted', submittedDate: '3 days ago', views: 8, clientName: 'Design Studio' }
  ]

  // Recent Activity - UPDATED with comprehensive activities
  const activities = [
    { icon: CheckCircle, action: 'Proposal accepted for', target: 'Python Backend Developer', time: '1 hour ago' },
    { icon: MessageSquare, action: 'New message from', target: 'John Smith', time: '2 hours ago' },
    { icon: DollarSign, action: 'Payment received', target: '$2,500 for Website Redesign', time: '1 day ago' },
    { icon: Star, action: 'New 5-star review from', target: 'Sarah Johnson', time: '2 days ago' },
    { icon: Briefcase, action: 'Job invitation for', target: 'Full Stack Developer', time: '3 days ago' }
  ]

  // Notifications - UPDATED with comprehensive notifications
  const notifications = [
    { id: 1, title: 'Proposal accepted!', message: 'Your proposal for Python Backend Developer was accepted', time: '1h ago', unread: true, type: 'success' },
    { id: 2, title: 'New job invitation', message: "You've been invited to apply for a Full Stack Developer position", time: '2h ago', unread: true, type: 'info' },
    { id: 3, title: 'New message', message: 'John Smith sent you a message about your project', time: '3h ago', unread: true, type: 'message' },
    { id: 4, title: 'Payment received', message: '$2,500 has been added to your available balance', time: '1d ago', unread: false, type: 'payment' },
    { id: 5, title: 'New review', message: 'You received a 5-star review from Sarah Johnson', time: '2d ago', unread: false, type: 'review' }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'bg-primary/10 text-primary border-primary/20',
      'Review': 'bg-orange-100 text-orange-700 border-orange-200',
      'Pending Feedback': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'On Hold': 'bg-red-100 text-red-700 border-red-200',
      'Submitted': 'bg-blue-100 text-blue-700 border-blue-200',
      'Accepted': 'bg-green-100 text-green-700 border-green-200',
      'Declined': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  // Function to render content based on current view - UPDATED with all sidebar items
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboardContent()
      case 'discover':
        return <Discover />
      case 'proposals':
        return <MyProposals/>
      case 'projects':
        return <ActiveProjects />
      case 'messages':
        return <MessagesLayout />
      case 'earnings':
        return <Earning/>
      case 'withdraw':
        return <Withdraws/>
      case 'tranascations':
        return <Transactions/>
      case 'portfolio':
        return <Portfolio/>
      case 'profile':
        return <Profile/>
        case 'achievements':
        return <Achievements/>
      case 'settings':
        return <Setting/>
      default:
        return renderDashboardContent()
    }
  }

  // Dashboard content function - ENHANCED with all essential features[file:29]
  const renderDashboardContent = () => (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 w-full">
      {/* Welcome Section with Profile Completion */}
      <div className="mb-6 sm:mb-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              Welcome Back, {userName}!
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Here's an overview of your freelance work and earnings
            </p>
          </div>
          <Link to="/profile">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Edit className="w-4 h-4" />
              Complete Profile
            </Button>
          </Link>
        </div>

        {/* Profile Completion Bar */}
        <Card className="p-4 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium">Profile Completion</span>
            </div>
            <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            Complete your profile to get more job matches and increase your visibility
          </p>
        </Card>
      </div>

      {/* Stats Grid - RESPONSIVE */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-3 sm:p-4 hover:shadow-large transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up border-primary/20 hover:border-primary/40"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              </div>
              {stat.trend === 'up' && (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              )}
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{stat.label}</p>
            <p className="text-xs text-green-600 line-clamp-1">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row - RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Earnings Chart */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Earnings Overview</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <ChartContainer
            config={{
              earnings: { label: 'Earnings', color: 'hsl(142, 76%, 36%)' },
              pending: { label: 'Pending', color: 'hsl(24, 95%, 53%)' }
            }}
            className="h-[250px] sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(142, 20%, 90%)" />
                <XAxis dataKey="month" stroke="hsl(142, 20%, 50%)" fontSize={12} />
                <YAxis stroke="hsl(142, 20%, 50%)" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="earnings" stackId="1" stroke="hsl(142, 76%, 36%)" fill="hsl(142, 76%, 36%)" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="hsl(24, 95%, 53%)" fill="hsl(24, 95%, 53%)" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Proposal Status Chart */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Proposal Status</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Current proposals</p>
            </div>
            <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <ChartContainer
            config={{
              active: { label: 'Active', color: 'hsl(142, 76%, 36%)' },
              accepted: { label: 'Accepted', color: 'hsl(142, 70%, 45%)' },
              declined: { label: 'Declined', color: 'hsl(0, 72%, 51%)' },
              expired: { label: 'Expired', color: 'hsl(24, 95%, 53%)' }
            }}
            className="h-[250px] sm:h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={proposalStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {proposalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </div>

      {/* Performance Metrics - RESPONSIVE */}
      <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300 mb-6 sm:mb-8" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-1">Performance Metrics</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Track your success indicators</p>
          </div>
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {performanceData.map((metric, index) => (
            <div key={index} className="p-3 sm:p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{metric.metric}</span>
                {metric.value >= metric.target ? (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-2">
                <span className="text-xl sm:text-2xl font-bold">{metric.value}</span>
                <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
              </div>
              <Progress value={metric.value} className="h-1.5 sm:h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Active Projects and Proposals - RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Active Projects */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1">Active Projects</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{activeProjects.length} active</p>
            </div>
            <Link to="/dashboard/freelancer?view=projects">
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                View All
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {activeProjects.slice(0, 4).map((project) => (
              <div key={project.id} className="p-3 sm:p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-2">
                    <h4 className="font-medium text-xs sm:text-sm mb-1 line-clamp-1">{project.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{project.client?.name}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)} variant="outline" size="sm">
                    <span className="hidden xs:inline">{project.status}</span>
                    <span className="xs:hidden text-xs">{project.status.split(' ')[0]}</span>
                  </Badge>
                </div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2 mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    ${project.earnings?.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.hours} hrs worked</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={project.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-8 sm:w-10">{project.progress}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Due {project.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* My Proposals */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-1">My Proposals</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{proposals.length} total</p>
            </div>
            <Link to="/myproposals">
              <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                View All
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="p-3 sm:p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-2">
                    <h4 className="font-medium text-xs sm:text-sm mb-1 line-clamp-1">{proposal.jobTitle}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{proposal.clientName}</p>
                  </div>
                  <Badge className={getStatusColor(proposal.status)} variant="outline" size="sm">
                    <span className="hidden xs:inline">{proposal.status}</span>
                    <span className="xs:hidden text-xs">{proposal.status.split(' ')[0]}</span>
                  </Badge>
                </div>
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-primary">{proposal.amount}</span>
                  <div className="flex items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{proposal.views}</span>
                    </div>
                    <span className="hidden sm:inline">{proposal.submittedDate}</span>
                    <span className="hidden xs:inline">2d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions - RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Recent Activity</h3>
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors border-l-2 border-primary">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <activity.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium mb-1 line-clamp-1">
                    {activity.action} <span className="text-primary">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 sm:mt-4 size-sm">
            View All Activity
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
          </Button>
        </Card>

        {/* Quick Actions - UPDATED with essential freelancer actions */}
        <Card className="p-4 sm:p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Quick Actions</h3>
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Link to="/jobs">
              <Button variant="outline" className="w-full h-20 sm:h-24 flex-col gap-1 sm:gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm">Find Jobs</span>
              </Button>
            </Link>
            <Link to="/dashboard/freelancer?view=portfolio">
              <Button variant="outline" className="w-full h-20 sm:h-24 flex-col gap-1 sm:gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm">Add Portfolio</span>
              </Button>
            </Link>
            <Link to="/dashboard/freelancer?view=messages">
              <Button variant="outline" className="w-full h-20 sm:h-24 flex-col gap-1 sm:gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm">Messages</span>
              </Button>
            </Link>
            <Link to="/dashboard/freelancer?view=wallet">
              <Button variant="outline" className="w-full h-20 sm:h-24 flex-col gap-1 sm:gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-sm">Withdraw</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar - Left side - UPDATED with recommended structure[file:29] */}
      <div className={`fixed lg:sticky lg:inset-0 z-40 w-64 border-r border-primary/20 bg-white h-screen transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="border-b border-primary/20 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                FreelanceHub
              </h2>
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
              {/* Dashboard */}
              <button
                onClick={() => {
                  setCurrentView('dashboard')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              {/* Discover Jobs */}
              <button
                onClick={() => {
                  setCurrentView('discover')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'discover'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-4 h-4" />
                  <span>Find Jobs</span>
                </div>
                <Badge variant="secondary" className="text-xs">12</Badge>
              </button>

              {/* Proposals */}
              <button
                onClick={() => {
                  setCurrentView('proposals')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'proposals'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>My Proposals</span>
                </div>
                <Badge variant="secondary" className="bg-primary text-white text-xs">18</Badge>
              </button>

              {/* Active Projects */}
              <button
                onClick={() => {
                  setCurrentView('projects')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'projects'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>Active Projects</span>
                </div>
                <Badge variant="secondary" className="bg-primary text-white text-xs">6</Badge>
              </button>
              <button
                onClick={() => {
                  setCurrentView('messages')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'messages'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </div>
                <Badge variant="secondary" className="bg-primary text-white text-xs">5</Badge>
              </button>
            </div>
          </div>


          {/* Financial */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Financial</h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('earnings')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'earnings'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Earning</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('withdraw')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'withdraw'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Withdraws</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('tranascations')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'tranascations'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Transcations</span>
              </button>
            </div>
          </div>

          {/* Growth & Profile */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Growth</h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('portfolio')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'portfolio'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Portfolio</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('profile')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'profile'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('achievements')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'achievements'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Achievements</span>
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Settings</h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCurrentView('settings')
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentView === 'settings'
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
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-white hover:opacity-90 text-sm">
              <Search className="w-4 h-4 mr-2" />
              Browse Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Right side */}
      <div className="flex-1 flex flex-col w-full overflow-hidden lg:ml-0">
        {/* Top Bar - RESPONSIVE */}
        <header className="sticky top-0 z-30 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
          <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-4 ml-11">
              <div className="relative w-full sm:w-48 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search jobs, clients..." className="pl-9 border-primary/20 focus:border-primary text-sm" />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    <span className="text-sm">Notifications</span>
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-primary/5">
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className={`font-medium text-xs sm:text-sm ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notif.title}
                          </span>
                          {notif.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center text-primary font-medium text-sm">
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10">
                    <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                      <AvatarImage src={userInfo.avatar} />
                      <AvatarFallback className="bg-primary text-white text-xs sm:text-sm">
                        {userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">Freelancer</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 sm:w-56">
                  <DropdownMenuLabel className="text-sm">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-sm">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView('settings')} className="text-sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 text-sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        {renderContent()}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default FreelancerDashboard
