import { Wallet, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const WithdrawBalanceCard = ({ 
  availableBalance, 
  pendingClearance, 
  inProgress 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-primary via-primary to-primary/90 border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium mb-1">
              Available for Withdrawal
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {formatCurrency(availableBalance)}
            </h2>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <Wallet className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-xs text-primary-foreground/70 font-medium">Pending</span>
            </div>
            <p className="text-xl font-bold text-white">{formatCurrency(pendingClearance)}</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Clears in 3-5 days</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary-foreground/70" />
              <span className="text-xs text-primary-foreground/70 font-medium">In Progress</span>
            </div>
            <p className="text-xl font-bold text-white">{formatCurrency(inProgress)}</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Active projects</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};









