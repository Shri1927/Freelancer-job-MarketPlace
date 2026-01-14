import { useState } from 'react';
import { Link2, Plus, X, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const LINK_TYPES = [
  { value: 'google_drive', label: 'Google Drive', color: 'bg-yellow-500' },
  { value: 'dropbox', label: 'Dropbox', color: 'bg-blue-500' },
  { value: 'figma', label: 'Figma', color: 'bg-purple-500' },
  { value: 'github', label: 'GitHub', color: 'bg-gray-700' },
  { value: 'other', label: 'Other', color: 'bg-muted-foreground' },
];

const getLinkTypeInfo = (type) => {
  return LINK_TYPES.find(t => t.value === type) || LINK_TYPES[4];
};

const ExternalLinks = ({ links, onLinksChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    type: 'other',
  });

  const handleAdd = () => {
    if (!newLink.title || !newLink.url) return;

    const link = {
      id: `link-${Date.now()}`,
      title: newLink.title,
      url: newLink.url,
      type: newLink.type || 'other',
    };

    onLinksChange([...links, link]);
    setNewLink({ title: '', url: '', type: 'other' });
    setIsAdding(false);
  };

  const removeLink = (linkId) => {
    onLinksChange(links.filter(l => l.id !== linkId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">External Links</Label>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="gap-1.5 text-primary"
          >
            <Plus className="h-4 w-4" />
            Add Link
          </Button>
        )}
      </div>

      {/* Add Link Form */}
      {isAdding && (
        <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Link Title</Label>
              <Input
                placeholder="e.g., Design Files"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <Select
                value={newLink.type}
                onValueChange={(value) => setNewLink({ ...newLink, type: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LINK_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span className={cn('w-2 h-2 rounded-full', type.color)} />
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground">URL</Label>
            <Input
              placeholder="https://..."
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div className="flex items-center gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!newLink.title || !newLink.url}
            >
              Add Link
            </Button>
          </div>
        </div>
      )}

      {/* Links List */}
      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link) => {
            const typeInfo = getLinkTypeInfo(link.type);
            
            return (
              <div
                key={link.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 group hover:bg-muted/50 transition-colors"
              >
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', typeInfo.color)}>
                  <Link2 className="h-4 w-4 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {link.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>
                
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-background rounded-lg transition-colors"
                >
                  <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                </a>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeLink(link.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {links.length === 0 && !isAdding && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No external links added yet
        </p>
      )}
    </div>
  );
};

export default ExternalLinks;