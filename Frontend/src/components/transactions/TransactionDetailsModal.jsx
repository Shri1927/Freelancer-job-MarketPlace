import { Download, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusConfig = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'badge-success',
  },
  cleared: {
    label: 'Cleared',
    icon: CheckCircle2,
    className: 'badge-success',
  },
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
  failed: {
    label: 'Failed',
    icon: AlertCircle,
    className: 'badge-warning',
  },
  cancelled: {
    label: 'Cancelled',
    icon: AlertCircle,
    className: 'badge-muted',
  },
  withdrawn: {
    label: 'Withdrawn',
    icon: ArrowUpRight,
    className: 'badge-muted',
  },
  on_hold: {
    label: 'On Hold',
    icon: AlertCircle,
    className: 'badge-warning',
  },
};

const typeLabels = {
  earning: 'Earning',
  earnings: 'Earning',
  withdrawal: 'Withdrawal',
  withdrawals: 'Withdrawal',
  hourly: 'Hourly',
  fixed: 'Fixed Price',
  bonus: 'Bonus',
  adjustment: 'Adjustment',
  refund: 'Refund',
};

export const TransactionDetailsModal = ({
  transaction,
  isOpen,
  onClose,
  onDownloadInvoice,
}) => {
  if (!transaction) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTransactionType = (transaction) => {
    if (transaction.type === 'withdrawal' || transaction.amount < 0) {
      return 'withdrawal';
    }
    return 'earning';
  };

  const transactionType = getTransactionType(transaction);
  const isNegative = transactionType === 'withdrawal';
  const displayAmount = Math.abs(transaction.amount || 0);
  const status = statusConfig[transaction.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  const handleDownloadInvoice = () => {
    if (onDownloadInvoice) {
      onDownloadInvoice(transaction);
    } else {
      toast.success('Invoice downloaded', {
        description: `Invoice ${transaction.invoiceNumber || transaction.id} is being downloaded.`,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Transaction Details</DialogTitle>
          <DialogDescription>
            {transaction.invoiceNumber 
              ? `Invoice #${transaction.invoiceNumber}` 
              : `Transaction #${transaction.id}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <span className={cn(status.className, 'inline-flex items-center gap-1')}>
                <StatusIcon className="w-4 h-4" />
                {status.label}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className={cn(
                "text-2xl font-bold",
                isNegative ? "text-red-600" : "text-green-600"
              )}>
                {isNegative ? '-' : '+'}{formatCurrency(displayAmount)}
              </p>
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transaction Type</p>
            <div className="flex items-center gap-2">
              {transactionType === 'earning' ? (
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-600" />
              )}
              <p className="font-medium text-foreground">
                {typeLabels[transaction.type] || 
                 typeLabels[transactionType] || 
                 transaction.type}
              </p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date</p>
              <p className="font-medium text-foreground">
                {formatDate(transaction.date || transaction.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Time</p>
              <p className="font-medium text-foreground">
                {new Date(transaction.date || transaction.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Project/Description */}
          {(transaction.description || transaction.projectName || transaction.projectTitle) && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="font-medium text-foreground">
                {transaction.description || 
                 transaction.projectName || 
                 transaction.projectTitle}
              </p>
            </div>
          )}

          {/* Client Name */}
          {transaction.clientName && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Client</p>
              <p className="font-medium text-foreground">{transaction.clientName}</p>
            </div>
          )}

          {/* Invoice Number */}
          {transaction.invoiceNumber && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Invoice Number</p>
              <p className="font-medium text-foreground font-mono">
                {transaction.invoiceNumber}
              </p>
            </div>
          )}

          {/* Hourly Details */}
          {transaction.hoursWorked && transaction.hourlyRate && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hours Worked</p>
                <p className="font-medium text-foreground">
                  {transaction.hoursWorked} hours
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                <p className="font-medium text-foreground">
                  {formatCurrency(transaction.hourlyRate)}/hr
                </p>
              </div>
              <div className="col-span-2 border-t pt-2 mt-2">
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(transaction.hoursWorked * transaction.hourlyRate)}
                </p>
              </div>
            </div>
          )}

          {/* Transaction ID */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
            <p className="font-medium text-foreground font-mono text-xs">
              {transaction.id}
            </p>
          </div>

          {/* Additional Notes or Status Message */}
          {transaction.status === 'pending' && (
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Pending Transaction</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This transaction is pending and will be processed shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {transaction.status === 'processing' && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Processing Transaction</p>
                  <p className="text-xs text-blue-700 mt-1">
                    This transaction is being processed. You will receive a notification once it's completed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {transaction.invoiceNumber && (
              <Button 
                className="flex-1" 
                onClick={handleDownloadInvoice}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};









