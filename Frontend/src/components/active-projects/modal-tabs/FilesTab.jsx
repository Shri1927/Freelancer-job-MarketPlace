import { useState } from "react"
import {
  Upload,
  FileText,
  Image,
  FileArchive,
  Download,
  Share2,
  Trash2,
  Eye,
  FolderOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const fileCategories = [
  { id: "all", label: "All Files" },
  { id: "client-brief", label: "Client Brief" },
  { id: "reference", label: "References" },
  { id: "deliverable", label: "Deliverables" },
  { id: "feedback", label: "Feedback" }
]

export function FilesTab({ project }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDragging, setIsDragging] = useState(false)

  const filteredFiles =
    selectedCategory === "all"
      ? project.files
      : project.files.filter(f => f.type === selectedCategory)

  const getFileIcon = name => {
    const ext = name
      .split(".")
      .pop()
      ?.toLowerCase()
    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext || "")) {
      return <Image className="w-8 h-8 text-success" />
    }
    if (["zip", "rar", "7z", "tar"].includes(ext || "")) {
      return <FileArchive className="w-8 h-8 text-warning" />
    }
    return <FileText className="w-8 h-8 text-[#2A6BFF]" />
  }

  const getTypeBadge = type => {
    switch (type) {
      case "client-brief":
        return <Badge variant="info">Brief</Badge>
      case "reference":
        return <Badge variant="secondary">Reference</Badge>
      case "deliverable":
        return <Badge variant="success">Deliverable</Badge>
      case "feedback":
        return <Badge variant="warning">Feedback</Badge>
    }
  }

  return (
    <div className="p-6">
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all mb-6",
          isDragging
            ? "border-[#2A6BFF] bg-[#2A6BFF]/5"
            : "border-gray-200 hover:border-[#2A6BFF]/50"
        )}
        onDragOver={e => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => {
          e.preventDefault()
          setIsDragging(false)
        }}
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2A6BFF]/10 flex items-center justify-center">
          <Upload className="w-6 h-6 text-[#2A6BFF]" />
        </div>
        <p className="font-medium mb-1">Drag and drop files here</p>
        <p className="text-sm text-gray-600 mb-4">or click to browse</p>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-thin pb-2">
        {fileCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0",
              selectedCategory === category.id
                ? "bg-[#2A6BFF] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-100/80"
            )}
          >
            {category.label}
            {category.id !== "all" && (
              <span className="ml-2 text-xs opacity-70">
                ({project.files.filter(f => f.type === category.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Files List */}
      {filteredFiles.length > 0 ? (
  <div className="space-y-3">
    {filteredFiles.map((file, index) => (
      <div 
        key={file.id}
        className="file-item animate-fade-in flex border border-gray-200 rounded-lg p-4 items-center gap-4 hover:bg-gray-50 transition-all"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="p-2 rounded-lg bg-muted/50">
          {getFileIcon(file.name)}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            <span>{file.size}</span>
            <span>•</span>
            <span>{new Date(file.date).toLocaleDateString()}</span>
            {getTypeBadge(file.type)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="iconSm" title="Preview">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="iconSm" title="Download">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="iconSm" title="Share">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="iconSm" className="text-danger hover:text-danger" title="Delete">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
    <p className="text-muted-foreground">No files in this category</p>
    <p className="text-sm text-muted-foreground/70">Upload files or select a different category</p>
  </div>
)}

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{project.files.length} total files</span>
          <span>
            Total size:{" "}
            {project.files
              .reduce((acc, f) => {
                const size = parseFloat(f.size)
                return acc + (f.size.includes("MB") ? size : size / 1024)
              }, 0)
              .toFixed(1)}{" "}
            MB
          </span>
        </div>
      </div>
    </div>
  )
}
