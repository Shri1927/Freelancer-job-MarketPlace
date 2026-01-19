import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { jobsAPI } from '@/services/api'
import { toast } from 'sonner'
import {
    ArrowLeft, Heart, MessageSquare, Download, CheckCircle,
    Star, MapPin, Clock, DollarSign, Users, Eye, FileText,
    Award, Zap, Send, Shield, Check, X
} from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const JobDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [saved, setSaved] = useState(false)
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState({
        coverLetter: '',
        hours: 40,
        rate: 45,
        deliveryDate: '2025-01-10'
    })
    const [submitting, setSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        loadJobDetails()
    }, [id])

    const loadJobDetails = async () => {
        try {
            setLoading(true)
            const response = await jobsAPI.getById(id)
            const jobData = response.data.data || response.data
            
            // Transform API data to match component structure
            setJob({
                id: jobData.id,
                title: jobData.title,
                category: jobData.category || 'Web Development',
                rating: jobData.client?.rating || 4.8,
                duration: jobData.duration || '3 weeks',
                location: jobData.location || 'Remote',
                posted: jobData.created_at ? new Date(jobData.created_at).toLocaleDateString() : 'Recently',
                client: {
                    name: jobData.client?.name || 'Client',
                    avatar: jobData.client?.avatar || '',
                    rating: jobData.client?.rating || 4.8,
                    reviews: jobData.client?.reviews || 23,
                    verified: jobData.client?.verified || true,
                    location: jobData.client?.location || 'San Francisco, USA',
                    hires: jobData.client?.hires || 15,
                    successRate: jobData.client?.success_rate || 98
                },
                budget: {
                    min: parseFloat(jobData.budget_min || 2500),
                    max: parseFloat(jobData.budget_max || 4500),
                    type: jobData.budget_type || 'fixed'
                },
                skills: Array.isArray(jobData.skills) ? jobData.skills : (jobData.skills_required || []),
                description: jobData.description || '',
                requirements: jobData.requirements || [],
                deliverables: jobData.deliverables || [],
                files: jobData.files || []
            })
        } catch (error) {
            console.error('Error loading job:', error)
            toast.error('Failed to load job details')
        } finally {
            setLoading(false)
        }
    }

    // Fallback job data if API fails
    const fallbackJob = {
        id: parseInt(id) || 1,
        title: 'Senior React Developer for E-commerce Dashboard',
        category: 'Web Development', // ✅ NEW: Category
        rating: 4.8, // ✅ NEW: Client rating
         duration: '3 weeks', // ✅ NEW: Duration
        location: 'Remote', // ✅ NEW: Location
        posted: '3h ago', // ✅ NEW: Posted time
        client: {
            name: 'TechCorp Inc.',
            avatar: '',
            rating: 4.8,
            reviews: 23,
            verified: true,
            location: 'San Francisco, USA',
            hires: 15,
            successRate: 98
        },
        budget: { min: 2500, max: 4500, type: 'fixed' },
        skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AWS', 'Stripe'],
        description: `We need an experienced React developer to build a comprehensive admin dashboard for our e-commerce platform.

## Core Requirements
• Real-time sales analytics with charts  
• User & order management system
• Inventory tracking with low-stock alerts
• Payment integration (Stripe/PayPal)
• Role-based access control (RBAC)
• Mobile-responsive design

## Tech Stack
• Frontend: React 18+, TypeScript, Tailwind CSS
• Backend: Node.js/Express (API provided)
• Database: PostgreSQL
• Deployment: AWS/Vercel



## Timeline
3 weeks (milestone payments)

## Budget
$2,500 - $4,500 fixed price
`,
        requirements: [
            '5+ years React experience',
            'TypeScript proficiency',
            'Experience with real-time data (WebSockets/Socket.io)',
            'Stripe/PayPal integration',
            'AWS deployment experience'
        ],
        deliverables: [
            'Admin dashboard UI',
            'User management module',
            'Analytics dashboard',
            'Payment integration',
            'Documentation & tests',
            'API integration documentation' ,
        ],
        files: [
            { name: 'project_brief.pdf', size: '245 KB', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
            { name: 'api_docs.zip', size: '1.2 MB', url: 'https://github.com/jgraph/drawio/releases/download/v21.7.11/drawio-21.7.11-win.zip' },
            { name: 'design_mockups.fig', size: '892 KB', url: 'https://github.com/figma/plugin-samples/archive/refs/heads/master.zip' }
        ],
    }

    const downloadFile = (fileUrl, fileName) => {
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleMessageClient = () => {
        alert(`💬 Chat opened with ${currentJob.client.name}\n\nMessage them about "${currentJob.title}"`)
    }

    const submitProposal = async (e) => {
        e.preventDefault()
        if (!proposal.coverLetter.trim()) {
            toast.error('Please add a cover letter!')
            return
        }

        setSubmitting(true)
        try {
            await jobsAPI.apply(id, {
                amount: proposal.rate * proposal.hours,
                duration: `${proposal.hours} hours`,
                cover_letter: proposal.coverLetter,
            })
            
            setShowSuccess(true)
            setProposal({ coverLetter: '', hours: 40, rate: 45, deliveryDate: '2025-01-10' })
        } catch (error) {
            console.error('Error submitting proposal:', error)
            toast.error(error.response?.data?.message || 'Failed to submit proposal')
        } finally {
            setSubmitting(false)
        }
    }

    const quickApply = () => {
        setProposal(prev => ({
            ...prev,
            coverLetter: `Hi ${currentJob.client.name},\n\nI'm excited about your React dashboard project. With 5+ years of React/TypeScript experience and recent e-commerce projects, I can deliver:\n\n✅ Real-time analytics\n✅ Stripe integration\n✅ Mobile-responsive design\n\nI can complete this in 3 weeks for $${(prev.rate * prev.hours).toLocaleString()}.\n\nLooking forward to discussing!\n\nBest,\n[Your Name]`
        }))
    }

    const toggleSave = () => setSaved(!saved)

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading job details...</p>
                </div>
            </div>
        )
    }

    const currentJob = job || fallbackJob

    return (
        <>
            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Check className="w-12 h-12 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Proposal Submitted!</h2>
                            <p className="text-gray-600">Your proposal has been sent successfully!</p>
                            <p className="text-green-700 font-semibold mt-2">
                                💰 Total: ${(proposal.rate * proposal.hours).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="flex-1" onClick={() => navigate('/dashboard/freelancer?view=proposals')}>
                                View Proposals
                            </Button>
                            <Button variant="outline" className="flex-1" onClick={() => setShowSuccess(false)}>
                                Submit Another
                            </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setShowSuccess(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" onClick={() => navigate('/discover')} className="gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Discover
                        </Button>
                        <div className="flex-1" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSave}
                            className={`hover:bg-primary/10 ${saved ? 'text-primary' : 'text-gray-500'}`}
                        >
                            <Heart className={`w-5 h-5 ${saved ? 'fill-primary' : ''}`} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-5">
                            {/* ✅ NEW: Dashboard-style Job Header */}
                            <Card className="p-6 border-primary/20">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
                                    <div className="flex-1">
                                       
                                        <div className="flex  gap-4 text-sm text-muted-foreground mb-3 ">
                                            <span className='text-right'>Posted {currentJob.posted}</span>
                                        </div>
                                        <div className="flex flex-wrap items-start gap-4 mb-6">
                                            <h1 className="text-xl lg:text-2xl font-bold leading-tight flex-1 min-w-0 pr-4">
                                                {currentJob.title}
                                            </h1>
                                            <Badge variant="outline" className="whitespace-nowrap">
                                                {currentJob.category}
                                            </Badge>
                                        </div>
                                        {/* ✅ NEW: Dashboard-style info row */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4  text-sm">
                                           
                                            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                <span>${currentJob.budget.min.toLocaleString()}-${currentJob.budget.max.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span>{currentJob.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-green-100 rounded-lg">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                                <span>{currentJob.location}</span>
                                            </div>
                                        </div>
                                        {/* ✅ NEW: Posted info */}
                                        
                                    </div>
                                    
                                </div>
                            </Card>

                            {/* ✅ NEW: Skills Section */}
                            <Card className="p-6 border-primary/20">
                                <h2 className="text-1xl font-bold mb-6 flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {currentJob.skills.map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
                                            {typeof skill === 'string' ? skill : skill.name || skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>

                            <Card className="p-6 border-primary/20">
                                <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                                <div className="prose prose-lg max-w-none leading-relaxed space-y-6">

                                    <div dangerouslySetInnerHTML={{
                                        __html: `
      <div class="space-y-8">
        ${(currentJob.description || '').split('\n\n').slice(1).map(section =>
                                            section.includes('##') ?
                                                `<div class="space-y-4">
            <h3 class="text-xl font-bold text-primary">${section.split('\n')[0].replace('## ', '')}</h3>
            ${section.split('\n').slice(1).join('<br>')}
          </div>` :
                                                `<p class="text-muted-foreground">${section}</p>`
                                        ).join('')}
      </div>
    ` }} />
                                </div>
                            </Card>



                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="p-4 border-primary/20">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        Requirements
                                    </h3>
                                    <ul className="space-y-2">
                                        {(currentJob.requirements || []).map((req, i) => (
                                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                                <Card className="p-4 border-primary/20">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Deliverables
                                    </h3>
                                    <ul className="space-y-2">
                                        {(currentJob.deliverables || []).map((del, i) => (
                                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                <span>{del}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>

                            {(currentJob.files || []).length > 0 && (
                                <Card className="p-6 border-primary/20">
                                    <h3 className="text-xl font-semibold mb-4">Attached Files</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {currentJob.files.map((file, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            className="h-auto p-4 justify-start gap-3 hover:bg-primary/10"
                                            onClick={() => downloadFile(file.url, file.name)}
                                        >
                                            <Download className="w-5 h-5" />
                                            <div className="text-left">
                                                <div className="font-medium">{file.name}</div>
                                                <div className="text-xs text-muted-foreground">{file.size}</div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </Card>
                            )}
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6 border-primary/20  top-24 self-start">
                                <h3 className="text-lg font-semibold mb-4">Client</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="w-16 h-16">
                                            <AvatarFallback className="bg-primary text-white text-xl font-bold">
                                                TC
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-lg truncate">{currentJob.client.name}</h4>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                                                    <span className="font-medium">{currentJob.client.rating}</span>
                                                    <span className="text-sm text-muted-foreground">({currentJob.client.reviews})</span>
                                                </div>
                                                {currentJob.client.verified && (
                                                    <Badge variant="outline" className="gap-1 text-xs">
                                                        <Shield className="w-3 h-3" />
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{currentJob.client.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                                            <Users className="w-4 h-4 text-primary" />
                                            <span>{currentJob.client.hires} hires</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-green-100 rounded-lg">
                                            <Award className="w-4 h-4 text-green-700" />
                                            <span>{currentJob.client.successRate}% success</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80" onClick={handleMessageClient}>
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Message Client
                                    </Button>
                                </div>
                            </Card>

                            

                            <Card className="p-6 border-primary/20">
                                <h3 className="text-lg font-semibold mb-6">Submit Proposal</h3>
                                <form onSubmit={submitProposal} className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Cover Letter</label>
                                        <Textarea
                                            placeholder="Tell the client why you're perfect for this job..."
                                            value={proposal.coverLetter}
                                            onChange={(e) => setProposal(prev => ({ ...prev, coverLetter: e.target.value }))}
                                            className="min-h-[120px] resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Your Bid Amount</label>
                                            <Input
                                                type="number"
                                                value={proposal.rate}
                                                onChange={(e) => setProposal(prev => ({ ...prev, hours: parseInt(e.target.value) || 40 }))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Project Duration</label>
                                            <Input
                                                type="number"
                                                value={proposal.hours}
                                                onChange={(e) => setProposal(prev => ({ ...prev, rate: parseFloat(e.target.value) || 45 }))}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full h-14 bg-gradient-to-r from-primary to-primary/80 text-lg"
                                        disabled={submitting || !proposal.coverLetter.trim()}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {submitting ? 'Submitting...' : 'Submit Proposal'}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDetails
