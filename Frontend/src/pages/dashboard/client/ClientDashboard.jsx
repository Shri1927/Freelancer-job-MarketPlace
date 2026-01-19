import { useState, useEffect } from "react"
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
  FileText,
  CreditCard,
  Bell,
  Settings,
  BarChart3,
  Activity,
  Folder,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Upload,
  Download,
  Search,
  Filter,
  Menu,
  User,
  LogOut,
  Mail,
  Calendar,
  TrendingUp,
  PieChart,
  LineChart,
  File,
  Image as ImageIcon,
  Video,
  Music,
  FileImage,
  MoreVertical,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthStore } from "@/store/auth"
import { dashboardsAPI, jobsAPI, projectsAPI } from "@/services/api"
import { toast } from "sonner"

const ClientDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut, user } = useAuthStore()
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const userName = userInfo.name || "Client"
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [dashboardResponse, jobsResponse, projectsResponse] = await Promise.all([
        dashboardsAPI.getClientDashboard(),
        jobsAPI.getAll(),
        projectsAPI.getClientProjects(),
      ])
      
      setDashboardData({
        dashboard: dashboardResponse.data,
        jobs: jobsResponse.data.data || jobsResponse.data || [],
        projects: projectsResponse.data.data || projectsResponse.data || [],
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }
  const userEmail = userInfo.email || "client@example.com"

  // Dashboard Overview Stats
  const stats = [
    {
      icon: Briefcase,
      label: "Active Projects",
      value: "8",
      change: "+2",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      label: "Pending Actions",
      value: "5",
      change: "+1",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      icon: MessageSquare,
      label: "Unread Messages",
      value: "12",
      change: "+3",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: DollarSign,
      label: "Total Spent",
      value: "$45,200",
      change: "+$2,500",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "24",
      change: "+3",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: AlertCircle,
      label: "In Review",
      value: "6",
      change: "-1",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ]

  // Chart data
  const projectStatusData = [
    { name: "Active", value: 8, fill: "hsl(142, 76%, 36%)" },
    { name: "In Review", value: 6, fill: "hsl(24, 95%, 53%)" },
    { name: "Completed", value: 24, fill: "hsl(142, 70%, 45%)" },
    { name: "On Hold", value: 2, fill: "hsl(0, 72%, 51%)" },
  ]

  const spendingData = [
    { month: "Jan", amount: 4500 },
    { month: "Feb", amount: 5200 },
    { month: "Mar", amount: 4800 },
    { month: "Apr", amount: 6100 },
    { month: "May", amount: 5500 },
    { month: "Jun", amount: 7200 },
  ]

  const projectTrendData = [
    { month: "Jan", projects: 5 },
    { month: "Feb", projects: 7 },
    { month: "Mar", projects: 8 },
    { month: "Apr", projects: 6 },
    { month: "May", projects: 9 },
    { month: "Jun", projects: 8 },
  ]

  // Projects/Orders Data
  const projects = jobsData.slice(0, 8).map((job, index) => ({
    ...job,
    status: ["Active", "In Review", "Completed", "On Hold"][index % 4],
    deadline: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    progress: [75, 45, 100, 30][index % 4],
    files: Math.floor(Math.random() * 10) + 1,
    proposals: job.proposals || Math.floor(Math.random() * 20) + 5,
  }))

  // Recent Activity
  const activities = [
    {
      type: "message",
      action: "New message from",
      target: "John Doe",
      time: "2 minutes ago",
      icon: MessageSquare
    },
    {
      type: "file",
      action: "File uploaded for",
      target: "Website Redesign",
      time: "1 hour ago",
      icon: Upload
    },
    {
      type: "project",
      action: "Project status changed",
      target: "Mobile App Development",
      time: "3 hours ago",
      icon: CheckCircle
    },
    {
      type: "payment",
      action: "Payment received for",
      target: "Logo Design Project",
      time: "1 day ago",
      icon: DollarSign
    },
    {
      type: "proposal",
      action: "New proposal for",
      target: "E-commerce Platform",
      time: "2 days ago",
      icon: Briefcase
    }
  ]

  // Notifications
  const notifications = [
    { id: 1, title: "New proposal received", message: "You have a new proposal for your job posting", time: "5m ago", unread: true },
    { id: 2, title: "Project completed", message: "Your project 'Website Redesign' has been completed", time: "1h ago", unread: true },
    { id: 3, title: "Payment processed", message: "Payment of $2,500 has been processed successfully", time: "2h ago", unread: false },
    { id: 4, title: "File uploaded", message: "New files have been uploaded to your project", time: "5h ago", unread: false },
  ]

  const [unreadCount] = useState(notifications.filter(n => n.unread).length)
  const [activeView, setActiveView] = useState("overview")

  const handleSignOut = () => {
    signOut()
    navigate("/")
  }

  // Get view from URL query parameter
  const searchParams = new URLSearchParams(location.search)
  const currentView = searchParams.get("view") || "overview"

  const getStatusColor = (status) => {
    const colors = {
      Active: "bg-primary/10 text-primary border-primary/20",
      "In Review": "bg-orange-100 text-orange-700 border-orange-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      "On Hold": "bg-red-100 text-red-700 border-red-200"
    }
    return colors[status] || colors.Active
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
                <p className="text-xs text-muted-foreground">Client Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname.includes("/dashboard/client") && !location.search}>
                      <Link to="/dashboard/client">
                        <Briefcase className="w-4 h-4" />
                        <span>Projects</span>
                        <Badge variant="secondary" className="ml-auto">8</Badge>
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
                      <Link to="/dashboard/client?view=billing">
                        <CreditCard className="w-4 h-4" />
                        <span>Billing & Payments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/client?view=invoices">
                        <FileText className="w-4 h-4" />
                        <span>Invoices</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/client?view=analytics">
                        <BarChart3 className="w-4 h-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/client?view=activity">
                        <Activity className="w-4 h-4" />
                        <span>Activity Log</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/client?view=profile">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard/client?view=settings">
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
                <Link to="/post-job" className="w-full">
                  <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Post New Job
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
                    placeholder="Search projects, messages..."
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
                        <p className="text-xs text-muted-foreground">Client</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/client?view=profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/client?view=settings">
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
            {!currentView || currentView === "overview" ? (
              <>
                {/* Welcome Section */}
                <div className="mb-8 animate-fade-in-up">
                  <h1 className="text-4xl font-bold mb-2">Welcome Back, {userName}! 👋</h1>
                  <p className="text-muted-foreground">Here's an overview of your account and projects</p>
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
                        <Badge variant="secondary" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </Card>
                  ))}
                </div>

                {/* Charts and Tables */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* Project Status Chart */}
                  <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Project Status</h3>
                      <PieChart className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <ChartContainer
                      config={{
                        active: { label: "Active Projects", color: "hsl(142, 76%, 36%)" },
                        review: { label: "In Review", color: "hsl(24, 95%, 53%)" },
                        completed: { label: "Completed", color: "hsl(142, 70%, 45%)" },
                        hold: { label: "On Hold", color: "hsl(0, 72%, 51%)" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={projectStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {projectStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </Card>

                  {/* Spending Trend Chart */}
                  <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Spending Trend</h3>
                      <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <ChartContainer
                      config={{
                        amount: { label: "Amount Spent", color: "hsl(142, 76%, 36%)" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={spendingData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(142, 20%, 90%)" />
                          <XAxis dataKey="month" stroke="hsl(142, 20%, 50%)" />
                          <YAxis stroke="hsl(142, 20%, 50%)" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="hsl(142, 76%, 36%)"
                            strokeWidth={2}
                            dot={{ fill: "hsl(142, 76%, 36%)" }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </Card>
                </div>

                {/* Projects Table */}
                <Card className="p-6 border-primary/20 animate-fade-in-up hover:shadow-large transition-all duration-300 mb-8" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Active Projects</h3>
                      <p className="text-sm text-muted-foreground">Manage and track all your projects</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Link to="/post-job">
                        <Button size="sm" className="bg-gradient-primary text-white hover:opacity-90">
                          <Briefcase className="w-4 h-4 mr-2" />
                          New Project
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead>Proposals</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project, index) => (
                          <TableRow key={project.id} className="hover:bg-primary/5 transition-colors">
                            <TableCell>
                              <div>
                                <p className="font-medium">{project.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-primary transition-all duration-300"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-10">{project.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{project.deadline}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{project.proposals}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <File className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{project.files}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Messages
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Files
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
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
                          <div className={`p-2 rounded-lg bg-primary/10`}>
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
                      <Menu className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/post-job">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                          <Briefcase className="w-6 h-6" />
                          <span>Post Job</span>
                        </Button>
                      </Link>
                      <Link to="/dashboard/client?view=messages">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                          <MessageSquare className="w-6 h-6" />
                          <span>Messages</span>
                        </Button>
                      </Link>
                      <Link to="/dashboard/client?view=files">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                          <Upload className="w-6 h-6" />
                          <span>Upload Files</span>
                        </Button>
                      </Link>
                      <Link to="/dashboard/client?view=billing">
                        <Button variant="outline" className="w-full h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5 transition-all">
                          <CreditCard className="w-6 h-6" />
                          <span>Make Payment</span>
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              </>
            ) : currentView === "projects" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Projects</h1>
                  <p className="text-muted-foreground">Manage and track all your projects</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Deadline</TableHead>
                          <TableHead>Proposals</TableHead>
                          <TableHead>Files</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id} className="hover:bg-primary/5 transition-colors">
                            <TableCell>
                              <div>
                                <p className="font-medium">{project.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-primary transition-all duration-300"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-10">{project.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{project.deadline}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{project.proposals}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <File className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{project.files}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Messages
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Files
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            ) : currentView === "billing" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Billing & Payments</h1>
                  <p className="text-muted-foreground">Manage your billing information and payments</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Billing & Payments content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : currentView === "invoices" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Invoices</h1>
                  <p className="text-muted-foreground">View and manage your invoices</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Invoices content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : currentView === "analytics" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Analytics</h1>
                  <p className="text-muted-foreground">View detailed analytics and reports</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Analytics content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : currentView === "activity" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Activity Log</h1>
                  <p className="text-muted-foreground">View your account activity history</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Activity log content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : currentView === "profile" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Profile</h1>
                  <p className="text-muted-foreground">Manage your profile information</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Profile content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : currentView === "settings" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Settings</h1>
                  <p className="text-muted-foreground">Manage your account settings</p>
                </div>
                <Card className="p-6 border-primary/20">
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Settings content goes here</p>
                    </div>
                  </div>
                </Card>
              </div>
            ) : null}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default ClientDashboard
