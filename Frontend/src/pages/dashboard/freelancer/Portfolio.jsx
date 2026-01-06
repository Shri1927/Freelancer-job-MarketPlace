import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react'

const Portfolio = () => {
  const [projects] = useState([
    {
      id: 1,
      title: 'E-commerce Website',
      category: 'Web Development',
      image: 'https://via.placeholder.com/400x300',
      description: 'Modern e-commerce platform with React and Node.js',
      link: 'https://example.com',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Mobile App Design',
      category: 'UI/UX Design',
      image: 'https://via.placeholder.com/400x300',
      description: 'Beautiful mobile app interface design',
      link: 'https://example.com',
      skills: ['Figma', 'UI Design', 'Prototyping']
    },
    {
      id: 3,
      title: 'Content Strategy',
      category: 'Content Writing',
      image: 'https://via.placeholder.com/400x300',
      description: 'Content strategy for tech startup',
      link: 'https://example.com',
      skills: ['SEO', 'Content Writing', 'Strategy']
    },
  ])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray/90 mb-2">Portfolio</h1>
          <p className="text-gray/80">Showcase your best work to attract clients</p>
        </div>
        <button className="bg-primary/70 hover:bg-primary/80 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray/30 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray/30 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray/50" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs text-primary/70 font-semibold">{project.category}</span>
                  <h3 className="text-xl font-bold text-gray/90 mt-1">{project.title}</h3>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray/20 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray/80" />
                  </button>
                  <button className="p-2 hover:bg-gray/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red/70" />
                  </button>
                </div>
              </div>
              <p className="text-gray/80 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-gray/20 text-gray/80 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary/70 hover:text-primary/80 font-medium text-sm"
              >
                <span>View Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Portfolio










