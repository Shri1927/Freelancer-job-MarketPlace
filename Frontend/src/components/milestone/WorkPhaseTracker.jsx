import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Package,
  ArrowRight,
  FileIcon,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/utils/milestoneUtils';
import { toast } from 'sonner';

const PHASE_STATUS_CONFIG = {
  not_started: { 
    label: 'Not Started', 
    icon: <Circle className="h-4 w-4" />, 
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/50'
  },
  in_progress: { 
    label: 'In Progress', 
    icon: <Clock className="h-4 w-4" />, 
    color: 'text-primaryblue',
    bgColor: 'bg-primaryblue/10'
  },
  completed: { 
    label: 'Completed', 
    icon: <CheckCircle2 className="h-4 w-4" />, 
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  blocked: { 
    label: 'Blocked', 
    icon: <AlertTriangle className="h-4 w-4" />, 
    color: 'text-destructive',
    bgColor: 'bg-destructive/10'
  },
};

const WorkPhaseTracker = ({ 
  phases, 
  files = [], 
  onPhaseUpdate, 
  onDeliverableToggle,
  onViewFile 
}) => {
  const [expandedPhases, setExpandedPhases] = useState(new Set());

  const completedCount = phases.filter(p => p.status === 'completed').length;
  const inProgressCount = phases.filter(p => p.status === 'in_progress').length;
  const notStartedCount = phases.filter(p => p.status === 'not_started').length;
  const blockedCount = phases.filter(p => p.status === 'blocked').length;
  const progressPercent = phases.length > 0 ? Math.round((completedCount / phases.length) * 100) : 0;

  // Calculate total deliverables progress
  const totalDeliverables = phases.reduce((acc, p) => acc + p.deliverables.length, 0);
  const completedDeliverables = phases.reduce(
    (acc, p) => acc + p.deliverables.filter(d => d.completed).length, 
    0
  );
  const deliverablePercent = totalDeliverables > 0 
    ? Math.round((completedDeliverables / totalDeliverables) * 100) 
    : 0;

  const togglePhase = (phaseId) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  const handleDeliverableToggle = (phaseId, deliverable) => {
    if (onDeliverableToggle) {
      onDeliverableToggle(phaseId, deliverable.id, !deliverable.completed);
      toast.success(
        deliverable.completed 
          ? `"${deliverable.name}" marked as pending` 
          : `"${deliverable.name}" marked as completed`
      );
    }
  };

  const getFilesForDeliverable = (deliverable) => {
    if (!deliverable.fileIds || deliverable.fileIds.length === 0) return [];
    return files.filter(f => deliverable.fileIds?.includes(f.id));
  };

  const sortedPhases = [...phases].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="p-4 bg-gradient-to-r from-primaryblue/5 to-success/5 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground">Development Progress</h4>
          <span className="text-2xl font-bold text-primaryblue">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} variant="success" className="h-3 mb-2" />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{completedCount} of {phases.length} phases completed</span>
          <span>{completedDeliverables} of {totalDeliverables} deliverables done</span>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center p-2 bg-success/10 rounded-lg">
            <div className="text-xl font-bold text-success">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-2 bg-primaryblue/10 rounded-lg">
            <div className="text-xl font-bold text-primaryblue">{inProgressCount}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded-lg">
            <div className="text-xl font-bold text-muted-foreground">{notStartedCount}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-2 bg-destructive/10 rounded-lg">
            <div className="text-xl font-bold text-destructive">{blockedCount}</div>
            <div className="text-xs text-muted-foreground">Blocked</div>
          </div>
        </div>
      </div>

      {/* Deliverables Progress Bar */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Deliverables Progress</span>
          <span className="text-sm font-bold text-primaryblue">{deliverablePercent}%</span>
        </div>
        <Progress value={deliverablePercent} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {completedDeliverables} completed • {totalDeliverables - completedDeliverables} remaining
        </p>
      </div>

      {/* Timeline View */}
      <div className="relative">
        {sortedPhases.map((phase, index) => {
          const config = PHASE_STATUS_CONFIG[phase.status];
          const isExpanded = expandedPhases.has(phase.id);
          const isLast = index === sortedPhases.length - 1;
          const phaseCompletedDeliverables = phase.deliverables.filter(d => d.completed).length;
          const phaseProgress = phase.deliverables.length > 0 
            ? Math.round((phaseCompletedDeliverables / phase.deliverables.length) * 100)
            : 0;

          return (
            <div key={phase.id} className="relative">
              {/* Connector Line */}
              {!isLast && (
                <div 
                  className={cn(
                    "absolute left-5 top-12 w-0.5 h-full -translate-x-1/2",
                    phase.status === 'completed' ? 'bg-success' : 'bg-border'
                  )}
                />
              )}

              <div className="relative flex gap-4 pb-6">
                {/* Status Indicator */}
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-background z-10",
                    config.bgColor,
                    config.color
                  )}
                >
                  {config.icon}
                </div>

                {/* Phase Card */}
                <div 
                  className={cn(
                    "flex-1 border rounded-lg overflow-hidden transition-all",
                    config.bgColor,
                    "border-border/50"
                  )}
                >
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="w-full p-4 text-left hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                          Phase {phase.order}
                        </span>
                        <h5 className="font-semibold text-foreground">{phase.name}</h5>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={cn('gap-1', config.bgColor, config.color, 'border-0')}>
                          {config.icon}
                          {config.label}
                        </Badge>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                    
                    {/* Phase mini progress */}
                    <div className="flex items-center gap-2 mt-3">
                      <Progress value={phaseProgress} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {phaseCompletedDeliverables}/{phase.deliverables.length}
                      </span>
                    </div>
                  </button>

                  {isExpanded && phase.deliverables.length > 0 && (
                    <div className="px-4 pb-4 pt-0 border-t border-border/30">
                      <h6 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-3">
                        Deliverables Checklist
                      </h6>
                      <div className="space-y-3">
                        {phase.deliverables.map((deliverable) => {
                          const deliverableFiles = getFilesForDeliverable(deliverable);
                          
                          return (
                            <div 
                              key={deliverable.id}
                              className={cn(
                                "p-3 rounded-lg border transition-all",
                                deliverable.completed 
                                  ? "bg-success/5 border-success/20" 
                                  : "bg-muted/20 border-border/50"
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <Checkbox
                                  checked={deliverable.completed}
                                  onCheckedChange={() => handleDeliverableToggle(phase.id, deliverable)}
                                  className="mt-0.5"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className={cn(
                                    "text-sm font-medium",
                                    deliverable.completed 
                                      ? 'text-muted-foreground line-through' 
                                      : 'text-foreground'
                                  )}>
                                    {deliverable.name}
                                  </span>
                                  
                                  {/* Show linked files */}
                                  {deliverableFiles.length > 0 && (
                                    <div className="mt-2 space-y-1.5">
                                      <span className="text-xs text-muted-foreground">
                                        Uploaded files ({deliverableFiles.length}):
                                      </span>
                                      {deliverableFiles.map(file => (
                                        <div 
                                          key={file.id}
                                          className="flex items-center gap-2 p-2 bg-background/50 rounded border border-border/30"
                                        >
                                          <FileIcon className="h-3.5 w-3.5 text-primaryblue flex-shrink-0" />
                                          <span className="text-xs text-foreground truncate flex-1">
                                            {file.name}
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)}
                                          </span>
                                          {onViewFile && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                onViewFile(file.id);
                                              }}
                                            >
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Show no files message for completed without files */}
                                  {deliverable.completed && deliverableFiles.length === 0 && (
                                    <p className="text-xs text-muted-foreground mt-1 italic">
                                      No files attached to this deliverable
                                    </p>
                                  )}
                                </div>
                                
                                {deliverable.completed ? (
                                  <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Phase Status Change */}
                      {onPhaseUpdate && phase.status !== 'completed' && (
                        <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {phaseCompletedDeliverables === phase.deliverables.length 
                              ? "All deliverables completed!" 
                              : `Complete ${phase.deliverables.length - phaseCompletedDeliverables} more to finish`}
                          </span>
                          {phaseCompletedDeliverables === phase.deliverables.length && (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => onPhaseUpdate(phase.id, 'completed')}
                              className="gap-1.5"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Mark Phase Complete
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* What's Next */}
      {inProgressCount > 0 && (
        <div className="p-4 bg-primaryblue/5 rounded-lg border border-primaryblue/20">
          <h5 className="font-medium text-foreground flex items-center gap-2 mb-2">
            <ArrowRight className="h-4 w-4 text-primaryblue" />
            Currently Working On
          </h5>
          <div className="space-y-2">
            {sortedPhases
              .filter(p => p.status === 'in_progress')
              .map(phase => {
                const remaining = phase.deliverables.filter(d => !d.completed).length;
                return (
                  <div key={phase.id} className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primaryblue" />
                    <span className="font-medium">{phase.name}</span>
                    <span className="text-muted-foreground">
                      - {remaining} deliverable{remaining !== 1 ? 's' : ''} remaining
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkPhaseTracker;