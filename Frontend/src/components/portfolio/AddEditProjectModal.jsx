import { useState, useEffect } from 'react';
import { Plus, X, Image as ImageIcon, Upload, Link2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const categories = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'Video Editing',
  'Photography',
  'Other',
];

export const AddEditProjectModal = ({
  project = null,
  isOpen,
  onClose,
  onSave,
  existingCategories = [],
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    image: '',
    skills: [],
    clientName: '',
    featured: false,
  });
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        category: project.category || '',
        description: project.description || '',
        link: project.link || '',
        image: project.image || '',
        skills: project.skills || [],
        clientName: project.clientName || '',
        featured: project.featured || false,
      });
    } else {
      resetForm();
    }
  }, [project, isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      link: '',
      image: '',
      skills: [],
      clientName: '',
      featured: false,
    });
    setSkillInput('');
  };

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSkillInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleImageUrlChange = (e) => {
    setFormData({ ...formData, image: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    if (formData.skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        id: project?.id || `project-${Date.now()}`,
        createdAt: project?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: project?.views || 0,
      };

      if (onSave) {
        await onSave(projectData);
      }

      toast.success(project ? 'Project updated successfully' : 'Project added successfully');
      resetForm();
      onClose();
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allCategories = [...new Set([...categories, ...existingCategories])];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <DialogDescription>
            {project
              ? 'Update your project details'
              : 'Add a new project to showcase your work'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image Preview */}
          {formData.image && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border">
              <img
                src={formData.image}
                alt="Project preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <button
                onClick={() => setFormData({ ...formData, image: '' })}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your project..."
              rows={4}
              required
            />
          </div>

          {/* Project Link */}
          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
                className="pl-9"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={handleImageUrlChange}
                placeholder="https://example.com/image.jpg"
                className="pl-9"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter an image URL to display a preview
            </p>
          </div>

          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name (Optional)</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="Enter client name"
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills *</Label>
            <div className="flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleSkillInputKeyPress}
                placeholder="Add a skill and press Enter"
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {formData.skills.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Add at least one skill to describe your project
              </p>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Feature this project (show on top)
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};









