import { useState, useEffect, useMemo } from "react"
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Lightning,
  Briefcase,
  TrendingUp,
  Users,
  Bookmark,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Zap,
  Eye,
  Building,
  Globe,
  Wallet,
  FileText,
  Heart,
  Send,
  Bell,
  Share2,
  ThumbsUp,
  Rocket,
  Crown,
  CheckCircle,
  PieChart
} from "lucide-react"

// Mock job data - in real app, this would come from API
const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer for FinTech Startup",
    description:
      "We're looking for an experienced React developer to build our new financial dashboard. Must have experience with TypeScript, Redux, and financial APIs.",
    company: "FinTech Innovations",
    budget: "$8,000 - $12,000",
    type: "Fixed Price",
    location: "Remote",
    posted: "2 hours ago",
    proposals: 12,
    clientRating: 4.8,
    clientSpent: "$45,000+",
    clientCountry: "United States",
    duration: "3-6 months",
    experience: "Intermediate",
    skills: ["React", "TypeScript", "Redux", "Chart.js", "REST API"],
    isFeatured: true,
    isUrgent: true,
    matchScore: 95,
    verified: true,
    category: "web-development"
  },
  {
    id: 2,
    title: "UI/UX Designer for Mobile App",
    description:
      "Design a modern mobile banking app with focus on user experience and accessibility. We need wireframes, prototypes, and final designs.",
    company: "Banking Solutions Inc.",
    budget: "$4,500 - $6,500",
    type: "Fixed Price",
    location: "Remote",
    posted: "5 hours ago",
    proposals: 8,
    clientRating: 4.9,
    clientSpent: "$28,000+",
    clientCountry: "United Kingdom",
    duration: "1-2 months",
    experience: "Intermediate",
    skills: ["Figma", "UI/UX", "Prototyping", "Mobile Design", "Wireframing"],
    isFeatured: true,
    isUrgent: false,
    matchScore: 88,
    verified: true,
    category: "design"
  },
  {
    id: 3,
    title: "Python Data Scientist",
    description:
      "Analyze large datasets and build predictive models for e-commerce business. Experience with ML algorithms and data visualization required.",
    company: "E-Commerce Analytics",
    budget: "$45-65/hr",
    type: "Hourly",
    location: "Remote",
    posted: "1 day ago",
    proposals: 15,
    clientRating: 4.7,
    clientSpent: "$75,000+",
    clientCountry: "Canada",
    duration: "6+ months",
    experience: "Expert",
    skills: [
      "Python",
      "Machine Learning",
      "Pandas",
      "TensorFlow",
      "Data Analysis"
    ],
    isFeatured: false,
    isUrgent: true,
    matchScore: 92,
    verified: true,
    category: "data-science"
  },
  {
    id: 4,
    title: "Content Writer for Tech Blog",
    description:
      "Write high-quality articles about web development, AI, and tech trends. Must have strong technical background and SEO knowledge.",
    company: "Tech Insights Media",
    budget: "$500 - $800",
    type: "Fixed Price",
    location: "Remote",
    posted: "1 day ago",
    proposals: 6,
    clientRating: 4.9,
    clientSpent: "$15,000+",
    clientCountry: "Australia",
    duration: "Ongoing",
    experience: "Entry",
    skills: ["Content Writing", "SEO", "Tech", "Blogging", "Research"],
    isFeatured: false,
    isUrgent: false,
    matchScore: 78,
    verified: false,
    category: "writing"
  },
  {
    id: 5,
    title: "Full Stack Developer (Node.js + React)",
    description:
      "Build a complete SaaS application from scratch. Looking for someone who can handle both frontend and backend development.",
    company: "SaaS Startup",
    budget: "$10,000 - $15,000",
    type: "Fixed Price",
    location: "Remote",
    posted: "2 days ago",
    proposals: 21,
    clientRating: 4.6,
    clientSpent: "$60,000+",
    clientCountry: "Germany",
    duration: "4-6 months",
    experience: "Expert",
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    isFeatured: true,
    isUrgent: false,
    matchScore: 85,
    verified: true,
    category: "web-development"
  },
  {
    id: 6,
    title: "Mobile App Developer (React Native)",
    description:
      "Develop a cross-platform mobile app for iOS and Android. Experience with Firebase and mobile publishing required.",
    company: "Mobile First Co.",
    budget: "$6,000 - $9,000",
    type: "Fixed Price",
    location: "Remote",
    posted: "3 days ago",
    proposals: 18,
    clientRating: 4.8,
    clientSpent: "$35,000+",
    clientCountry: "United States",
    duration: "2-3 months",
    experience: "Intermediate",
    skills: [
      "React Native",
      "Firebase",
      "iOS",
      "Android",
      "Mobile Development"
    ],
    isFeatured: false,
    isUrgent: true,
    matchScore: 82,
    verified: true,
    category: "mobile"
  },
  {
    id: 7,
    title: "SEO Specialist for E-commerce",
    description:
      "Optimize our e-commerce website for search engines. Need someone with proven track record in increasing organic traffic.",
    company: "E-commerce Store",
    budget: "$2,500 - $4,000",
    type: "Fixed Price",
    location: "Remote",
    posted: "3 days ago",
    proposals: 9,
    clientRating: 4.7,
    clientSpent: "$20,000+",
    clientCountry: "United Kingdom",
    duration: "2 months",
    experience: "Intermediate",
    skills: [
      "SEO",
      "E-commerce",
      "Analytics",
      "Keyword Research",
      "On-page SEO"
    ],
    isFeatured: false,
    isUrgent: false,
    matchScore: 75,
    verified: false,
    category: "marketing"
  },
  {
    id: 8,
    title: "DevOps Engineer (AWS/Kubernetes)",
    description:
      "Set up and maintain our cloud infrastructure on AWS with Kubernetes. Experience with CI/CD pipelines required.",
    company: "Cloud Solutions Ltd",
    budget: "$65-85/hr",
    type: "Hourly",
    location: "Remote",
    posted: "4 days ago",
    proposals: 7,
    clientRating: 4.9,
    clientSpent: "$50,000+",
    clientCountry: "United States",
    duration: "3+ months",
    experience: "Expert",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    isFeatured: true,
    isUrgent: false,
    matchScore: 90,
    verified: true,
    category: "web-development"
  }
]

const FindJobsPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [savedJobs, setSavedJobs] = useState([1, 4])
  const [appliedJobs, setAppliedJobs] = useState([2, 5])
  const [showFilters, setShowFilters] = useState(true)
  const [activeTab, setActiveTab] = useState("recommended")
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showJobAlerts, setShowJobAlerts] = useState(false)
  const [alertEmail, setAlertEmail] = useState("")

  // Filter states
  const [filters, setFilters] = useState({
    jobType: {
      fixed: true,
      hourly: true
    },
    experienceLevel: {
      entry: true,
      intermediate: true,
      expert: true
    },
    budgetRange: [0, 50000],
    categories: [],
    skills: [],
    location: "all",
    verifiedOnly: false,
    featuredOnly: false,
    urgentOnly: false,
    maxProposals: 50,
    postedWithin: "all",
    paymentVerified: false
  })

  // Job categories with icons
  const categories = [
    {
      id: "web-development",
      name: "Web Development",
      count: 245,
      icon: Briefcase,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "mobile",
      name: "Mobile Development",
      count: 189,
      icon: Smartphone,
      color: "bg-green-100 text-green-700"
    },
    {
      id: "design",
      name: "Design & Creative",
      count: 312,
      icon: Palette,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "writing",
      name: "Writing",
      count: 178,
      icon: Edit3,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "marketing",
      name: "Marketing",
      count: 156,
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-700"
    },
    {
      id: "customer-service",
      name: "Customer Service",
      count: 89,
      icon: Headphones,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      id: "data-science",
      name: "Data Science",
      count: 134,
      icon: Cpu,
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: "business",
      name: "Business",
      count: 211,
      icon: PieChart,
      color: "bg-cyan-100 text-cyan-700"
    }
  ]

  // Popular skills for quick selection
  const popularSkills = [
    "React",
    "Node.js",
    "Python",
    "UI/UX",
    "Content Writing",
    "Mobile Development",
    "SEO",
    "Graphic Design",
    "Data Analysis",
    "Project Management",
    "TypeScript",
    "AWS",
    "Machine Learning",
    "Figma",
    "WordPress"
  ]

  // Enhanced jobs with additional data
  const enhancedJobs = useMemo(() => {
    return mockJobs.map(job => ({
      ...job,
      isSaved: savedJobs.includes(job.id),
      isApplied: appliedJobs.includes(job.id),
      budgetValue: job.budget.includes("/hr")
        ? parseInt(job.budget.split("/")[0].replace("$", "")) * 160
        : parseInt(
            job.budget
              .split("-")[0]
              .replace("$", "")
              .replace(",", "")
          )
    }))
  }, [savedJobs, appliedJobs])

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return enhancedJobs.filter(job => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matches =
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.skills.some(skill => skill.toLowerCase().includes(query))
        if (!matches) return false
      }

      // Job type filter
      if (job.type === "Fixed Price" && !filters.jobType.fixed) return false
      if (job.type === "Hourly" && !filters.jobType.hourly) return false

      // Experience level
      if (!filters.experienceLevel[job.experience.toLowerCase()]) return false

      // Budget range
      if (
        job.budgetValue < filters.budgetRange[0] ||
        job.budgetValue > filters.budgetRange[1]
      ) {
        return false
      }

      // Categories
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(job.category)
      ) {
        return false
      }

      // Skills
      if (filters.skills.length > 0) {
        const hasRequiredSkills = filters.skills.every(skill =>
          job.skills.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
        if (!hasRequiredSkills) return false
      }

      // Location
      if (
        filters.location !== "all" &&
        filters.location !== job.location.toLowerCase()
      ) {
        return false
      }

      // Verified only
      if (filters.verifiedOnly && !job.verified) return false

      // Featured only
      if (filters.featuredOnly && !job.isFeatured) return false

      // Urgent only
      if (filters.urgentOnly && !job.isUrgent) return false

      // Max proposals
      if (job.proposals > filters.maxProposals) return false

      return true
    })
  }, [enhancedJobs, searchQuery, filters])

  // Categorize jobs for different tabs
  const recommendedJobs = useMemo(() => {
    return [...filteredJobs]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12)
  }, [filteredJobs])

  const quickApplyJobs = useMemo(() => {
    return filteredJobs
      .filter(job => job.proposals < 10 && job.isUrgent)
      .slice(0, 8)
  }, [filteredJobs])

  const savedJobsList = useMemo(() => {
    return filteredJobs.filter(job => job.isSaved)
  }, [filteredJobs])

  const featuredJobs = useMemo(() => {
    return filteredJobs.filter(job => job.isFeatured)
  }, [filteredJobs])

  // Stats
  const stats = {
    totalJobs: filteredJobs.length,
    averageBudget:
      Math.round(
        filteredJobs.reduce((acc, job) => acc + job.budgetValue, 0) /
          filteredJobs.length
      ) || 0,
    urgentJobs: filteredJobs.filter(job => job.isUrgent).length,
    lowCompetition: filteredJobs.filter(job => job.proposals < 10).length
  }

  // Event handlers
  const handleSaveJob = jobId => {
    setSavedJobs(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    )
  }

  const handleQuickApply = jobId => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs(prev => [...prev, jobId])
      // Show success message
      const job = enhancedJobs.find(j => j.id === jobId)
      if (job) {
        alert(`Applied to "${job.title}" successfully!`)
      }
    }
  }

  const handleAdvancedSearch = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const clearFilters = () => {
    setFilters({
      jobType: { fixed: true, hourly: true },
      experienceLevel: { entry: true, intermediate: true, expert: true },
      budgetRange: [0, 50000],
      categories: [],
      skills: [],
      location: "all",
      verifiedOnly: false,
      featuredOnly: false,
      urgentOnly: false,
      maxProposals: 50,
      postedWithin: "all",
      paymentVerified: false
    })
  }

  const handleSetAlert = () => {
    if (alertEmail) {
      alert(`Job alerts set up for ${alertEmail}`)
      setShowJobAlerts(false)
      setAlertEmail("")
    }
  }

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs")
    if (saved) {
      setSavedJobs(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage when savedJobs changes
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
  }, [savedJobs])

  // Job Card Component
  const JobCard = ({ job, isQuickApply = false }) => (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Job Header */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {job.isFeatured && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-xs font-medium text-yellow-800">
                  <Crown className="w-3 h-3" />
                  Featured
                </span>
              )}
              {job.isUrgent && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-xs font-medium text-red-700">
                  <Zap className="w-3 h-3" />
                  Urgent
                </span>
              )}
              {job.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-xs font-medium text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
              <span className="ml-auto text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {job.matchScore}% Match
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {job.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{job.company}</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{job.clientRating}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {job.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {job.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{job.skills.length - 4}
                </span>
              )}
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {job.budget}
                  </p>
                  <p className="text-xs text-gray-500">{job.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {job.duration}
                  </p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {job.location}
                  </p>
                  <p className="text-xs text-gray-500">Location</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {job.proposals} proposals
                  </p>
                  <p className="text-xs text-gray-500">Competition</p>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {job.clientCountry}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  Spent {job.clientSpent}
                </span>
              </div>
              <span className="text-xs">{job.posted}</span>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => handleSaveJob(job.id)}
            className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors group/save"
            title={job.isSaved ? "Unsave job" : "Save job"}
          >
            {job.isSaved ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-gray-400 group-hover/save:text-red-400" />
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
        {job.isApplied ? (
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm font-medium cursor-default"
            disabled
          >
            <CheckCircle className="w-4 h-4" />
            Applied
          </button>
        ) : (
          <button
            onClick={() => handleQuickApply(job.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            {isQuickApply ? (
              <>
                <Lightning className="w-4 h-4" />
                Quick Apply
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Apply Now
              </>
            )}
          </button>
        )}

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-primary hover:text-primary transition-colors text-sm font-medium">
          <Eye className="w-4 h-4" />
          View
        </button>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-primary hover:text-primary transition-colors text-sm font-medium">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )

  // Category Card Component
  const CategoryCard = ({ category }) => {
    const Icon = category.icon
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${category.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {category.name}
            </h4>
            <p className="text-sm text-gray-500">{category.count} jobs</p>
          </div>
        </div>
        <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
          Browse Jobs →
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Search Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect{" "}
                <span className="text-yellow-300">Freelance</span> Job
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Discover thousands of opportunities that match your skills and
                expertise
              </p>
            </div>

            {/* Main Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                    <input
                      type="text"
                      placeholder="Job title, skills, or keywords..."
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-lg"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAdvancedSearch}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search Jobs
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stats.totalJobs}</div>
                <div className="text-sm text-white/80">Jobs Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">
                  ${stats.averageBudget}
                </div>
                <div className="text-sm text-white/80">Avg. Budget</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">
                  {stats.urgentJobs}
                </div>
                <div className="text-sm text-white/80">Urgent Jobs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold mb-1">
                  {stats.lowCompetition}
                </div>
                <div className="text-sm text-white/80">Low Competition</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-72 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            } lg:block`}
          >
            <div className="sticky top-24 space-y-6">
              {/* Filter Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-900">Filters</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Job Type */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.jobType.fixed}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              jobType: {
                                ...prev.jobType,
                                fixed: e.target.checked
                              }
                            }))
                          }
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                        />
                        <span className="text-gray-700">Fixed Price</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.jobType.hourly}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              jobType: {
                                ...prev.jobType,
                                hourly: e.target.checked
                              }
                            }))
                          }
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                        />
                        <span className="text-gray-700">Hourly</span>
                      </label>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Budget Range: ${filters.budgetRange[0].toLocaleString()} -
                      ${filters.budgetRange[1].toLocaleString()}
                    </h4>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={filters.budgetRange[1]}
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          budgetRange: [
                            prev.budgetRange[0],
                            parseInt(e.target.value)
                          ]
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>

                  {/* Experience Level */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Experience Level
                    </h4>
                    <div className="space-y-2">
                      {[
                        { id: "entry", label: "Entry Level", count: 156 },
                        {
                          id: "intermediate",
                          label: "Intermediate",
                          count: 342
                        },
                        { id: "expert", label: "Expert", count: 189 }
                      ].map(level => (
                        <label
                          key={level.id}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={filters.experienceLevel[level.id]}
                              onChange={e =>
                                setFilters(prev => ({
                                  ...prev,
                                  experienceLevel: {
                                    ...prev.experienceLevel,
                                    [level.id]: e.target.checked
                                  }
                                }))
                              }
                              className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                            />
                            <span className="text-gray-700">{level.label}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {level.count}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                    <div className="space-y-2">
                      {[
                        { id: "all", label: "All Locations" },
                        { id: "remote", label: "Remote Only" },
                        { id: "usa", label: "United States" },
                        { id: "europe", label: "Europe" },
                        { id: "asia", label: "Asia" }
                      ].map(location => (
                        <label
                          key={location.id}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="location"
                            value={location.id}
                            checked={filters.location === location.id}
                            onChange={e =>
                              setFilters(prev => ({
                                ...prev,
                                location: e.target.value
                              }))
                            }
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary/20"
                          />
                          <span className="text-gray-700">
                            {location.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Additional Filters
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.verifiedOnly}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              verifiedOnly: e.target.checked
                            }))
                          }
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                        />
                        <span className="text-gray-700">
                          Verified Clients Only
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.featuredOnly}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              featuredOnly: e.target.checked
                            }))
                          }
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                        />
                        <span className="text-gray-700">
                          Featured Jobs Only
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.urgentOnly}
                          onChange={e =>
                            setFilters(prev => ({
                              ...prev,
                              urgentOnly: e.target.checked
                            }))
                          }
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary/20"
                        />
                        <span className="text-gray-700">Urgent Jobs Only</span>
                      </label>
                    </div>
                  </div>

                  {/* Max Proposals */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Max Proposals: {filters.maxProposals}
                    </h4>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={filters.maxProposals}
                      onChange={e =>
                        setFilters(prev => ({
                          ...prev,
                          maxProposals: parseInt(e.target.value)
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                  </div>

                  {/* Skills Filter */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.slice(0, 6).map(skill => (
                        <button
                          key={skill}
                          onClick={() => {
                            const newSkills = filters.skills.includes(skill)
                              ? filters.skills.filter(s => s !== skill)
                              : [...filters.skills, skill]
                            setFilters(prev => ({ ...prev, skills: newSkills }))
                          }}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                            filters.skills.includes(skill)
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Alerts Card */}
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Bell className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-gray-900">Job Alerts</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified when new jobs match your criteria
                </p>
                {showJobAlerts ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={alertEmail}
                      onChange={e => setAlertEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSetAlert}
                        className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Set Alert
                      </button>
                      <button
                        onClick={() => setShowJobAlerts(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowJobAlerts(true)}
                    className="w-full py-2.5 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
                  >
                    Set Up Job Alerts
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Filters & Categories
                    </div>
                    <div className="text-sm text-gray-500">
                      Adjust your job search
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    4 active
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Categories Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Browse by Category
                </h2>
                <button className="text-primary font-medium hover:text-primary/80 transition-colors">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredJobs.length} Jobs Found
                  </h2>
                  <p className="text-gray-600">
                    {searchQuery
                      ? `Results for "${searchQuery}"`
                      : "Recommended jobs based on your profile"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "grid"
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        viewMode === "list"
                          ? "bg-white text-primary shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      List
                    </button>
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer">
                      <option>Most Relevant</option>
                      <option>Newest First</option>
                      <option>Budget: High to Low</option>
                      <option>Budget: Low to High</option>
                      <option>Fewest Proposals</option>
                      <option>Best Match</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {filters.jobType.fixed && filters.jobType.hourly ? null : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                    {filters.jobType.fixed ? "Fixed Price" : "Hourly"}
                    <button
                      onClick={() =>
                        setFilters(prev => ({
                          ...prev,
                          jobType: {
                            ...prev.jobType,
                            fixed: true,
                            hourly: true
                          }
                        }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.verifiedOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
                    Verified Only
                    <button
                      onClick={() =>
                        setFilters(prev => ({ ...prev, verifiedOnly: false }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.featuredOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Featured
                    <button
                      onClick={() =>
                        setFilters(prev => ({ ...prev, featuredOnly: false }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.urgentOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm">
                    Urgent
                    <button
                      onClick={() =>
                        setFilters(prev => ({ ...prev, urgentOnly: false }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => setShowAdvancedFilters(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  More Filters
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    {
                      id: "recommended",
                      label: "Recommended",
                      icon: Sparkles,
                      count: recommendedJobs.length
                    },
                    {
                      id: "quick-apply",
                      label: "Quick Apply",
                      icon: Lightning,
                      count: quickApplyJobs.length
                    },
                    {
                      id: "featured",
                      label: "Featured",
                      icon: Crown,
                      count: featuredJobs.length
                    },
                    {
                      id: "saved",
                      label: "Saved",
                      icon: Bookmark,
                      count: savedJobsList.length
                    },
                    {
                      id: "all",
                      label: "All Jobs",
                      icon: Briefcase,
                      count: filteredJobs.length
                    }
                  ].map(tab => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {tab.label}
                          {tab.count > 0 && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                activeTab === tab.id
                                  ? "bg-primary/10 text-primary"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {tab.count}
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Recommended Jobs */}
              {activeTab === "recommended" && (
                <>
                  <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-5 mb-6 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Personalized Recommendations
                        </h3>
                        <p className="text-gray-600">
                          These jobs are selected based on your skills,
                          experience, and previous applications. Your match
                          score shows how well each job aligns with your
                          profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {recommendedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {recommendedJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No recommendations found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your filters or update your profile skills
                      </p>
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Quick Apply Jobs */}
              {activeTab === "quick-apply" && (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-green-200">
                    <div className="flex items-start gap-3">
                      <Lightning className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Quick Apply Opportunities
                        </h3>
                        <p className="text-gray-600">
                          These jobs have fewer proposals and are marked as
                          urgent. Apply quickly to increase your chances!
                        </p>
                      </div>
                    </div>
                  </div>

                  {quickApplyJobs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {quickApplyJobs.map(job => (
                        <JobCard key={job.id} job={job} isQuickApply={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Lightning className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No quick apply jobs available
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Check back later for new urgent opportunities
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Featured Jobs */}
              {activeTab === "featured" && (
                <>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 mb-6 border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Crown className="w-6 h-6 text-yellow-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Featured Opportunities
                        </h3>
                        <p className="text-gray-600">
                          Premium jobs with verified clients, competitive
                          budgets, and great reviews.
                        </p>
                      </div>
                    </div>
                  </div>

                  {featuredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {featuredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Crown className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No featured jobs available
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Featured jobs will appear here when available
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Saved Jobs */}
              {activeTab === "saved" && (
                <>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 mb-6 border border-pink-200">
                    <div className="flex items-start gap-3">
                      <Bookmark className="w-6 h-6 text-pink-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Your Saved Jobs
                        </h3>
                        <p className="text-gray-600">
                          Jobs you've saved for later. Apply when you're ready!
                        </p>
                      </div>
                    </div>
                  </div>

                  {savedJobsList.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {savedJobsList.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No saved jobs yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Click the heart icon on any job to save it for later
                      </p>
                      <button
                        onClick={() => setActiveTab("recommended")}
                        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Browse Jobs
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* All Jobs */}
              {activeTab === "all" && (
                <>
                  {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No jobs found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your search terms or filters
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={clearFilters}
                          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Clear Filters
                        </button>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                          Show All Jobs
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Load More */}
            {filteredJobs.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                  Load More Jobs
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  Showing {Math.min(filteredJobs.length, 8)} of{" "}
                  {filteredJobs.length} jobs
                </p>
              </div>
            )}

            {/* Tips & Advice */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                Tips for Success
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Customize Your Proposal
                  </h4>
                  <p className="text-sm text-gray-600">
                    Tailor each proposal to the specific job. Mention key
                    requirements from the job description.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Apply Early
                  </h4>
                  <p className="text-sm text-gray-600">
                    Jobs posted within 24 hours receive more attention from
                    clients.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <ThumbsUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Build Your Profile
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complete profiles with portfolio get 3x more interview
                    requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Advanced filter content */}
              <div className="text-center py-8">
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Advanced filters coming soon!</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 mt-12 pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} FreelanceHub. All rights reserved.
            </p>
            <p className="mt-2">
              Found {filteredJobs.length} jobs matching your criteria
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Missing icon components (add these at top with other imports)
const Smartphone = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-smartphone"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
)
const Palette = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-palette"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)
const Edit3 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-edit-3"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)
const Headphones = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-headphones"
  >
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
)
const Cpu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-cpu"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
)

export default FindJobsPage
