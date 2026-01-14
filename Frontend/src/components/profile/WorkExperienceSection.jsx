import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Trash2, Plus, Briefcase } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from '@/components/ui/card';

const emptyExperience = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  description: ""
}

const WorkExperienceSection = ({ experiences, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState(emptyExperience)

  const handleAdd = () => {
    onAdd(formData)
    setFormData(emptyExperience)
    setIsAdding(false)
  }

  const handleEdit = exp => {
    setFormData(exp)
    setEditingId(exp.id)
  }

  const handleUpdate = () => {
    if (editingId) {
      onUpdate({
        ...formData,
        id: editingId
      })
      setFormData(emptyExperience)
      setEditingId(null)
    }
  }

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <>
        <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Work Experience</h3>
          <Button onClick={() => setIsAdding(true)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-6">
          {experiences.map(exp => (
            <div key={exp.id} className="timeline-item pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center  -ml-34 mt-0.5">
                    <Briefcase className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {exp.title}
                    </h4>
                    <p className="text-primary font-medium text-sm">
                      {exp.company}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {exp.location}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(exp.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isAdding || !!editingId}
        onOpenChange={open => {
          if (!open) {
            setIsAdding(false)
            setEditingId(null)
            setFormData(emptyExperience)
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit" : "Add"} Work Experience
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={formData.title}
                  onChange={e =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Senior Developer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={formData.company}
                  onChange={e =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="e.g., TechCorp Solutions"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={e =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={formData.startDate}
                  onChange={e =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="e.g., Mar 2021"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={formData.endDate}
                  onChange={e =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  placeholder="e.g., Present"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setEditingId(null)
                  setFormData(emptyExperience)
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? "Save Changes" : "Add Experience"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Work Experience?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              work experience entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default WorkExperienceSection
