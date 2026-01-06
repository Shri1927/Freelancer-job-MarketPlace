import { motion } from 'framer-motion'
import { CheckSquare, Clock, Calendar, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MilestonesTasks = () => {
     const navigate = useNavigate()
  const milestones = [
    {
      id: 1,
      project: 'E-commerce Website Development',
      title: 'Homepage Design & Development',
      description: 'Complete the homepage design and implement responsive layout',
      deadline: '2024-02-10',
      status: 'completed',
      amount: '$2,000',
      progress: 100
    },
    {
      id: 2,
      project: 'E-commerce Website Development',
      title: 'Product Catalog Implementation',
      description: 'Build product listing and detail pages with filters',
      deadline: '2024-02-15',
      status: 'in-progress',
      amount: '$2,500',
      progress: 60
    },
    {
      id: 3,
      project: 'Mobile App UI/UX Design',
      title: 'Wireframe & Mockups',
      description: 'Create wireframes and high-fidelity mockups for all screens',
      deadline: '2024-02-12',
      status: 'in-progress',
      amount: '$1,500',
      progress: 80
    },
    {
      id: 4,
      project: 'Content Writing Project',
      title: 'Blog Posts Batch 1',
      description: 'Write 10 blog posts on technology topics',
      deadline: '2024-02-08',
      status: 'pending',
      amount: '$400',
      progress: 0
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Milestones & Tasks</h1>
        <p className="text-gray-600">Track your project milestones and tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Milestones</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <CheckSquare className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <CheckSquare className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <Calendar className="w-10 h-10 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(milestone.status)}`}>
                    {milestone.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{milestone.project}</p>
                <p className="text-gray-600 mb-3">{milestone.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date(milestone.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">{milestone.amount}</span>
                  </div>
                </div>
                {milestone.status === 'in-progress' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${milestone.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-primary-600 h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
              {milestone.status === 'in-progress' && (
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Update Progress
                </button>
              )}
              {milestone.status === 'pending' && (
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Start Task
                </button>
              )}
              {milestone.status === 'completed' && (
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors" onClick={() => navigate('/mile')}>
                  View Details
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MilestonesTasks
