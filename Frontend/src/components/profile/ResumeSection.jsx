import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Pencil, Download, FileText, Upload, X, File } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card';

const ResumeSection = ({ resume, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewName, setPreviewName] = useState(resume?.fileName || "")
  const fileInputRef = useRef(null)

  const handleFileSelect = e => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewName(file.name)
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (
      file &&
      (file.type === "application/pdf" || file.name.endsWith(".pdf"))
    ) {
      setSelectedFile(file)
      setPreviewName(file.name)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleSave = () => {
    if (selectedFile) {
      // Create a URL for the file (in a real app, you'd upload to storage)
      const fileUrl = URL.createObjectURL(selectedFile)
      onUpdate({
        fileName: selectedFile.name,
        fileUrl: fileUrl,
        uploadedAt: new Date().toISOString()
      })
    }
    handleClose()
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewName(resume?.fileName || "")
    setIsEditing(false)
  }

  const handleDownload = () => {
    if (resume?.fileUrl) {
      const link = document.createElement("a")
      link.href = resume.fileUrl
      link.download = resume.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    setPreviewName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <>
        <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Resume</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        {resume ? (
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{resume.fileName}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded resume document
                </p>
              </div>
            </div>
            <Button onClick={handleDownload} size="sm" className="gap-1">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-border rounded-lg">
            <div className="text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No resume uploaded</p>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Upload Resume
              </Button>
            </div>
          </div>
        )}
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Drop zone or selected file preview */}
            {selectedFile ? (
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <File className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearSelectedFile}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported format: PDF (Max 10MB)
                </p>
              </div>
            )}

            {/* Alternative upload button */}
            {!selectedFile && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Browse Files
                </Button>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!selectedFile}>
                Upload Resume
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ResumeSection
