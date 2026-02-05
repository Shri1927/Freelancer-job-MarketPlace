import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Heart,
  Bookmark,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Briefcase,
  Users,
  Award,
  Zap,
  Eye,
  MessageSquare,
  Download,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Badge as ShBadge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Discover = () => {
  const navigate = useNavigate()

  // Sample job data - matches dashboard style
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [loading, setLoading] = useState(false)

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('recommended')
  const [filters, setFilters] = useState({
    budgetMin: 500,
    budgetMax: 5000,
    duration: '',
    experience: '',
    jobType: '',
    remote: true,
    skills: [],
  })

  // Load jobs on mount
  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const sampleJobs = [
      {
        id: 1,
        title: 'Senior React Developer for E-commerce Dashboard',
        client: { name: 'TechCorp', avatar: '', rating: 4.8, verified: true },
        budget: { min: 2500, max: 4500, type: 'fixed' },
        skills: ['React', 'Node.js', 'TypeScript', 'Tailwind', 'AWS'],
        description: 'Build responsive admin dashboard with real-time analytics, user management, and payment integration...',
        duration: '2-4 weeks',
        experience: 'Senior',
        location: 'Remote',
        posted: '2h ago',
        proposals: 8,
        proposalsMax: 25,
        views: 127,
      },
      {
        id: 2,
        title: 'Python Django Developer for AI Platform',
        client: { name: 'AI Solutions', avatar: '', rating: 4.6, verified: true },
        budget: { min: 3500, max: 6000, type: 'hourly' },
        skills: ['Python', 'Django', 'PostgreSQL', 'Celery', 'Redis'],
        description: 'Develop backend for AI-powered content platform with ML model integration and real-time processing...',
        duration: '4-6 weeks',
        experience: 'Mid',
        location: 'Remote',
        posted: '5h ago',
        proposals: 12,
        proposalsMax: 30,
        views: 89,
      },
      {
        id: 3,
        title: 'Mobile App UI/UX Designer - React Native',
        client: { name: 'Design Studio', avatar: '', rating: 4.9, verified: false },
        budget: { min: 1800, max: 3200, type: 'fixed' },
        skills: ['Figma', 'React Native', 'UI/UX', 'Prototyping'],
        description: 'Design and prototype mobile app for fitness tracking with modern animations and intuitive navigation...',
        duration: '1-2 weeks',
        experience: 'Mid',
        location: 'Worldwide',
        posted: '1d ago',
        proposals: 15,
        proposalsMax: 20,
        views: 203,
      },
      {
        id: 4,
        title: 'WordPress Developer for Corporate Site',
        client: { name: 'Marketing Agency', avatar: '', rating: 4.2, verified: true },
        budget: { min: 1200, max: 2500, type: 'fixed' },
        skills: ['WordPress', 'PHP', 'Elementor', 'SEO'],
        description: 'Custom WordPress theme development with advanced custom fields, integrations, and performance optimization...',
        duration: '3 weeks',
        experience: 'Junior',
        location: 'Remote',
        posted: '3h ago',
        proposals: 5,
        proposalsMax: 15,
        views: 56,
      }
    ]

    setJobs(sampleJobs)
    setFilteredJobs(sampleJobs)
    setLoading(false)
  }

  // Filter jobs
  useEffect(() => {
    let filtered = jobs.filter(job => {
      // Search filter
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      // Budget filter
      const matchesBudget = job.budget.min >= filters.budgetMin && job.budget.max <= filters.budgetMax

      // Tab filter
      const matchesTab = selectedTab === 'recommended' ||
        (selectedTab === 'saved' && savedJobs.has(job.id)) ||
        selectedTab === 'all'

      return matchesSearch && matchesBudget && matchesTab
    })



    setFilteredJobs(filtered)
  }, [searchTerm, filters, selectedTab, savedJobs, jobs])

  const toggleSaveJob = (jobId) => {
    const newSaved = new Set(savedJobs)
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId)
    } else {
      newSaved.add(jobId)
    }
    setSavedJobs(newSaved)
  }

  const quickApply = (job) => {
    // Navigate to proposal with pre-filled data
    navigate(`/jobs/${job.id}/proposal`, { state: { job } })
  }

  const JobCard = ({ job }) => (
    <Card className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-primary/20 h-full">
      <div className="p-6">
        {/* Job Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">

            <Link
              to={`/discover/jobss/${job.id}`}
              className="block mb-2 hover:text-primary transition-colors line-clamp-2 font-semibold text-sm leading-tight group-hover:underline"
            >
              {job.title}
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span>{job.client.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{job.proposals}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{job.views} </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-primary hover:bg-primary/10 p-2 -m-2"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleSaveJob(job.id)
            }}
          >
            <Heart
              className={`w-5 h-5 transition-all ${savedJobs.has(job.id) ? 'fill-primary text-primary' : ''}`}
            />
          </Button>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-black">
              ${job.budget.min.toLocaleString()}-{job.budget.max.toLocaleString()}
            </span>
            <Badge variant="secondary" className="text-xs">
              {job.budget.type}
            </Badge>
          </div>



          <p className="text-[12px] text-muted-foreground line-clamp-3 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{job.location}</span>
            </div>
            <span>{job.posted}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-[10px]">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2  ">

          <Button variant="outline" className="flex-1 bg-primary text-white" asChild>
            <Link to={`/discover/jobss/${job.id}`}>View Details</Link>
          </Button>
        </div>


      </div>
    </Card>
  )

  return (
    <div className=" p-4 sm:p-6">
      <div className=" ">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Find Your Next Project
              </h1>
              <p className="text-xl text-muted-foreground">
                {filteredJobs.length} jobs match your skills •{' '}
                <span className="font-semibold text-primary">
                  {savedJobs.size} saved
                </span>
              </p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by job title, skills, or keywords..."
                  className="pl-12 h-12 text-lg border-primary/20 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
      
        </div>

        {/* Main Content - Tabs + Filters + Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 h-fit sticky top-24 self-start p-6 border-primary/20">
            <h3 className="font-semibold mb-6 flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5" />
              Filters
            </h3>

            {/* Budget Slider */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Budget Range</label>
              <div className="text-xs text-muted-foreground mb-3">
                ${filters.budgetMin.toLocaleString()} - ${filters.budgetMax.toLocaleString()}
              </div>
              <Slider
                value={[filters.budgetMin, filters.budgetMax]}
                onValueChange={([min, max]) => setFilters(prev => ({ ...prev, budgetMin: min, budgetMax: max }))}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>

            {/* Quick Filters */}
            <div className="space-y-1 mb-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Job Type</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="fixed" />
                    <label htmlFor="fixed" className="text-sm cursor-pointer">Fixed Price</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="hourly" />
                    <label htmlFor="hourly" className="text-sm cursor-pointer">Hourly</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Experience</label>
                <Select value={filters.experience} onValueChange={(val) => setFilters(prev => ({ ...prev, experience: val }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>



            <Button className="w-full  bg-gradient-to-r from-primary to-primary/80">Clear Filters</Button>
          </Card>

          {/* Jobs Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur border-b border-primary/20 p-1">
                <TabsTrigger value="recommended" className="data-[state=active]:bg-white data-[state=active]:shadow-lg">
                  Recommended
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-lg">
                  All Jobs
                </TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:shadow-lg">
                  Saved ({savedJobs.size})
                </TabsTrigger>
                <TabsTrigger value="quick" className="data-[state=active]:bg-white data-[state=active]:shadow-lg">
                  Quick Apply
                </TabsTrigger>
                <TabsTrigger value="invited" className="data-[state=active]:bg-white data-[state=active]:shadow-lg">
                  Invited
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full grid place-items-center py-20">
                  <div className="animate-spin w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full" />
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline">Clear Filters</Button>
                    <Button>Browse All</Button>
                  </div>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>

            {/* Load More */}
            {!loading && filteredJobs.length > 0 && (
              <div className="text-center py-12">
                <Button variant="outline" className="gap-2">
                  Load More Jobs
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discover
