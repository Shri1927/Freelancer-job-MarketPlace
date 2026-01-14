import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'badge-pending',
  },
  processing: {
    label: 'Processing',
    icon: Clock,
    className: 'badge-pending',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'badge-success',
  },
  failed: {
    label: 'Failed',
    icon: AlertCircle,
    className: 'badge-warning',
  },
  cancelled: {
    label: 'Cancelled',
    icon: X,
    className: 'badge-muted',
  },
};

const methodLabels = {
  bank: 'Bank Transfer',
  paypal: 'PayPal',
  wise: 'Wise',
  wallet: 'Digital Wallet',
};

export const WithdrawalHistory = ({ withdrawals = [], onCancel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filterWithdrawals = (withdrawals) => {
    const now = new Date();
    const filterTime = (dateString) => {
      const date = new Date(dateString);
      switch (timeFilter) {
        case 'today':
          return date.toDateString() === now.toDateString();
        case 'this_week':
          const weekAgo = new Date(now);
          weekAgo.setDate(now.getDate() - 7);
          return date >= weekAgo;
        case 'this_month':
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case 'last_month':
          const lastMonth = new Date(now);
          lastMonth.setMonth(now.getMonth() - 1);
          return date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
        case 'last_3_months':
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          return date >= threeMonthsAgo;
        default:
          return true;
      }
    };

    return withdrawals.filter((wd) => {
      const matchesSearch = 
        wd.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        methodLabels[wd.method]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wd.methodName?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || wd.status === statusFilter;
      const matchesTime = timeFilter === 'all' || filterTime(wd.createdAt || wd.date);
      
      return matchesSearch && matchesStatus && matchesTime;
    });
  };

  const filteredWithdrawals = filterWithdrawals(withdrawals);

  const handleExport = (format) => {
    toast.success(`Exporting ${filteredWithdrawals.length} withdrawals as ${format}`, {
      description: 'Your download will start shortly.',
    });
  };

  const handleCancel = (withdrawal) => {
    if (window.confirm('Are you sure you want to cancel this withdrawal?')) {
      if (onCancel) onCancel(withdrawal.id);
      toast.success('Withdrawal cancelled');
      setSelectedWithdrawal(null);
    }
  };

  const totalAmount = filteredWithdrawals.reduce((sum, wd) => sum + (wd.amount || wd.totalAmount || 0), 0);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle>Withdrawal History</CardTitle>
              <CardDescription>
                {filteredWithdrawals.length} withdrawals • {formatCurrency(totalAmount)} total
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search withdrawals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-56"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-full sm:w-36">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this_week">This Week</SelectItem>
                  <SelectItem value="this_month">This Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                  <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleExport('CSV')} className="cursor-pointer">
                    <FileText className="w-4 h-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('PDF')} className="cursor-pointer">
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredWithdrawals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground mb-1">No withdrawals found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== 'all' || timeFilter !== 'all'
                  ? 'Try adjusting your filters' 
                  : 'Your withdrawal history will appear here'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Date
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Method
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Amount
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Fee
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Status
                    </th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredWithdrawals.map((withdrawal) => {
                    const status = statusConfig[withdrawal.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    const amount = withdrawal.amount || withdrawal.totalAmount || 0;
                    const fee = withdrawal.fee || 0;
                    const netAmount = amount - fee;

                    return (
                      <tr
                        key={withdrawal.id}
                        className="hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedWithdrawal(withdrawal)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-foreground">{formatDate(withdrawal.createdAt || withdrawal.date)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {methodLabels[withdrawal.method] || withdrawal.methodName || withdrawal.method}
                            </p>
                            {withdrawal.methodName && withdrawal.method !== withdrawal.methodName && (
                              <p className="text-xs text-muted-foreground">{withdrawal.methodName}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{formatCurrency(amount)}</p>
                            {fee > 0 && (
                              <p className="text-xs text-muted-foreground">Net: {formatCurrency(netAmount)}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-muted-foreground">
                            {fee === 0 ? 'Free' : formatCurrency(fee)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(status.className, 'inline-flex items-center gap-1')}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWithdrawal(withdrawal);
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {filteredWithdrawals.length > 0 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredWithdrawals.length}</span> of {withdrawals.length} withdrawals
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal Detail Modal */}
      <Dialog
        open={!!selectedWithdrawal}
        onOpenChange={(open) => {
          if (!open) setSelectedWithdrawal(null);
        }}
      >
        <DialogContent className="sm:max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl">Withdrawal Details</DialogTitle>
            <DialogDescription>
              ID: {selectedWithdrawal?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedWithdrawal && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{formatDateTime(selectedWithdrawal.createdAt || selectedWithdrawal.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  {(() => {
                    const statusInfo = statusConfig[selectedWithdrawal.status] || statusConfig.pending;
                    const StatusIcon = statusInfo.icon;
                    return (
                      <span className={cn(statusInfo.className, 'inline-flex items-center gap-1')}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-medium">
                  {methodLabels[selectedWithdrawal.method] || selectedWithdrawal.methodName || selectedWithdrawal.method}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Withdrawal Amount</p>
                  <p className="font-medium">{formatCurrency(selectedWithdrawal.amount || selectedWithdrawal.totalAmount || 0)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Processing Fee</p>
                  <p className="font-medium">
                    {selectedWithdrawal.fee === 0 ? 'Free' : formatCurrency(selectedWithdrawal.fee || 0)}
                  </p>
                </div>
                <div className="border-t pt-2 flex items-center justify-between">
                  <p className="text-sm font-semibold">Amount Received</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency((selectedWithdrawal.amount || selectedWithdrawal.totalAmount || 0) - (selectedWithdrawal.fee || 0))}
                  </p>
                </div>
              </div>

              {(selectedWithdrawal.status === 'pending' || selectedWithdrawal.status === 'processing') && (
                <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Withdrawal in progress</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Your withdrawal is being processed. You will receive a notification once it's completed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {(selectedWithdrawal.status === 'pending' || selectedWithdrawal.status === 'processing') && onCancel && (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleCancel(selectedWithdrawal)}
                    className="flex-1"
                  >
                    Cancel Withdrawal
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedWithdrawal(null)}
                  className={selectedWithdrawal.status === 'pending' || selectedWithdrawal.status === 'processing' ? '' : 'flex-1'}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

