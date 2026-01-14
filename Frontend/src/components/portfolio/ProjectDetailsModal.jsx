import { ExternalLink, Eye, Star, Calendar, User, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon } from 'lucide-react';

export const ProjectDetailsModal = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

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
      <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            {project.category}
            {project.clientName && ` • ${project.clientName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Featured Badge */}
          {project.featured && (
            <div className="flex items-center gap-2">
              <Badge variant="default" className="gap-1">
                <Star className="w-3 h-3 fill-current" />
                Featured Project
              </Badge>
            </div>
          )}

          {/* Image */}
          {project.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Description</h3>
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          {/* Skills */}
          {project.skills && project.skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/50">
            {project.clientName && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="text-sm font-medium">{project.clientName}</p>
                </div>
              </div>
            )}
            {project.createdAt && (
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date Created</p>
                  <p className="text-sm font-medium">{formatDate(project.createdAt)}</p>
                </div>
              </div>
            )}
            {project.views !== undefined && (
              <div className="flex items-center gap-3">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="text-sm font-medium">{project.views}</p>
                </div>
              </div>
            )}
            {project.category && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            )}
          </div>

          {/* Actions */}
          {project.link && (
            <div className="flex gap-3 pt-4 border-t">
              <Button
                onClick={() => window.open(project.link, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Project
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}

          {!project.link && (
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};









