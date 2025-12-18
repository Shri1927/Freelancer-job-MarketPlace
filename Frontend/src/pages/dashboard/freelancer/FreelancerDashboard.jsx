import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
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
  Menu,
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
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthStore } from "@/store/auth"
import jobsData from "@/data/jobs.json"
import bidsData from "@/data/bids.json"

const FreelancerDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, user } = useAuthStore()
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const userName = userInfo.name || "Freelancer"
  const userEmail = userInfo.email || "freelancer@example.com"
  const profileCompletion = 75 // Percentage

  // Dashboard Overview Stats
  const stats = [
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: "$24,850",
      change: "+$3,200",
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Wallet,
      label: "Available Balance",
      value: "$8,450",
      change: "Ready to withdraw",
      trend: "up",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      label: "Pending Earnings",
      value: "$4,200",
      change: "In progress",
      trend: "neutral",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: "6",
      change: "+2",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: FileText,
      label: "Proposals Sent",
      value: "18",
      change: "3 this week",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9",
      change: "From 42 reviews",
      trend: "up",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

  // Earnings Chart Data
  const earningsData = [
    { month: "Jan", earnings: 3200, pending: 800 },
    { month: "Feb", earnings: 4100, pending: 1200 },
    { month: "Mar", earnings: 3800, pending: 900 },
    { month: "Apr", earnings: 5200, pending: 1500 },
    { month: "May", earnings: 4800, pending: 1100 },
    { month: "Jun", earnings: 6200, pending: 1800 },
  ]

  // Proposal Status Data
  const proposalStatusData = [
    { name: "Active", value: 8, fill: "hsl(142, 76%, 36%)" },
    { name: "Accepted", value: 6, fill: "hsl(142, 70%, 45%)" },
    { name: "Declined", value: 3, fill: "hsl(0, 72%, 51%)" },
    { name: "Expired", value: 1, fill: "hsl(24, 95%, 53%)" },
  ]

  // Performance Metrics
  const performanceData = [
    { metric: "Job Success Score", value: 92, target: 90, status: "excellent" },
    { metric: "On-Time Delivery", value: 96, target: 90, status: "excellent" },
    { metric: "Response Rate", value: 100, target: 90, status: "excellent" },
    { metric: "Repeat Client Rate", value: 68, target: 70, status: "good" },
  ]

  // Active Projects
  const activeProjects = jobsData.slice(0, 6).map((job, index) => ({
    ...job,
    status: ["In Progress", "Review", "Pending Feedback", "On Hold"][index % 4],
    deadline: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    progress: [65, 90, 45, 30][index % 4],
    client: {
      name: ["John Smith", "Sarah Johnson", "Mike Davis", "Emily Wilson"][index % 4],
      rating: 4.8 + Math.random() * 0.2,
    },
    earnings: [2500, 4500, 1800, 3200][index % 4],
    hours: [40, 60, 25, 35][index % 4],
  }))

  // Proposals
  const proposals = [
    {
      id: 1,
      jobTitle: "Full Stack Developer for E-commerce Platform",
      amount: "$6,500",
      status: "Submitted",
      submittedDate: "2 days ago",
      views: 5,
      clientName: "Tech Corp",
    },
    {
      id: 2,
      jobTitle: "Python Backend Developer for AI Integration",
      amount: "$8,000",
      status: "Accepted",
      submittedDate: "5 days ago",
      views: 12,
      clientName: "AI Solutions",
    },
    {
      id: 3,
      jobTitle: "Content Writer for Tech Blog",
      amount: "$750",
      status: "Declined",
      submittedDate: "1 week ago",
      views: 3,
      clientName: "Blog Media",
    },
    {
      id: 4,
      jobTitle: "Mobile App UI/UX Design",
      amount: "$4,200",
      status: "Submitted",
      submittedDate: "3 days ago",
      views: 8,
      clientName: "Design Studio",
    },
  ]

  // Recent Activity
  const activities = [
    {
      type: "proposal",
      action: "Proposal accepted for",
      target: "Python Backend Developer",
      time: "1 hour ago",
      icon: CheckCircle
    },
    {
      type: "message",
      action: "New message from",
      target: "John Smith",
      time: "2 hours ago",
      icon: MessageSquare
    },
    {
      type: "payment",
      action: "Payment received",
      target: "$2,500 for Website Redesign",
      time: "1 day ago",
      icon: DollarSign
    },
    {
      type: "review",
      action: "New 5-star review from",
      target: "Sarah Johnson",
      time: "2 days ago",
      icon: Star
    },
    {
      type: "invitation",
      action: "Job invitation for",
      target: "Full Stack Developer",
      time: "3 days ago",
      icon: Briefcase
    }
  ]

  // Notifications
  const notifications = [
    { id: 1, title: "Proposal accepted!", message: "Your proposal for 'Python Backend Developer' was accepted", time: "1h ago", unread: true, type: "success" },
    { id: 2, title: "New job invitation", message: "You've been invited to apply for a Full Stack Developer position", time: "2h ago", unread: true, type: "info" },
    { id: 3, title: "New message", message: "John Smith sent you a message about your project", time: "3h ago", unread: true, type: "message" },
    { id: 4, title: "Payment received", message: "$2,500 has been added to your available balance", time: "1d ago", unread: false, type: "payment" },
    { id: 5, title: "New review", message: "You received a 5-star review from Sarah Johnson", time: "2d ago", unread: false, type: "review" },
  ]

  const [unreadCount] = useState(notifications.filter(n => n.unread).length)

  // Analytics Data
  const profileViewsData = [
    { day: "Mon", views: 45 },
    { day: "Tue", views: 52 },
    { day: "Wed", views: 48 },
    { day: "Thu", views: 61 },
    { day: "Fri", views: 55 },
    { day: "Sat", views: 38 },
    { day: "Sun", views: 42 },
  ]

  const proposalSuccessData = [
    { month: "Jan", success: 65 },
    { month: "Feb", success: 72 },
    { month: "Mar", success: 68 },
    { month: "Apr", success: 78 },
    { month: "May", success: 75 },
    { month: "Jun", success: 82 },
  ]

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  const getStatusColor = (status) => {
    const colors = {
      "In Progress": "bg-primary/10 text-primary border-primary/20",
      "Review": "bg-orange-100 text-orange-700 border-orange-200",
      "Pending Feedback": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "On Hold": "bg-red-100 text-red-700 border-red-200",
      "Submitted": "bg-blue-100 text-blue-700 border-blue-200",
      "Accepted": "bg-green-100 text-green-700 border-green-200",
      "Declined": "bg-red-100 text-red-700 border-red-200",
    }
    return colors[status] || colors["In Progress"]
  }

  return (
    <SidebarProvider defaultOpen={true}>
      {/* Sidebar */}
      <Sidebar className="border-r border-primary/20 sticky top-0 h-screen" collapsible="none">
          <SidebarHeader className="border-b border-primary/20 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">FreelanceHub</h2>
                <p className="text-xs text-muted-foreground">Freelancer Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/freelancer") && !location.search}>
                      <Link to="/dashboard/freelancer">
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=jobs">
                        <Briefcase className="w-4 h-4" />
                        <span>Find Jobs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=proposals">
                        <FileText className="w-4 h-4" />
                        <span>My Proposals</span>
                        <Badge variant="secondary" className="ml-auto">18</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=projects">
                        <Folder className="w-4 h-4" />
                        <span>Active Projects</span>
                        <Badge variant="secondary" className="ml-auto bg-primary text-white">6</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=messages">
                        <MessageSquare className="w-4 h-4" />
                        <span>Messages</span>
                        <Badge variant="secondary" className="ml-auto bg-primary text-white">5</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Financial</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=earnings">
                        <DollarSign className="w-4 h-4" />
                        <span>Earnings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=withdraw">
                        <Wallet className="w-4 h-4" />
                        <span>Withdraw Funds</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=transactions">
                        <FileText className="w-4 h-4" />
                        <span>Transactions</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Profile & Portfolio</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/profile">
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=portfolio">
                        <ImageIcon className="w-4 h-4" />
                        <span>Portfolio</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=reviews">
                        <Star className="w-4 h-4" />
                        <span>Reviews</span>
                        <Badge variant="secondary" className="ml-auto">42</Badge>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=analytics">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=activity">
                        <Activity className="w-4 h-4" />
                        <span>Activity Log</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/freelancer?view=settings">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-primary/20 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/jobs" className="w-full">
                  <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col w-full overflow-hidden">
          {/* Top Bar */}
          <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, clients..."
                    className="pl-9 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex items-center justify-between">
                      <span>Notifications</span>
                      <Badge variant="secondary">{unreadCount} new</Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-primary/5">
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className={`font-medium text-sm ${notif.unread ? "text-foreground" : "text-muted-foreground"}`}>
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
                    <DropdownMenuItem className="text-center justify-center text-primary font-medium">
                      View All Notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={userInfo.avatar} />
                        <AvatarFallback className="bg-primary text-white">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">Freelancer</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/freelancer?view=settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6 w-full">
            {/* Welcome Section with Profile Completion */}
            <div className="mb-8 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome Back, {userName}! 👋</h1>
                  <p className="text-muted-foreground">Here's an overview of your freelance work and earnings</p>
                </div>
                <Link to="/profile">
                  <Button variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Complete Profile
                  </Button>
                </Link>
              </div>
              
              {/* Profile Completion Bar */}
              <Card className="p-4 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-medium">Profile Completion</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">Complete your profile to get more job matches and increase your visibility</p>
              </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-large transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in-up border-primary/20 hover:border-primary/40"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    {stat.trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Earnings Chart */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Earnings Overview</h3>
                    <p className="text-sm text-muted-foreground">Last 6 months</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <ChartContainer
                  config={{
                    earnings: { label: "Earnings", color: "hsl(142, 76%, 36%)" },
                    pending: { label: "Pending", color: "hsl(24, 95%, 53%)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(142, 20%, 90%)" />
                      <XAxis dataKey="month" stroke="hsl(142, 20%, 50%)" />
                      <YAxis stroke="hsl(142, 20%, 50%)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="earnings"
                        stackId="1"
                        stroke="hsl(142, 76%, 36%)"
                        fill="hsl(142, 76%, 36%)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="pending"
                        stackId="1"
                        stroke="hsl(24, 95%, 53%)"
                        fill="hsl(24, 95%, 53%)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Card>

              {/* Proposal Status Chart */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Proposal Status</h3>
                    <p className="text-sm text-muted-foreground">Current proposals</p>
                  </div>
                  <PieChart className="w-5 h-5 text-primary" />
                </div>
                <ChartContainer
                  config={{
                    active: { label: "Active", color: "hsl(142, 76%, 36%)" },
                    accepted: { label: "Accepted", color: "hsl(142, 70%, 45%)" },
                    declined: { label: "Declined", color: "hsl(0, 72%, 51%)" },
                    expired: { label: "Expired", color: "hsl(24, 95%, 53%)" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={proposalStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
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

            {/* Performance Metrics */}
            <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300 mb-8" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Performance Metrics</h3>
                  <p className="text-sm text-muted-foreground">Track your success indicators</p>
                </div>
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {performanceData.map((metric, index) => (
                  <div key={index} className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{metric.metric}</span>
                      {metric.value >= metric.target ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                      <span className="text-xs text-muted-foreground">Target: {metric.target}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Projects and Proposals */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Active Projects */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Active Projects</h3>
                    <p className="text-sm text-muted-foreground">{activeProjects.length} active</p>
                  </div>
                  <Link to="/dashboard/freelancer?view=projects">
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeProjects.slice(0, 4).map((project, index) => (
                    <div
                      key={project.id}
                      className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">{project.title}</h4>
                          <p className="text-xs text-muted-foreground">{project.client.name}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)} variant="outline">
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-primary">${project.earnings.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">{project.hours}h worked</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Progress value={project.progress} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground w-10">{project.progress}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Due: {project.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* My Proposals */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">My Proposals</h3>
                    <p className="text-sm text-muted-foreground">{proposals.length} total</p>
                  </div>
                  <Link to="/dashboard/freelancer?view=proposals">
                    <Button variant="ghost" size="sm">
                      View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">{proposal.jobTitle}</h4>
                          <p className="text-xs text-muted-foreground">{proposal.clientName}</p>
                        </div>
                        <Badge className={getStatusColor(proposal.status)} variant="outline">
                          {proposal.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{proposal.amount}</span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{proposal.views}</span>
                          </div>
                          <span>•</span>
                          <span>{proposal.submittedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <Activity className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors border-l-2 border-primary"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          {activity.action} <span className="text-primary">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Activity <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                  <Zap className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <Search className="w-6 h-6" />
                      <span>Find Jobs</span>
                    </Button>
                  </Link>
                  <Link to="/dashboard/freelancer?view=portfolio">
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <Upload className="w-6 h-6" />
                      <span>Add Portfolio</span>
                    </Button>
                  </Link>
                  <Link to="/dashboard/freelancer?view=messages">
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <MessageSquare className="w-6 h-6" />
                      <span>Messages</span>
                    </Button>
                  </Link>
                  <Link to="/dashboard/freelancer?view=withdraw">
                    <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                      <Wallet className="w-6 h-6" />
                      <span>Withdraw</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default FreelancerDashboard
