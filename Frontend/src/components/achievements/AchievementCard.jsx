import { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Lock,
  Eye,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap = {
  Trophy,
  Star,
  Award,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
};

const categoryColors = {
  projects: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  earnings: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
  ratings: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  milestones: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
  },
  skills: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'text-orange-600',
    badge: 'bg-orange-100 text-orange-700',
  },
  default: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    icon: 'text-gray-600',
    badge: 'bg-gray-100 text-gray-700',
  },
};

export const AchievementCard = ({
  achievement,
  onView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[achievement.icon] || Trophy;
  const isEarned = achievement.status === 'earned';
  const isInProgress = achievement.status === 'in_progress';
  const isLocked = achievement.status === 'locked';
  
  const categoryColor = categoryColors[achievement.category] || categoryColors.default;
  const progress = achievement.progress !== undefined && achievement.target 
    ? (achievement.progress / achievement.target) * 100 
    : 0;

  const handleClick = () => {
    if (!isLocked && onView) {
      onView(achievement);
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all cursor-pointer group relative",
        isEarned && "border-primary/50 shadow-md hover:shadow-lg",
        isInProgress && "border-yellow-300 hover:shadow-md",
        isLocked && "opacity-60 border-gray-200 cursor-not-allowed"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Earned Badge */}
      {isEarned && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="default" className="gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 fill-current" />
            Earned
          </Badge>
        </div>
      )}

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-500">Locked</p>
          </div>
        </div>
      )}

      <CardContent className={cn(
        "p-6 relative",
        isEarned && categoryColor.bg,
        isInProgress && "bg-yellow-50",
        isLocked && "bg-gray-50"
      )}>
        {/* Icon */}
        <div className={cn(
          "w-16 h-16 mb-4 rounded-xl flex items-center justify-center transition-transform",
          isEarned ? categoryColor.icon : isLocked ? "text-gray-400" : "text-gray-500",
          isEarned && "bg-white shadow-sm group-hover:scale-110",
          isInProgress && "bg-yellow-100",
          isLocked && "bg-gray-100"
        )}>
          <Icon className={cn(
            "w-8 h-8",
            isEarned && "drop-shadow-sm"
          )} />
        </div>

        {/* Category Badge */}
        <Badge variant="outline" className={cn("mb-2 text-xs", categoryColor.badge)}>
          {achievement.category}
        </Badge>

        {/* Title */}
        <h3 className={cn(
          "text-lg font-semibold mb-2 line-clamp-2",
          isEarned ? "text-foreground" : isLocked ? "text-gray-500" : "text-foreground"
        )}>
          {achievement.title}
        </h3>

        {/* Description */}
        {achievement.description && (
          <p className={cn(
            "text-sm mb-4 line-clamp-2",
            isLocked ? "text-gray-400" : "text-muted-foreground"
          )}>
            {achievement.description}
          </p>
        )}

        {/* Progress Bar */}
        {isInProgress && achievement.progress !== undefined && achievement.target && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className={cn("font-medium", isLocked ? "text-gray-400" : "text-foreground")}>
                Progress
              </span>
              <span className={cn("font-semibold", isLocked ? "text-gray-400" : "text-foreground")}>
                {achievement.progress}/{achievement.target}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between pt-4 border-t">
          {isEarned && achievement.earnedDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Earned {new Date(achievement.earnedDate).toLocaleDateString()}</span>
            </div>
          )}
          {isInProgress && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-yellow-600" />
              <span>In Progress</span>
            </div>
          )}
          {isLocked && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-4 h-4 text-gray-400" />
              <span>Locked</span>
            </div>
          )}
          
          {!isLocked && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="h-7 text-xs"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};









