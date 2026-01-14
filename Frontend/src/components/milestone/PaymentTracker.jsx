import {
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  TrendingUp,
  Receipt,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, formatDate } from '@/utils/milestoneUtils';
import { cn } from '@/lib/utils';

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: <Clock className="h-4 w-4" />, color: 'bg-muted text-muted-foreground' },
  processing: { label: 'Processing', icon: <Loader2 className="h-4 w-4 animate-spin" />, color: 'bg-primary text-primary-foreground' },
  completed: { label: 'Paid', icon: <CheckCircle2 className="h-4 w-4" />, color: 'bg-success text-success-foreground' },
  failed: { label: 'Failed', icon: <AlertCircle className="h-4 w-4" />, color: 'bg-destructive text-destructive-foreground' },
};

const PaymentTracker = ({ milestones, currency }) => {
  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
  const paidAmount = milestones
    .filter(m => m.status === 'paid' || m.payment?.status === 'completed')
    .reduce((sum, m) => sum + m.amount, 0);
  const pendingAmount = totalAmount - paidAmount;
  const progressPercent = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const paidMilestones = milestones.filter(m => m.status === 'paid' || m.payment?.status === 'completed');
  const pendingMilestones = milestones.filter(m => m.status !== 'paid' && m.payment?.status !== 'completed');

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-success/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            Payment Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(totalAmount, currency)}
              </p>
              <p className="text-xs text-muted-foreground">Total Contract</p>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">
                {formatCurrency(paidAmount, currency)}
              </p>
              <p className="text-xs text-muted-foreground">Received</p>
            </div>
            
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">
                {formatCurrency(pendingAmount, currency)}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Payment Progress</span>
              <span className="font-semibold text-foreground">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} variant="success" className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5 text-primary" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paidMilestones.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No payments received yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {paidMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between p-4 bg-success/5 rounded-xl border border-success/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {milestone.payment?.paidAt 
                          ? `Paid on ${formatDate(milestone.payment.paidAt)}`
                          : milestone.completedAt
                            ? `Paid on ${formatDate(milestone.completedAt)}`
                            : 'Payment completed'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">
                      +{formatCurrency(milestone.amount, currency)}
                    </p>
                    <Badge variant="success-light" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingMilestones.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="text-success font-medium">All payments received!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingMilestones.map((milestone) => {
                const paymentStatus = milestone.payment?.status || 'pending';
                const statusConfig = STATUS_CONFIG[paymentStatus];
                
                return (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {formatDate(milestone.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {formatCurrency(milestone.amount, currency)}
                      </p>
                      <Badge className={cn('text-xs gap-1', statusConfig.color)}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTracker;