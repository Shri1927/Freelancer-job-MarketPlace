import { useState } from 'react';
import {
  FileText,
  Image,
  FileCode,
  File,
  Folder,
  FolderOpen,
  Download,
  Eye,
  Trash2,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const FILE_ICONS = {
  image: <Image className="h-5 w-5 text-success" />,
  document: <FileText className="h-5 w-5 text-primary" />,
  code: <FileCode className="h-5 w-5 text-warning" />,
  default: <File className="h-5 w-5 text-muted-foreground" />,
};

const getFileCategory = (type) => {
  if (type.startsWith('image/')) return 'image';
  if (type.includes('pdf') || type.includes('document') || type.includes('text')) return 'document';
  if (type.includes('javascript') || type.includes('typescript') || type.includes('json') || type.includes('html') || type.includes('css')) return 'code';
  return 'default';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const UploadedFilesList = ({ files, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [viewMode, setViewMode] = useState('list');

  // Group files by folder
  const groupedFiles = files.reduce((acc, file) => {
    const folder = file.folder || 'Uncategorized';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(file);
    return acc;
  }, {});

  const folders = Object.keys(groupedFiles);

  const toggleFolder = (folder) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || getFileCategory(file.type) === filterType;
    return matchesSearch && matchesType;
  });

  const filteredGroupedFiles = folders.reduce((acc, folder) => {
    const folderFiles = groupedFiles[folder].filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || getFileCategory(file.type) === filterType;
      return matchesSearch && matchesType;
    });
    if (folderFiles.length > 0) {
      acc[folder] = folderFiles;
    }
    return acc;
  }, {});

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Folder className="h-8 w-8 text-muted-foreground" />
        </div>
        <h4 className="text-lg font-medium text-foreground mb-1">No files uploaded</h4>
        <p className="text-sm text-muted-foreground">
          Upload files in the Files tab to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Files</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="code">Code</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <File className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{filteredFiles.length} files</span>
        </div>
        <div className="flex items-center gap-2">
          <Folder className="h-4 w-4 text-success" />
          <span className="text-sm font-medium">{Object.keys(filteredGroupedFiles).length} folders</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Total: {formatFileSize(filteredFiles.reduce((sum, f) => sum + f.size, 0))}
          </span>
        </div>
      </div>

      {/* Folder Tree View */}
      <div className="border border-border/50 rounded-lg divide-y divide-border/50">
        {Object.entries(filteredGroupedFiles).map(([folder, folderFiles]) => (
          <div key={folder}>
            {/* Folder Header */}
            <button
              onClick={() => toggleFolder(folder)}
              className="w-full flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors"
            >
              {expandedFolders.has(folder) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              {expandedFolders.has(folder) ? (
                <FolderOpen className="h-5 w-5 text-warning" />
              ) : (
                <Folder className="h-5 w-5 text-warning" />
              )}
              <span className="font-medium text-foreground flex-1 text-left">{folder}</span>
              <Badge variant="secondary" className="text-xs">
                {folderFiles.length} files
              </Badge>
            </button>

            {/* Folder Contents */}
            {expandedFolders.has(folder) && (
              <div className="bg-muted/10">
                {folderFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 px-4 py-3 pl-12 hover:bg-muted/20 transition-colors border-t border-border/30"
                  >
                    {FILE_ICONS[getFileCategory(file.type)]}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(file.uploadedAt)}
                        </span>
                        {file.version > 1 && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs py-0 h-5">
                              v{file.version}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => onDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;