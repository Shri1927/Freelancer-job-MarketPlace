import { useState, useMemo } from 'react';
import { Plus, Filter, SortAsc, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TaskItem from './TaskItem';
import AddTaskDialog from './AddTaskDialog';
import {
  formatCurrency,
  formatDate,
  formatStatusLabel,
  getMilestoneStatusColor,
  calculateMilestoneProgress,
} from '@/utils/milestoneUtils';
import { cn } from '@/lib/utils';

const TaskPanel = ({
  milestone,
  currency,
  onTaskStatusChange,
  onAddTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAndSortedTasks = useMemo(() => {
    if (!milestone) return [];

    let tasks = [...milestone.tasks];

    // Filter
    if (filter !== 'all') {
      tasks = tasks.filter((task) => task.status === filter);
    }

    // Sort
    if (sort === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === 'dueDate') {
      tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }

    return tasks;
  }, [milestone, filter, sort]);

  if (!milestone) {
    return (
      <div className="flex items-center justify-center h-full bg-card/30 rounded-2xl border border-border/30 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            Select a Milestone
          </h3>
          <p className="text-muted-foreground text-sm">
            Choose a milestone from the list to view and manage its tasks
          </p>
        </div>
      </div>
    );
  }

  const progress = calculateMilestoneProgress(milestone.tasks);
  const completedCount = milestone.tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = milestone.tasks.filter((t) => t.status === 'in_progress').length;
  const pendingCount = milestone.tasks.filter((t) => t.status === 'pending').length;

  const filterOptions = [
    { value: 'all', label: 'All Tasks', icon: null, count: milestone.tasks.length },
    { value: 'pending', label: 'Pending', icon: <Circle className="h-4 w-4" />, count: pendingCount },
    { value: 'in_progress', label: 'In Progress', icon: <Clock className="h-4 w-4" />, count: inProgressCount },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 className="h-4 w-4" />, count: completedCount },
  ];

  return (
    <div className="bg-card/30 rounded-2xl border border-border/30 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge variant={getMilestoneStatusColor(milestone.status)} className="mb-2">
              {formatStatusLabel(milestone.status)}
            </Badge>
            <h2 className="font-display font-bold text-2xl text-foreground">
              {milestone.title}
            </h2>
            <p className="text-muted-foreground mt-1">{milestone.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(milestone.amount, currency)}
            </p>
            <p className="text-sm text-muted-foreground">Due: {formatDate(milestone.dueDate)}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>
          <Progress
            value={progress}
            variant={milestone.status === 'paid' || milestone.status === 'completed' ? 'success' : 'default'}
            className="h-2"
          />
        </div>

        {/* Task Summary */}
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-success" />
            {completedCount} completed
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-[#2A6BFF]" />
            {inProgressCount} in progress
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            {pendingCount} pending
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-border/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                {filter === 'all' ? 'All Tasks' : formatStatusLabel(filter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-popover border-border z-50">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={cn(filter === option.value && 'bg-secondary')}
                >
                  <span className="flex items-center gap-2 flex-1">
                    {option.icon}
                    {option.label}
                  </span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {option.count}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40 bg-popover border-border z-50">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSort('default')}>Default</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort('priority')}>Priority</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort('dueDate')}>Due Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 bg-[#2A6BFF]">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-auto p-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No tasks yet' : `No ${formatStatusLabel(filter).toLowerCase()} tasks`}
            </p>
            {filter === 'all' && (
              <Button
                variant="link"
                onClick={() => setIsAddDialogOpen(true)}
                className="mt-2"
              >
                Add your first task
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskItem
                  task={task}
                  onStatusChange={(taskId, status) =>
                    onTaskStatusChange(milestone.id, taskId, status)
                  }
                  onDelete={(taskId) => onDeleteTask(milestone.id, taskId)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={(task) => onAddTask(milestone.id, task)}
      />
    </div>
  );
};

export default TaskPanel;