import { useState } from 'react';
import { Edit, Trash2, ExternalLink, Image as ImageIcon, Star, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const PortfolioProjectCard = ({
  project,
  viewMode = 'grid',
  onEdit,
  onDelete,
  onView,
  isFeatured = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Image */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {!imageError && project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    {isFeatured && (
                      <Badge variant="default" className="text-xs gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                      <span className="sr-only">Options</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(project)} className="cursor-pointer">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    {project.link && (
                      <DropdownMenuItem
                        onClick={() => window.open(project.link, '_blank')}
                        className="cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Project
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onEdit?.(project)} className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(project)}
                      className="cursor-pointer text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Skills */}
              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.skills.slice(0, 5).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {project.skills.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Stats */}
              {(project.views !== undefined || project.clientName) && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {project.views !== undefined && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {project.views} views
                    </div>
                  )}
                  {project.clientName && (
                    <span>Client: {project.clientName}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
      <div className="relative">
        {/* Image */}
        <div className="aspect-video bg-muted overflow-hidden">
          {!imageError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(project);
            }}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          {project.link && (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Visit
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="sr-only">Options</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(project)} className="cursor-pointer">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {project.link && (
                <DropdownMenuItem
                  onClick={() => window.open(project.link, '_blank')}
                  className="cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Project
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onEdit?.(project)} className="cursor-pointer">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(project)}
                className="cursor-pointer text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.slice(0, 4).map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.skills.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Stats */}
        {(project.views !== undefined || project.clientName) && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
            {project.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {project.views} views
              </div>
            )}
            {project.clientName && (
              <span className="truncate">{project.clientName}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};









