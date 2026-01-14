import { ExternalLink, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

export const TransactionTable = ({ 
  transactions = [],
  onTransactionClick,
  emptyMessage = 'No transactions found',
}) => {
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

  const getTransactionType = (transaction) => {
    // Determine if it's an earning or withdrawal
    if (transaction.type === 'withdrawal' || transaction.amount < 0) {
      return 'withdrawal';
    }
    return 'earning';
  };

  const getDisplayAmount = (transaction) => {
    const amount = Math.abs(transaction.amount || 0);
    const type = getTransactionType(transaction);
    return type === 'withdrawal' ? -amount : amount;
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-1">No transactions found</p>
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Description
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => {
                const status = statusConfig[transaction.status] || statusConfig.pending;
                const StatusIcon = status.icon;
                const transactionType = getTransactionType(transaction);
                const displayAmount = getDisplayAmount(transaction);
                const isNegative = transactionType === 'withdrawal';

                return (
                  <tr
                    key={transaction.id}
                    className="table-row-interactive cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => onTransactionClick?.(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-foreground">
                        {formatDate(transaction.date || transaction.createdAt)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {transaction.description || 
                           transaction.projectName || 
                           transaction.projectTitle || 
                           'Transaction'}
                        </p>
                        {transaction.clientName && (
                          <p className="text-xs text-muted-foreground">{transaction.clientName}</p>
                        )}
                        {transaction.invoiceNumber && (
                          <p className="text-xs text-muted-foreground">
                            Invoice: {transaction.invoiceNumber}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {transactionType === 'earning' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {typeLabels[transaction.type] || 
                           typeLabels[transactionType] || 
                           transaction.type}
                        </span>
                      </div>
                      {transaction.hoursWorked && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {transaction.hoursWorked}h × ${transaction.hourlyRate}/hr
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(status.className, 'inline-flex items-center gap-1')}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </td>
                    <td className={cn(
                      "px-6 py-4 whitespace-nowrap text-right text-sm font-semibold",
                      isNegative ? "text-red-600" : "text-green-600"
                    )}>
                      {isNegative ? '-' : '+'}{formatCurrency(displayAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTransactionClick?.(transaction);
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
      </CardContent>
    </Card>
  );
};









