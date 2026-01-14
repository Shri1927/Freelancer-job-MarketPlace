import { useState } from 'react';
import {
  Check,
  Circle,
  Clock,
  MoreHorizontal,
  Trash2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  formatDate,
  formatStatusLabel,
  getTaskStatusColor,
  getTaskPriorityColor,
} from '@/utils/milestoneUtils';
import { cn } from '@/lib/utils';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = task.status === 'completed';

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const handleToggleComplete = () => {
    if (isCompleted) {
      onStatusChange(task.id, 'pending');
    } else {
      onStatusChange(task.id, 'completed');
    }
  };

  return (
    <div
      className={cn(
        'group bg-card rounded-xl border transition-all duration-300',
        'hover:shadow-card-hover',
        isCompleted ? 'border-success/30 bg-success-light/20' : 'border-border/50'
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleComplete}
            className={cn(
              'mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
              isCompleted
                ? 'bg-success border-success text-success-foreground animate-check'
                : 'border-muted-foreground/30 hover:border-primary hover:bg-primary-light'
            )}
          >
            {isCompleted && <Check className="h-3.5 w-3.5" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4
                className={cn(
                  'font-medium transition-all duration-300',
                  isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                )}
              >
                {task.title}
              </h4>
              <Badge variant={getTaskPriorityColor(task.priority)} className="text-xs">
                {task.priority}
              </Badge>
              <Badge variant={getTaskStatusColor(task.status)} className="text-xs">
                {getStatusIcon()}
                <span className="ml-1">{formatStatusLabel(task.status)}</span>
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>Due: {formatDate(task.dueDate)}</span>
              {task.completedAt && (
                <span className="text-success">Completed: {formatDate(task.completedAt)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border z-50">
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'pending')}>
                  <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                  Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in_progress')}>
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  Mark as In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'completed')}>
                  <Check className="h-4 w-4 mr-2 text-success" />
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && task.description && (
          <div className="mt-3 pt-3 border-t border-border/50 animate-fade-in">
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;