import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    X, CheckCircle, Send, Clock, DollarSign, Upload,
    MessageSquare, Star
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { jobsAPI } from '@/services/api'
import { toast } from 'sonner'

const QuickApply = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const job = location.state?.job

    const [proposal, setProposal] = useState({
        coverLetter: `Hi ${job?.client.name},\n\nQuick apply for your ${job?.title} project!\n\nI have ${job?.matchScore}% skills match and can start immediately.\n\nBest regards,`,
        hours: 40,
        rate: 45,
        total: 1800
    })
    const [loading, setLoading] = useState(false)

    const submitQuickApply = async (e) => {
        e.preventDefault()
        if (!proposal.coverLetter.trim()) {
            toast.error('Please add a cover letter!')
            return
        }
        
        setLoading(true)
        try {
            await jobsAPI.apply(job.id, {
                amount: proposal.total,
                duration: `${proposal.hours} hours`,
                cover_letter: proposal.coverLetter,
            })
            
            toast.success('Proposal submitted successfully!')
            navigate('/dashboard/freelancer?view=proposals', {
                state: { success: 'Proposal submitted successfully!' }
            })
        } catch (error) {
            console.error('Error submitting proposal:', error)
            toast.error(error.response?.data?.message || 'Failed to submit proposal')
        } finally {
            setLoading(false)
        }
    }

    if (!job) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Job not found</h3>
                        <p className="text-muted-foreground mb-6">Please go back and select a job</p>
                        <Button onClick={() => navigate(-1)} className="w-full">
                            Go Back
                        </Button>
                        </div>
                </Card>
            
          </div >
      
    )
  }

return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Quick Apply</h2>
                            <p className="text-muted-foreground">{job.title}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Job Summary */}
                <Card className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="text-sm font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                                {job.matchScore}% Match
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                                    <span>{job.client.rating}</span>
                                </div>
                                <span>Budget: ${job.budget.min}-${job.budget.max}</span>
                                <span>{job.proposals}/{job.proposalsMax} proposals</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Proposal Form */}
                <form onSubmit={submitQuickApply} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Cover Letter (Editable)</label>
                        <Textarea
                            value={proposal.coverLetter}
                            onChange={(e) => setProposal(prev => ({ ...prev, coverLetter: e.target.value }))}
                            className="min-h-[120px] resize-none font-medium"
                            placeholder="Edit this quick proposal..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-lg">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Hours</label>
                            <Input
                                type="number"
                                value={proposal.hours}
                                onChange={(e) => {
                                    const hours = parseInt(e.target.value)
                                    setProposal(prev => ({ ...prev, hours, total: hours * prev.rate }))
                                }}
                                className="text-lg"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Rate $/hr</label>
                            <Input
                                type="number"
                                value={proposal.rate}
                                onChange={(e) => {
                                    const rate = parseFloat(e.target.value)
                                    setProposal(prev => ({ ...prev, rate, total: prev.hours * rate }))
                                }}
                                className="text-lg"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">Total Project Cost</span>
                            <span className="text-2xl font-bold text-green-800">
                                ${proposal.total.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 h-14 text-lg font-semibold"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Submit Quick Proposal
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-14 px-8"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                            Full Details
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    </div>
)
}

export default QuickApply
