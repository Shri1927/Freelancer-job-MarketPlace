import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card';

const OverviewSection = ({ overview, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(overview)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <>
      <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold">Overview</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
        <p className="text-muted-foreground leading-relaxed">{overview}</p>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Overview</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Professional Overview</Label>
              <Textarea
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                rows={6}
                placeholder="Describe your professional background and expertise..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OverviewSection
