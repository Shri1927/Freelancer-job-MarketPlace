import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Trash2, Plus, GraduationCap } from "lucide-react"
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

const emptyEducation = {
  degree: "",
  institution: "",
  field: "",
  startDate: "",
  endDate: "",
  description: ""
}

const EducationSection = ({ educations, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState(emptyEducation)

  const handleAdd = () => {
    onAdd(formData)
    setFormData(emptyEducation)
    setIsAdding(false)
  }

  const handleEdit = edu => {
    setFormData(edu)
    setEditingId(edu.id)
  }

  const handleUpdate = () => {
    if (editingId) {
      onUpdate({
        ...formData,
        id: editingId
      })
      setFormData(emptyEducation)
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
          <h3 className="text-xl font-bold">Education</h3>
          <Button onClick={() => setIsAdding(true)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-6">
          {educations.map(edu => (
            <div key={edu.id} className="timeline-item-green pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center -ml-34 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-success-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {edu.degree}
                    </h4>
                    <p className="text-success font-medium text-sm">
                      {edu.institution}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Field: {edu.field}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(edu.id)}
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
            setFormData(emptyEducation)
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Education</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={formData.degree}
                  onChange={e =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  placeholder="e.g., Master of Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={formData.institution}
                  onChange={e =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  placeholder="e.g., Stanford University"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input
                value={formData.field}
                onChange={e =>
                  setFormData({ ...formData, field: e.target.value })
                }
                placeholder="e.g., Computer Science"
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
                  placeholder="e.g., Sep 2016"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={formData.endDate}
                  onChange={e =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  placeholder="e.g., May 2018"
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
                placeholder="Describe your achievements, GPA, honors..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setEditingId(null)
                  setFormData(emptyEducation)
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? "Save Changes" : "Add Education"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Education?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              education entry.
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

export default EducationSection
