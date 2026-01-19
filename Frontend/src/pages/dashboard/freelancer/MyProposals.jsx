import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Clock, DollarSign, CheckCircle,
  XCircle, AlertCircle, Eye, FileText, MessageSquare,
  Calendar, TrendingUp, Users, Star, Download
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import FreelancerSidebar from './FreelancerSidebar';
import { proposalsAPI } from '@/services/api';
import { toast } from 'sonner';

const MyProposals = () => {
  // State for proposals
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    try {
      setLoading(true);
      // Note: This endpoint may need to be added to the backend
      const response = await proposalsAPI.getMyProposals();
      const proposalsData = response.data.data || response.data || [];
      
      // Transform API data to match component structure
      const transformedProposals = proposalsData.map(proposal => ({
        id: proposal.id,
        jobTitle: proposal.job?.title || 'Untitled Job',
        client: proposal.job?.client?.name || 'Client',
        clientRating: proposal.job?.client?.rating || 0,
        budget: proposal.job?.budget || '$0',
        submittedDate: proposal.created_at || new Date().toISOString(),
        status: proposal.status || 'submitted',
        coverLetter: proposal.cover_letter || '',
        proposalAmount: `$${proposal.amount || 0}`,
        timeline: proposal.duration || 'N/A',
        attachments: proposal.attachments?.length || 0,
        messages: proposal.messages_count || 0,
        lastUpdated: proposal.updated_at || proposal.created_at,
        skills: proposal.job?.skills || [],
        description: proposal.job?.description || '',
        requirements: proposal.job?.requirements || [],
        deliverables: proposal.job?.deliverables || [],
        projectDuration: proposal.duration || 'N/A',
      }));
      
      setProposals(transformedProposals);
    } catch (error) {
      console.error('Error loading proposals:', error);
      toast.error('Failed to load proposals');
      // Fallback to empty array
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  // Filters, search, sort
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [stats, setStats] = useState({
    total: 18,
    submitted: 6,
    viewed: 4,
    shortlisted: 3,
    accepted: 2,
    rejected: 3,
    successRate: "27.8%"
  });

  // Helpers
  const isWithinLastDays = (dateString, days) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= days;
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'submitted':
        return { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'Submitted' };
      case 'viewed':
        return { color: 'bg-purple-100 text-purple-800', icon: Eye, label: 'Viewed' };
      case 'shortlisted':
        return { color: 'bg-amber-100 text-amber-800', icon: TrendingUp, label: 'Shortlisted' };
      case 'accepted':
        return { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle, label: 'Accepted' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle, label: 'Unknown' };
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = searchTerm === '' ||
      proposal.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;

    const matchesDate = dateFilter === 'all' ||
      (dateFilter === 'last7' && isWithinLastDays(proposal.submittedDate, 7)) ||
      (dateFilter === 'last30' && isWithinLastDays(proposal.submittedDate, 30));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedProposals = [...filteredProposals].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.submittedDate) - new Date(a.submittedDate);
      case 'oldest':
        return new Date(a.submittedDate) - new Date(b.submittedDate);
      case 'amount-high':
        return parseFloat(b.proposalAmount.replace('$', '').replace(',', '')) -
          parseFloat(a.proposalAmount.replace('$', '').replace(',', ''));
      case 'amount-low':
        return parseFloat(a.proposalAmount.replace('$', '').replace(',', '')) -
          parseFloat(b.proposalAmount.replace('$', '').replace(',', ''));
      default:
        return 0;
    }
  });

  const handleWithdrawProposal = (id) => {
    if (window.confirm('Are you sure you want to withdraw this proposal?')) {
      setProposals(prev => prev.filter(p => p.id !== id));
      setStats(prev => ({ ...prev, total: prev.total - 1, submitted: prev.submitted - 1 }));
    }
  };

  const handleViewDetails = (proposal) => setSelectedProposal(proposal);
  const handleDownloadProposal = (proposal) => alert(`Downloading proposal for: ${proposal.jobTitle}`);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Proposals</h1>
        <p className="text-gray-600">Track and manage all your job proposals in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Total Proposals */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Proposals</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg"><FileText className="w-6 h-6 text-blue-600" /></div>
          </div>
        </div>
        {/* Success Rate */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-xl font-bold text-gray-900">{stats.successRate}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg"><TrendingUp className="w-6 h-6 text-emerald-600" /></div>
          </div>
        </div>
        {/* Active Conversations */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Conversations</p>
              <p className="text-xl font-bold text-gray-900">8</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg"><MessageSquare className="w-6 h-6 text-purple-600" /></div>
          </div>
        </div>
        {/* Avg Response */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Response Time</p>
              <p className="text-xl font-bold text-gray-900">2.5 days</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg"><Clock className="w-6 h-6 text-amber-600" /></div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search proposals by job title or client name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">
            <select className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="viewed">Viewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <select className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">All Time</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
            </select>

            <select className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>

            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </div>

      

      {/* Proposals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProposals.map((proposal) => {
                const statusConfig = getStatusConfig(proposal.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr key={proposal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {proposal.jobTitle}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {proposal.timeline}
                          </span>
                          {proposal.attachments > 0 && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {proposal.attachments} file{proposal.attachments !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{proposal.client}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs text-gray-500">{proposal.clientRating}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{proposal.proposalAmount}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Client budget: {proposal.budget}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">{statusConfig.label}</span>
                      </div>
                      {proposal.lastUpdated && (
                        <p className="text-xs text-gray-500 mt-1">Updated {proposal.lastUpdated}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{formatDate(proposal.submittedDate)}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {proposal.messages > 0 ? `${proposal.messages} messages` : 'No messages yet'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(proposal)}
                          className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          View
                        </button>
                       
                        {proposal.status === 'submitted' && (
                          <button
                            onClick={() => handleWithdrawProposal(proposal.id)}
                            className="px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            Withdraw
                          </button>
                        )}
                       
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden divide-y">
          {sortedProposals.map((proposal) => {
            const statusConfig = getStatusConfig(proposal.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div key={proposal.id} className="p-4 space-y-3">
                {/* Header */}
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {proposal.jobTitle}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>

                {/* Client */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{proposal.client}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {proposal.clientRating}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-sm">
                  <span className="font-medium">{proposal.proposalAmount}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({proposal.timeline})
                  </span>
                </div>

                {/* Meta */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatDate(proposal.submittedDate)}</span>
                  <span>{proposal.messages} messages</span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(proposal)}
                    className="flex-1 bg-blue-50 text-blue-700 py-1.5 rounded-lg text-sm"
                  >
                    View
                  </button>

                  

                  {proposal.status === 'submitted' && (
                    <button
                      onClick={() => handleWithdrawProposal(proposal.id)}
                      className="w-full bg-red-50 text-red-700 py-1.5 rounded-lg text-sm"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>


        {sortedProposals.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Proposal Details Modal */}
      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Proposal Details</h2>
                  <p className="text-gray-600 mt-1 text-sm">Proposal for {selectedProposal.jobTitle}</p>
                </div>
                <button onClick={() => setSelectedProposal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">

                  {/* Project Overview Card (NEW) */}
                  <Card className="p-6 border-primary/20">
                    <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                   
                    <div className="prose prose-lg max-w-none leading-relaxed space-y-6">

                      <div dangerouslySetInnerHTML={{
                        __html: `
      <div class="space-y-8">
        ${selectedProposal.description.split('\n\n').slice(1).map(section =>
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

                  {/* Requirements & Deliverables Grid (NEW) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border-primary/20">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {selectedProposal.requirements && selectedProposal.requirements.length > 0 ? (
                          selectedProposal.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No specific requirements listed.</p>
                        )}
                      </ul>
                    </Card>

                    <Card className="p-6 border-primary/20">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {selectedProposal.deliverables && selectedProposal.deliverables.length > 0 ? (
                          selectedProposal.deliverables.map((del, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No deliverables specified.</p>
                        )}
                      </ul>
                    </Card>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Proposal Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                        <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
                        <span className="font-bold text-lg">{selectedProposal.proposalAmount}</span>
                        <span className="text-sm text-gray-600">Amount</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                        <Clock className="w-6 h-6 text-green-600 mb-2" />
                        <span className="font-bold text-lg">{selectedProposal.timeline}</span>
                        <span className="text-sm text-gray-600">Timeline</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-600 mb-2" />
                        <span className="font-bold text-lg">{selectedProposal.attachments}</span>
                        <span className="text-sm text-gray-600">Files</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-amber-600 mb-2" />
                        <span className="font-bold text-lg">{selectedProposal.messages}</span>
                        <span className="text-sm text-gray-600">Messages</span>
                      </div>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <Card className="p-6 border-primary/20">
                    <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed space-y-4">
                      {selectedProposal.coverLetter}
                    </div>
                    
                  </Card>

                  {/* Status & Timeline */}
                  <Card className="p-6 border-primary/20">
                    <h3 className="text-xl font-semibold mb-4">Proposal Status & Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-3">
                          {['submitted', 'viewed', 'shortlisted', 'accepted'].map((step, index) => {
                            const steps = ['submitted', 'viewed', 'shortlisted', 'accepted'];
                            const isActive = step === selectedProposal.status;
                            const isCompleted = steps.indexOf(step) <= steps.indexOf(selectedProposal.status);

                            return (
                              <div key={step} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
                            ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
                                  {isCompleted ? '✓' : index + 1}
                                </div>
                                <div>
                                  <p className={`font-medium ${isActive ? 'text-emerald-700' : 'text-gray-900'}`}>
                                    {step.charAt(0).toUpperCase() + step.slice(1)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {step === 'submitted' && 'Proposal submitted'}
                                    {step === 'viewed' && 'Client viewed your proposal'}
                                    {step === 'shortlisted' && 'You are shortlisted'}
                                    {step === 'accepted' && 'Proposal accepted'}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Submitted Date:</span>
                            <span className="font-medium">{formatDate(selectedProposal.submittedDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">{selectedProposal.lastUpdated}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Project Duration:</span>
                            <span className="font-medium">{selectedProposal.projectDuration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Client Budget:</span>
                            <span className="font-medium">{selectedProposal.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Attachments */}
                  {selectedProposal.attachments > 0 && (
                    <Card className="p-6 border-primary/20">
                      <h3 className="text-xl font-semibold mb-4">Attachments ({selectedProposal.attachments})</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Array.from({ length: selectedProposal.attachments }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handleDownloadProposal(selectedProposal)}
                            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Download className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                              <p className="font-medium text-gray-900">Attachment {i + 1}</p>
                              <p className="text-xs text-gray-500">Click to download</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </Card>
                  )}

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                  {/* Client Card */}
                  <Card className="p-6 border-primary/20">
                    <h3 className="text-lg font-semibold mb-4">Client Information</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white flex items-center justify-center text-2xl font-bold">
                        {selectedProposal.client.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{selectedProposal.client}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{selectedProposal.clientRating}</span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span className="text-sm text-gray-600">Rated</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSendMessage(selectedProposal.client)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Message Client
                    </button>
                   
                  </Card>

                  {/* Actions */}
                  <Card className="p-6 border-primary/20 space-y-3">
                    <h3 className="text-lg font-semibold mb-2">Actions</h3>
                    <button
                      onClick={() => handleDownloadProposal(selectedProposal)}
                      className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Proposal
                    </button>

                    {selectedProposal.status === 'submitted' && (
                      <button
                        onClick={() => {
                          handleWithdrawProposal(selectedProposal.id);
                          setSelectedProposal(null);
                        }}
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium transition-colors"
                      >
                        Withdraw Proposal
                      </button>
                    )}
                  </Card>

                  {/* Skills */}
                  <Card className="p-6 border-primary/20">
                    <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                  <Card className="p-6 border-primary/20 ">
                   <div className="space-y-4 mb-2">
                     <div className="flex justify-between items-center p-3 rounded-lg">
                      <span className="text-gray-700">Your Bid Amount :</span>
                      <span className="font-bold bg-blue-100 text-blue-700">{selectedProposal.proposalAmount}</span>
                    </div>
                    <div className="flex justify-between items-center p-3  rounded-lg">
                      <span className="text-gray-700">Project Duration :</span>
                      <span className="font-bold  bg-blue-100 text-blue-700">{selectedProposal.projectDuration}</span>
                    </div>
                    </div>
                      </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Pagination */}
      <div className=" flex flex-col sm:flex-row gap-3 items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{sortedProposals.length}</span> of{' '}
          <span className="font-medium">{proposals.length}</span> proposals
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProposals;