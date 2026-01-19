import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import BidCard from "@/components/BidCard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Clock,
  DollarSign,
  FileText,
  Star,
  CheckCircle,
  ArrowLeft
} from "lucide-react"
import { toast } from "sonner"
import { jobsAPI, proposalsAPI } from "@/services/api"

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [jobBids, setJobBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [showBidForm, setShowBidForm] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [bidDuration, setBidDuration] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadJobDetails()
    loadProposals()
  }, [id])

  const loadJobDetails = async () => {
    try {
      setLoading(true)
      const response = await jobsAPI.getById(id)
      setJob(response.data.data || response.data)
    } catch (error) {
      console.error('Error loading job:', error)
      toast.error('Failed to load job details')
    } finally {
      setLoading(false)
    }
  }

  const loadProposals = async () => {
    try {
      const response = await proposalsAPI.listForJob(id)
      setJobBids(response.data.data || response.data || [])
    } catch (error) {
      console.error('Error loading proposals:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Link to="/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmitBid = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      await jobsAPI.apply(id, {
        amount: parseFloat(bidAmount),
        duration: bidDuration,
        cover_letter: coverLetter,
      })
      
      toast.success("Your proposal has been submitted!")
      setShowBidForm(false)
      setBidAmount("")
      setBidDuration("")
      setCoverLetter("")
      loadProposals() // Reload proposals
    } catch (error) {
      console.error('Error submitting proposal:', error)
      toast.error(error.response?.data?.message || 'Failed to submit proposal')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Posted {job.created_at ? new Date(job.created_at).toLocaleDateString() : 'Recently'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {jobBids.length} proposals
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">{job.category}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {(job.skills || job.skills_required || []).map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {typeof skill === 'string' ? skill : skill.name || skill}
                  </Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">
                  Project Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>
            </Card>

            {/* Bid Form */}
            {!showBidForm ? (
              <Button
                onClick={() => setShowBidForm(true)}
                className="w-full bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                Submit a Proposal
              </Button>
            ) : (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Submit Your Proposal
                </h2>
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Your Bid Amount</Label>
                      <Input
                        id="amount"
                        placeholder="$5000"
                        value={bidAmount}
                        onChange={e => setBidAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Project Duration</Label>
                      <Input
                        id="duration"
                        placeholder="2 months"
                        value={bidDuration}
                        onChange={e => setBidDuration(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      placeholder="Explain why you're the best fit for this project..."
                      value={coverLetter}
                      onChange={e => setCoverLetter(e.target.value)}
                      rows={8}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Proposal'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBidForm(false)}
                      className="flex-1"
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Existing Bids */}
            {jobBids.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Current Proposals ({jobBids.length})
                </h2>
                <div className="space-y-4">
                  {jobBids.map(bid => (
                    <BidCard key={bid.id} bid={bid} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Budget</span>
                  </div>
                  <p className="font-semibold">{job.budget || '$' + (job.budget_min || 0) + ' - $' + (job.budget_max || 0)}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold">{job.duration || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Experience Level
                  </p>
                  <Badge variant="outline">{job.experience_level || job.experienceLevel || 'N/A'}</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">About the Client</h3>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-lg font-semibold text-primary-foreground">
                  {job.client.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{job.client?.name || 'Client'}</p>
                    {job.client?.verified && (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  {job.client?.rating && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{job.client.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              {job.client?.total_jobs !== undefined && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Jobs Posted
                    </span>
                    <span className="font-medium">{job.client.total_jobs || job.client.totalJobs || 0}</span>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobDetail
