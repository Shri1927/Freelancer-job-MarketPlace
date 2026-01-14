import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Trash2, Plus, Globe } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
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

const emptyLanguage = {
  name: "",
  proficiency: "Basic"
}

const proficiencyColors = {
  Native: "bg-primary/20 text-primary/100",
  Conversational: "bg-yellow-200 text-black",
  Basic: "bg-primary/20 text-gray/70"
}

const LanguagesSection = ({ languages, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState(emptyLanguage)

  const handleAdd = () => {
    onAdd(formData)
    setFormData(emptyLanguage)
    setIsAdding(false)
  }

  const handleEdit = lang => {
    setFormData(lang)
    setEditingId(lang.id)
  }

  const handleUpdate = () => {
    if (editingId) {
      onUpdate({
        ...formData,
        id: editingId
      })
      setFormData(emptyLanguage)
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
          <h3 className="text-xl font-bold">Languages</h3>
          <Button onClick={() => setIsAdding(true)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map(lang => (
            <div
              key={lang.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{lang.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full  ${
                      proficiencyColors[lang.proficiency]
                    }`}
                  >
                    {lang.proficiency}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(lang)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteId(lang.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
            setFormData(emptyLanguage)
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Language</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Input
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., English"
              />
            </div>
            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Select
                value={formData.proficiency}
                onValueChange={value =>
                  setFormData({ ...formData, proficiency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Native">Native</SelectItem>
                  <SelectItem value="Conversational">Conversational</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false)
                  setEditingId(null)
                  setFormData(emptyLanguage)
                }}
              >
                Cancel
              </Button>
              <Button onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? "Save Changes" : "Add Language"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Language?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              language entry.
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

export default LanguagesSection
