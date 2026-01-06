import { CheckCircle2, Circle, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  formatCurrency,
  formatDate,
  formatStatusLabel,
  getMilestoneStatusColor,
  calculateMilestoneProgress,
} from '@/utils/milestoneUtils';
import { cn } from '@/lib/utils';

const MilestoneCard = ({ milestone, isSelected, onSelect, currency }) => {
  const progress = calculateMilestoneProgress(milestone.tasks);
  const isPaid = milestone.status === 'paid';
  const isCompleted = milestone.status === 'completed';
  const isActive = milestone.status === 'active';

  const getStatusIcon = () => {
    if (isPaid) return <DollarSign className="h-4 w-4" />;
    if (isCompleted) return <CheckCircle2 className="h-4 w-4" />;
    if (isActive) return <Clock className="h-4 w-4" />;
    return <Circle className="h-4 w-4" />;
  };

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left p-4 rounded-xl border transition-all duration-300',
        'hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-primaryblue/20',
        isSelected
          ? 'bg-card border-primaryblue shadow-glow'
          : 'bg-card/50 border-border/50 hover:bg-card hover:border-border'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={getMilestoneStatusColor(milestone.status)}>
              {getStatusIcon()}
              <span className="ml-1">{formatStatusLabel(milestone.status)}</span>
            </Badge>
          </div>
          <h3 className="font-display font-semibold text-foreground line-clamp-1">
            {milestone.title}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-bold text-foreground">
            {formatCurrency(milestone.amount, currency)}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {milestone.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {milestone.tasks.filter((t) => t.status === 'completed').length}/{milestone.tasks.length} tasks
          </span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <Progress
          value={progress}
          variant={isPaid || isCompleted ? 'success' : 'default'}
          className="h-1.5"
        />
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          Due: <span className="font-medium text-foreground">{formatDate(milestone.dueDate)}</span>
        </p>
      </div>
    </button>
  );
};

export default MilestoneCard;