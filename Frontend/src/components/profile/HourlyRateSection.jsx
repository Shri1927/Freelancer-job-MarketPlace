import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, DollarSign } from "lucide-react"
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

const HourlyRateSection = ({ rate, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(rate)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <>
        <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Hourly Rate</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-rate-bg rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">${rate}</p>
            <p className="text-muted-foreground text-sm">per hour</p>
          </div>
        </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Hourly Rate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Hourly Rate ($)</Label>
              <Input
                type="number"
                value={editData}
                onChange={e => setEditData(Number(e.target.value))}
                min={0}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default HourlyRateSection
