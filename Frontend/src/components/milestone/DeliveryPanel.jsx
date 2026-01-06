import { useState } from 'react';
import {
  Package,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileCheck,
  RotateCcw,
  FolderOpen,
  ListChecks,
  Link2,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileUpload from './FileUpload';
import ExternalLinks from './ExternalLinks';
import DeliveryNotes from './DeliveryNotes';
import UploadedFilesList from './UploadedFilesList';
import WorkPhaseTracker from './WorkPhaseTracker';
import { formatDate } from '@/utils/milestoneUtils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const STATUS_CONFIG = {
  draft: { label: 'Draft', icon: <Clock className="h-4 w-4" />, color: 'bg-muted text-muted-foreground' },
  submitted: { label: 'Submitted', icon: <Send className="h-4 w-4" />, color: 'bg-primaryblue text-primaryblue-foreground' },
  revision_requested: { label: 'Revision Requested', icon: <RotateCcw className="h-4 w-4" />, color: 'bg-warning text-warning-foreground' },
  approved: { label: 'Approved', icon: <CheckCircle2 className="h-4 w-4" />, color: 'bg-success text-success-foreground' },
};

const DeliveryPanel = ({ 
  milestone, 
  workPhases, 
  allFiles = [],
  onDeliveryUpdate,
  onPhaseStatusUpdate,
  onDeliverableToggle,
}) => {
  const existingDelivery = milestone.delivery;
  
  const [delivery, setDelivery] = useState({
    files: existingDelivery?.files || [],
    links: existingDelivery?.links || [],
    notes: existingDelivery?.notes || '',
    status: existingDelivery?.status || 'draft',
  });

  const [activeDeliveryTab, setActiveDeliveryTab] = useState('progress');

  const handleFilesChange = (files) => {
    setDelivery(prev => ({ ...prev, files }));
  };

  const handleLinksChange = (links) => {
    setDelivery(prev => ({ ...prev, links }));
  };

  const handleNotesChange = (notes) => {
    setDelivery(prev => ({ ...prev, notes }));
  };

  const handleDeleteFile = (fileId) => {
    setDelivery(prev => ({
      ...prev,
      files: prev.files?.filter(f => f.id !== fileId) || [],
    }));
    toast.success('File removed');
  };

  const handleViewFile = (fileId) => {
    // Switch to files tab and highlight the file
    setActiveDeliveryTab('uploaded');
    toast.info('Viewing file in uploaded files tab');
  };

  const handleSaveDraft = () => {
    const updatedDelivery = {
      id: existingDelivery?.id || `del-${Date.now()}`,
      milestoneId: milestone.id,
      status: 'draft',
      files: delivery.files || [],
      links: delivery.links || [],
      notes: delivery.notes || '',
      createdAt: existingDelivery?.createdAt || new Date().toISOString(),
    };
    
    onDeliveryUpdate(milestone.id, updatedDelivery);
    toast.success('Draft saved successfully');
  };

  const handleSubmit = () => {
    if (!delivery.notes?.trim()) {
      toast.error('Please add delivery notes before submitting');
      return;
    }

    if ((delivery.files?.length || 0) === 0 && (delivery.links?.length || 0) === 0) {
      toast.error('Please add at least one file or link');
      return;
    }

    const updatedDelivery = {
      id: existingDelivery?.id || `del-${Date.now()}`,
      milestoneId: milestone.id,
      status: 'submitted',
      files: delivery.files || [],
      links: delivery.links || [],
      notes: delivery.notes || '',
      submittedAt: new Date().toISOString(),
      createdAt: existingDelivery?.createdAt || new Date().toISOString(),
    };
    
    onDeliveryUpdate(milestone.id, updatedDelivery);
    toast.success('Delivery submitted successfully!');
  };

  const status = delivery.status || 'draft';
  const statusConfig = STATUS_CONFIG[status];
  const isReadOnly = status === 'submitted' || status === 'approved';

  // Calculate submission stats
  const totalFiles = delivery.files?.length || 0;
  const totalLinks = delivery.links?.length || 0;
  const hasNotes = !!delivery.notes?.trim();
  const completedPhases = workPhases.filter(p => p.status === 'completed').length;
  const totalPhases = workPhases.length;

  // Calculate deliverables progress
  const totalDeliverables = workPhases.reduce((acc, p) => acc + p.deliverables.length, 0);
  const completedDeliverables = workPhases.reduce(
    (acc, p) => acc + p.deliverables.filter(d => d.completed).length, 
    0
  );

  // Combine all files for the phase tracker
  const combinedFiles = [...(delivery.files || []), ...allFiles.filter(f => 
    !delivery.files?.some(df => df.id === f.id)
  )];

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-primaryblue" />
            Delivery & Submission
          </CardTitle>
          <Badge className={cn('gap-1.5', statusConfig.color)}>
            {statusConfig.icon}
            {statusConfig.label}
          </Badge>
        </div>
        
        {existingDelivery?.submittedAt && (
          <p className="text-sm text-muted-foreground">
            Submitted on {formatDate(existingDelivery.submittedAt)}
          </p>
        )}
        
        {existingDelivery?.revisionNotes && status === 'revision_requested' && (
          <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-sm font-medium text-warning flex items-center gap-1.5 mb-1">
              <AlertCircle className="h-4 w-4" />
              Revision Requested
            </p>
            <p className="text-sm text-foreground">{existingDelivery.revisionNotes}</p>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setActiveDeliveryTab('uploaded')}
            className="p-3 bg-primaryblue/5 rounded-lg border border-primaryblue/20 hover:bg-primaryblue/10 transition-colors text-left"
          >
            <div className="flex items-center gap-2 text-primaryblue mb-1">
              <FileCheck className="h-4 w-4" />
              <span className="text-xs font-medium">Files</span>
            </div>
            <p className="text-xl font-bold text-foreground">{totalFiles}</p>
          </button>
          <button 
            onClick={() => setActiveDeliveryTab('links')}
            className="p-3 bg-success/5 rounded-lg border border-success/20 hover:bg-success/10 transition-colors text-left"
          >
            <div className="flex items-center gap-2 text-success mb-1">
              <Link2 className="h-4 w-4" />
              <span className="text-xs font-medium">Links</span>
            </div>
            <p className="text-xl font-bold text-foreground">{totalLinks}</p>
          </button>
          <button 
            onClick={() => setActiveDeliveryTab('progress')}
            className="p-3 bg-warning/5 rounded-lg border border-warning/20 hover:bg-warning/10 transition-colors text-left"
          >
            <div className="flex items-center gap-2 text-warning mb-1">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs font-medium">Deliverables</span>
            </div>
            <p className="text-xl font-bold text-foreground">{completedDeliverables}/{totalDeliverables}</p>
          </button>
          <button 
            onClick={() => setActiveDeliveryTab('notes')}
            className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors text-left"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">Notes</span>
            </div>
            <p className="text-xl font-bold text-foreground">{hasNotes ? '✓' : '—'}</p>
          </button>
        </div>

        <Tabs value={activeDeliveryTab} onValueChange={setActiveDeliveryTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="progress" className="gap-1.5 text-xs">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="uploaded" className="gap-1.5 text-xs">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Files</span>
              {totalFiles > 0 && (
                <span className="ml-1 text-xs bg-primaryblue/20 px-1.5 py-0.5 rounded">
                  {totalFiles}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-1.5 text-xs">
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-1.5 text-xs">
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">Links</span>
              {totalLinks > 0 && (
                <span className="ml-1 text-xs bg-primaryblue/20 px-1.5 py-0.5 rounded">
                  {totalLinks}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="mt-4">
            <WorkPhaseTracker 
              phases={workPhases} 
              files={combinedFiles}
              onPhaseUpdate={onPhaseStatusUpdate}
              onDeliverableToggle={onDeliverableToggle}
              onViewFile={handleViewFile}
            />
          </TabsContent>

          <TabsContent value="uploaded" className="mt-4">
            <UploadedFilesList 
              files={delivery.files || []} 
              onDelete={!isReadOnly ? handleDeleteFile : undefined}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4">
            <FileUpload
              files={delivery.files || []}
              onFilesChange={handleFilesChange}
            />
          </TabsContent>
          
          <TabsContent value="links" className="mt-4">
            <ExternalLinks
              links={delivery.links || []}
              onLinksChange={handleLinksChange}
            />
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <DeliveryNotes
              value={delivery.notes || ''}
              onChange={handleNotesChange}
              required
            />
          </TabsContent>
        </Tabs>

        {/* Submission Requirements */}
        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-3">Submission Checklist</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center',
                totalFiles > 0 || totalLinks > 0
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <span className={cn(
                totalFiles > 0 || totalLinks > 0
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}>
                Add at least one file or link
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center',
                hasNotes
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <span className={cn(
                hasNotes
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}>
                Add delivery notes (required)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center',
                completedDeliverables === totalDeliverables
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <span className={cn(
                completedDeliverables === totalDeliverables
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}>
                Complete all deliverables ({completedDeliverables}/{totalDeliverables} done)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                'w-5 h-5 rounded-full flex items-center justify-center',
                completedPhases === totalPhases
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              )}>
                <CheckCircle2 className="h-3 w-3" />
              </div>
              <span className={cn(
                completedPhases === totalPhases
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}>
                Complete all work phases ({completedPhases}/{totalPhases} done)
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isReadOnly && (
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={handleSubmit} className="gap-2">
              <Send className="h-4 w-4" />
              Submit Delivery
            </Button>
          </div>
        )}

        {status === 'approved' && (
          <div className="flex items-center justify-center gap-2 p-4 bg-success/10 rounded-lg border border-success/20">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-success font-medium">Delivery approved by client</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryPanel;