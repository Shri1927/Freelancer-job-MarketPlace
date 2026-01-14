import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Calendar, MapPin, Home, Building } from "lucide-react"
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
const PersonalDetailsSection = ({ details, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(details)

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  return (
    <>
        <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title">Personal Details</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium text-foreground">
                {details.dateOfBirth}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Country</p>
              <p className="font-medium text-foreground">{details.country}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Street Address</p>
              <p className="font-medium text-foreground">
                {details.streetAddress}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Apt/Suite</p>
              <p className="font-medium text-foreground">{details.aptSuite}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City, State</p>
              <p className="font-medium text-foreground">
                {details.city}, {details.state}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ZIP Code</p>
              <p className="font-medium text-foreground">{details.zipCode}</p>
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Personal Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Input
                  value={editData.dateOfBirth}
                  onChange={e =>
                    setEditData({ ...editData, dateOfBirth: e.target.value })
                  }
                  placeholder="e.g., June 15, 1992"
                />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input
                  value={editData.country}
                  onChange={e =>
                    setEditData({ ...editData, country: e.target.value })
                  }
                  placeholder="e.g., United States"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input
                  value={editData.streetAddress}
                  onChange={e =>
                    setEditData({ ...editData, streetAddress: e.target.value })
                  }
                  placeholder="e.g., 123 Tech Street"
                />
              </div>
              <div className="space-y-2">
                <Label>Apt/Suite</Label>
                <Input
                  value={editData.aptSuite}
                  onChange={e =>
                    setEditData({ ...editData, aptSuite: e.target.value })
                  }
                  placeholder="e.g., Apt 4B"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={editData.city}
                  onChange={e =>
                    setEditData({ ...editData, city: e.target.value })
                  }
                  placeholder="e.g., San Francisco"
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={editData.state}
                  onChange={e =>
                    setEditData({ ...editData, state: e.target.value })
                  }
                  placeholder="e.g., CA"
                />
              </div>
              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input
                  value={editData.zipCode}
                  onChange={e =>
                    setEditData({ ...editData, zipCode: e.target.value })
                  }
                  placeholder="e.g., 94102"
                />
              </div>
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

export default PersonalDetailsSection
