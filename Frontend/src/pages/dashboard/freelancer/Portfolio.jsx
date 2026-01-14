import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortfolioStatsCard } from '@/components/portfolio/PortfolioStatsCard';
import { PortfolioFilters } from '@/components/portfolio/PortfolioFilters';
import { PortfolioProjectCard } from '@/components/portfolio/PortfolioProjectCard';
import { AddEditProjectModal } from '@/components/portfolio/AddEditProjectModal';
import { ProjectDetailsModal } from '@/components/portfolio/ProjectDetailsModal';
import { toast } from 'sonner';

const Portfolio = () => {
  // Mock data - Replace with API calls
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'E-commerce Platform Redesign',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800',
      description: 'Modern e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
      link: 'https://example.com',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Tailwind CSS'],
      clientName: 'TechCorp Inc.',
      featured: true,
      views: 1250,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Mobile App Design',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
      description: 'Beautiful mobile app interface design for a fintech startup. Clean, modern design with focus on user experience and accessibility.',
      link: 'https://example.com',
      skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
      clientName: 'FinanceApp',
      featured: true,
      views: 980,
      createdAt: '2024-01-20T10:00:00Z',
    },
    {
      id: '3',
      title: 'Content Strategy & SEO',
      category: 'Content Writing',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d52d?w=800',
      description: 'Comprehensive content strategy for tech startup including blog posts, social media content, and SEO optimization.',
      link: 'https://example.com',
      skills: ['SEO', 'Content Writing', 'Strategy', 'Copywriting'],
      clientName: 'StartupXYZ',
      featured: false,
      views: 650,
      createdAt: '2024-01-25T10:00:00Z',
    },
    {
      id: '4',
      title: 'Brand Identity Package',
      category: 'Graphic Design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines.',
      link: 'https://example.com',
      skills: ['Adobe Illustrator', 'Branding', 'Logo Design', 'Typography'],
      clientName: 'DesignHub',
      featured: false,
      views: 420,
      createdAt: '2024-02-01T10:00:00Z',
    },
    {
      id: '5',
      title: 'Dashboard Analytics',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      description: 'Analytics dashboard with real-time data visualization using React and Chart.js. Includes customizable widgets and export functionality.',
      link: 'https://example.com',
      skills: ['React', 'Chart.js', 'D3.js', 'TypeScript'],
      clientName: 'TechCorp Inc.',
      featured: false,
      views: 750,
      createdAt: '2024-02-05T10:00:00Z',
    },
    {
      id: '6',
      title: 'Video Production',
      category: 'Video Editing',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
      description: 'Corporate video production including filming, editing, color grading, and post-production for company marketing campaign.',
      link: 'https://example.com',
      skills: ['Premiere Pro', 'After Effects', 'Color Grading', 'Motion Graphics'],
      clientName: 'MediaGroup',
      featured: false,
      views: 320,
      createdAt: '2024-02-10T10:00:00Z',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);

  // Get unique categories and skills
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats).sort();
  }, [projects]);

  const skills = useMemo(() => {
    const allSkills = projects.flatMap((p) => p.skills || []);
    const uniqueSkills = new Set(allSkills);
    return Array.from(uniqueSkills).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.clientName?.toLowerCase().includes(query) ||
          p.skills?.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Filter by skill
    if (skillFilter !== 'all') {
      filtered = filtered.filter((p) => p.skills?.includes(skillFilter));
    }

    // Sort: featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [projects, searchQuery, categoryFilter, skillFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const uniqueCategories = categories.length;
    const featuredProjects = projects.filter((p) => p.featured).length;
    const totalViews = projects.reduce((sum, p) => sum + (p.views || 0), 0);

    return {
      totalProjects,
      categories: uniqueCategories,
      featuredProjects,
      totalViews,
    };
  }, [projects, categories]);

  // Handle add project
  const handleAddProject = (projectData) => {
    setProjects([...projects, projectData]);
    setIsAddModalOpen(false);
  };

  // Handle edit project
  const handleEditProject = (projectData) => {
    setProjects(projects.map((p) => (p.id === projectData.id ? projectData : p)));
    setEditingProject(null);
  };

  // Handle delete project
  const handleDeleteProject = (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      setProjects(projects.filter((p) => p.id !== project.id));
      toast.success('Project deleted successfully');
    }
  };

  // Handle save (add or edit)
  const handleSave = (projectData) => {
    if (editingProject) {
      handleEditProject(projectData);
    } else {
      handleAddProject(projectData);
    }
  };

  // Handle view project (increment views)
  const handleViewProject = (project) => {
    setProjects(
      projects.map((p) =>
        p.id === project.id ? { ...p, views: (p.views || 0) + 1 } : p
      )
    );
    setViewingProject(project);
  };

  return (
    <div className=" bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Portfolio
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Showcase your best work to attract clients
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Add Project
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 md:mb-8">
          <PortfolioStatsCard
            totalProjects={stats.totalProjects}
            categories={stats.categories}
            featuredProjects={stats.featuredProjects}
            totalViews={stats.totalViews}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <PortfolioFilters
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            skillFilter={skillFilter}
            viewMode={viewMode}
            categories={categories}
            skills={skills}
            onSearchChange={setSearchQuery}
            onCategoryFilterChange={setCategoryFilter}
            onSkillFilterChange={setSkillFilter}
            onViewModeChange={setViewMode}
            totalProjects={filteredProjects.length}
          />
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProjects.map((project) => (
              <PortfolioProjectCard
                key={project.id}
                project={project}
                viewMode={viewMode}
                isFeatured={project.featured}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
                onView={handleViewProject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || categoryFilter !== 'all' || skillFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first project'}
            </p>
            {(!searchQuery && categoryFilter === 'all' && skillFilter === 'all') && (
              <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Project
              </Button>
            )}
          </div>
        )}

        {/* Add Project Modal */}
        <AddEditProjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSave}
          existingCategories={categories}
        />

        {/* Edit Project Modal */}
        <AddEditProjectModal
          project={editingProject}
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
          existingCategories={categories}
        />

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={viewingProject}
          isOpen={!!viewingProject}
          onClose={() => setViewingProject(null)}
        />
      </div>
    </div>
  );
};

export default Portfolio;










