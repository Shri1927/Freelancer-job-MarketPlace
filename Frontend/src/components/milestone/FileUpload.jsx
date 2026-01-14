import { useState, useRef } from 'react';
import { Upload, File, X, Image, FileText, Archive, Video, Music, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const FILE_ICONS = {
  image: <Image className="h-5 w-5 text-primary" />,
  document: <FileText className="h-5 w-5 text-success" />,
  archive: <Archive className="h-5 w-5 text-warning" />,
  video: <Video className="h-5 w-5 text-destructive" />,
  audio: <Music className="h-5 w-5 text-purple-500" />,
  default: <File className="h-5 w-5 text-muted-foreground" />,
};

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return FILE_ICONS.image;
  if (type.includes('pdf') || type.includes('document') || type.includes('text')) return FILE_ICONS.document;
  if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return FILE_ICONS.archive;
  if (type.startsWith('video/')) return FILE_ICONS.video;
  if (type.startsWith('audio/')) return FILE_ICONS.audio;
  return FILE_ICONS.default;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileUpload = ({
  files,
  onFilesChange,
  maxSizeMB = 50,
  acceptedFormats = ['image/*', 'application/pdf', '.doc', '.docx', '.zip', '.fig', '.sketch', '.psd', '.ai'],
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSizeMB}MB limit`;
    }
    return null;
  };

  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          const existingVersions = files.filter(f => f.name === file.name);
          const version = existingVersions.length + 1;
          
          resolve({
            id: fileId,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
            version,
            uploadedAt: new Date().toISOString(),
          });
        }
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
      }, 100);
    });
  };

  const handleFiles = async (fileList) => {
    setError(null);
    const newFiles = [];
    
    for (const file of Array.from(fileList)) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }
      
      const uploadedFile = await simulateUpload(file);
      newFiles.push(uploadedFile);
    }
    
    onFilesChange([...files, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    onFilesChange(files.filter(f => f.id !== fileId));
  };

  const isUploading = Object.values(uploadProgress).some(p => p < 100);

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
          isUploading && 'pointer-events-none opacity-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="h-6 w-6 text-[#2A6BFF]" />
        </div>
        
        <h4 className="font-semibold text-foreground mb-1">
          Drag & drop files here
        </h4>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse from your computer
        </p>
        
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          Select Files
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Max file size: {maxSizeMB}MB • Supported: Images, PDFs, Documents, Archives, Design files
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Uploaded Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file) => {
              const progress = uploadProgress[file.id];
              const isCurrentlyUploading = progress !== undefined && progress < 100;
              
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50 group"
                >
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      {file.version > 1 && (
                        <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          v{file.version}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    
                    {isCurrentlyUploading && (
                      <Progress value={progress} className="h-1 mt-2" />
                    )}
                  </div>
                  
                  {!isCurrentlyUploading && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;