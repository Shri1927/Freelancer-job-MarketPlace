import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const TransactionStatsCard = ({ 
  totalEarnings = 0,
  totalWithdrawals = 0,
  availableBalance = 0,
  period = 'All Time',
  earningsChange = 0,
  withdrawalsChange = 0,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      label: 'Total Earnings',
      value: formatCurrency(totalEarnings),
      icon: ArrowUpRight,
      change: earningsChange,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500',
      iconBg: 'bg-green-100',
    },
    {
      label: 'Total Withdrawals',
      value: formatCurrency(totalWithdrawals),
      icon: ArrowDownRight,
      change: withdrawalsChange,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      iconBg: 'bg-red-100',
    },
    {
      label: 'Available Balance',
      value: formatCurrency(availableBalance),
      icon: DollarSign,
      change: null,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change !== null && stat.change > 0;
        const isNegative = stat.change !== null && stat.change < 0;

        return (
          <Card key={index} className={cn("card-elevated animate-slide-up", stat.bgColor)} 
            style={{ animationDelay: `${index * 50}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", stat.iconBg)}>
                  <Icon className={cn("w-4 h-4", stat.iconColor)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className={cn("text-2xl font-bold tracking-tight", stat.color)}>
                  {stat.value}
                </p>
                {stat.change !== null && (
                  <div className="flex items-center gap-1.5">
                    {isPositive ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-semibold text-green-600">
                          +{Math.abs(stat.change)}%
                        </span>
                      </>
                    ) : isNegative ? (
                      <>
                        <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                        <span className="text-xs font-semibold text-red-600">
                          {stat.change}%
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground">No change</span>
                    )}
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                )}
                {stat.change === null && (
                  <p className="text-xs text-muted-foreground">{period}</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};









