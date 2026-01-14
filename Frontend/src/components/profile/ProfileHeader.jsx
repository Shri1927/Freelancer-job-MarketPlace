import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Mail, Phone, MapPin, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import ImageEditor from "./ImageEditor"
import { Card, CardContent } from '@/components/ui/card';

const ProfileHeader = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [editData, setEditData] = useState(profile)
  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    onUpdate(editData)
    setIsEditing(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()]
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = skillToRemove => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(s => s !== skillToRemove)
    })
  }

  const handlePhotoSave = imageUrl => {
    const updated = { ...profile, avatarUrl: imageUrl }
    onUpdate(updated)
    setEditData(updated)
  }

  const getInitials = name => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                {getInitials(profile.name)}
              </div>
            )}
            <button
              className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-md"
              onClick={() => setIsEditingPhoto(true)}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {profile.name}
                </h2>
                <p className="text-primary font-medium">{profile.title}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              
              {profile.skills.map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
        </CardContent>
      </Card>

      {/* Image Editor Dialog */}
      <ImageEditor
        isOpen={isEditingPhoto}
        onClose={() => setIsEditingPhoto(false)}
        onSave={handlePhotoSave}
        currentImage={profile.avatarUrl}
      />

      {/* Profile Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={editData.name}
                  onChange={e =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editData.title}
                  onChange={e =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editData.email}
                  onChange={e =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={editData.phone}
                  onChange={e =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={editData.location}
                onChange={e =>
                  setEditData({ ...editData, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={e =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                />
                <Button onClick={handleAddSkill} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {editData.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
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

export default ProfileHeader
