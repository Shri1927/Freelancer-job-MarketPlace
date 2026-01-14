import { Trophy, Target, Star, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

export const AchievementStatsCard = ({ 
  totalAchievements = 0,
  earnedAchievements = 0,
  inProgressAchievements = 0,
  completionRate = 0,
}) => {
  const stats = [
    {
      label: 'Total Achievements',
      value: totalAchievements,
      icon: Trophy,
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      label: 'Earned',
      value: earnedAchievements,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    {
      label: 'In Progress',
      value: inProgressAchievements,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
  ];

  const overallProgress = totalAchievements > 0 
    ? (earnedAchievements / totalAchievements) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Achievement Completion</span>
                <span className="text-2xl font-bold text-primary">{completionRate}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{earnedAchievements} earned</span>
              <span>•</span>
              <span>{inProgressAchievements} in progress</span>
              <span>•</span>
              <span>{totalAchievements - earnedAchievements - inProgressAchievements} locked</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
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
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};









