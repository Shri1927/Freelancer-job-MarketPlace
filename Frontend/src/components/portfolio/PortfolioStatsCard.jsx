import { Briefcase, FolderOpen, Star, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const PortfolioStatsCard = ({ 
  totalProjects = 0,
  categories = 0,
  featuredProjects = 0,
  totalViews = 0,
}) => {
  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: Briefcase,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      label: 'Categories',
      value: categories,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      label: 'Featured Projects',
      value: featuredProjects,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    {
      label: 'Total Views',
      value: totalViews,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card 
            key={index} 
            className={cn("card-elevated animate-slide-up", stat.bgColor)} 
            style={{ animationDelay: `${index * 50}ms` }}
          >
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
              <p className={cn("text-2xl font-bold tracking-tight", stat.color)}>
                {formatNumber(stat.value)}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};









