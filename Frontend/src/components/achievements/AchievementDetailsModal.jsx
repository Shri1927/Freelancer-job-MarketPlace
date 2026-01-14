import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
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
  Sparkles,
  Calendar,
} from 'lucide-react';
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

export const AchievementDetailsModal = ({
  achievement,
  isOpen,
  onClose,
}) => {
  if (!achievement) return null;

  const Icon = iconMap[achievement.icon] || Trophy;
  const isEarned = achievement.status === 'earned';
  const isInProgress = achievement.status === 'in_progress';
  const isLocked = achievement.status === 'locked';
  
  const categoryColor = categoryColors[achievement.category] || categoryColors.default;
  const progress = achievement.progress !== undefined && achievement.target 
    ? (achievement.progress / achievement.target) * 100 
    : 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              isEarned ? categoryColor.icon + ' ' + categoryColor.bg : "bg-gray-100 text-gray-400"
            )}>
              <Icon className="w-6 h-6" />
            </div>
            {achievement.title}
          </DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className={cn("mt-2", categoryColor.badge)}>
              {achievement.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Banner */}
          {isEarned && (
            <div className={cn("p-4 rounded-xl border", categoryColor.bg, categoryColor.border)}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Sparkles className={cn("w-5 h-5", categoryColor.icon)} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Achievement Earned!</p>
                  {achievement.earnedDate && (
                    <p className="text-sm text-muted-foreground">
                      Earned on {formatDate(achievement.earnedDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {isInProgress && (
            <div className="p-4 rounded-xl border bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">In Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Keep going to unlock this achievement
                  </p>
                </div>
              </div>
            </div>
          )}

          {isLocked && (
            <div className="p-4 rounded-xl border bg-gray-50 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Locked</p>
                  <p className="text-sm text-muted-foreground">
                    Complete prerequisites to unlock
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {achievement.description && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Description</h3>
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {achievement.description}
              </p>
            </div>
          )}

          {/* Progress */}
          {isInProgress && achievement.progress !== undefined && achievement.target && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">Progress</h3>
                <span className="text-sm font-semibold text-foreground">
                  {achievement.progress}/{achievement.target}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {achievement.target - achievement.progress} more to go
              </p>
            </div>
          )}

          {/* Requirements */}
          {achievement.requirements && achievement.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Requirements</h3>
              <ul className="space-y-2">
                {achievement.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={cn(
                      "w-4 h-4 mt-0.5 flex-shrink-0",
                      req.completed ? "text-green-600" : "text-gray-400"
                    )} />
                    <span className={cn(req.completed ? "text-foreground" : "text-muted-foreground")}>
                      {req.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewards */}
          {achievement.rewards && achievement.rewards.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Rewards</h3>
              <div className="flex flex-wrap gap-2">
                {achievement.rewards.map((reward, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {reward.type === 'badge' && <Award className="w-3 h-3" />}
                    {reward.type === 'points' && <Star className="w-3 h-3" />}
                    {reward.description || reward}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/50">
            {achievement.earnedDate && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Earned Date</p>
                <p className="text-sm font-medium">{formatDate(achievement.earnedDate)}</p>
              </div>
            )}
            {achievement.createdDate && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Created Date</p>
                <p className="text-sm font-medium">{formatDate(achievement.createdDate)}</p>
              </div>
            )}
            {achievement.difficulty && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                <p className="text-sm font-medium">{achievement.difficulty}</p>
              </div>
            )}
            {achievement.rarity && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rarity</p>
                <p className="text-sm font-medium">{achievement.rarity}</p>
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};









