import { useState } from "react"
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
import jobsData from "@/data/jobs.json"
import bidsData from "@/data/bids.json"

const JobDetail = () => {
  const { id } = useParams()
  const job = jobsData.find(j => j.id === id)
  const jobBids = bidsData
    .filter(bid => bid.jobId === id)
    .map(bid => ({
      ...bid,
      status: bid.status
    }))

  const [showBidForm, setShowBidForm] = useState(false)
  const [bidAmount, setBidAmount] = useState("")
  const [bidDuration, setBidDuration] = useState("")
  const [coverLetter, setCoverLetter] = useState("")

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

  const handleSubmitBid = e => {
    e.preventDefault()
    toast.success("Your proposal has been submitted!")
    setShowBidForm(false)
    setBidAmount("")
    setBidDuration("")
    setCoverLetter("")
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
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {job.proposals} proposals
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">{job.category}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.skillsRequired.map(skill => (
                  <Badge key={skill} variant="outline">
                    {skill}
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
                    >
                      Submit Proposal
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBidForm(false)}
                      className="flex-1"
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
                  <p className="font-semibold">{job.budget}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold">{job.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Experience Level
                  </p>
                  <Badge variant="outline">{job.experienceLevel}</Badge>
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
                    <p className="font-semibold">{job.client.name}</p>
                    {job.client.verified && (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{job.client.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Total Jobs Posted
                  </span>
                  <span className="font-medium">{job.client.totalJobs}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default JobDetail
