import { motion } from 'framer-motion'
import { Trophy, Star, Award, Target, TrendingUp } from 'lucide-react'

const Achievements = () => {
  const achievements = [
    { id: 1, title: 'First Project Completed', icon: Trophy, color: 'text-yellow-500', earned: true, date: '2023-01-15' },
    { id: 2, title: 'Top Rated Freelancer', icon: Star, color: 'text-blue-500', earned: true, date: '2023-06-20' },
    { id: 3, title: '100 Projects Milestone', icon: Target, color: 'text-green-500', earned: true, date: '2024-01-10' },
    { id: 4, title: 'Earned $10,000', icon: TrendingUp, color: 'text-purple-500', earned: true, date: '2024-02-01' },
    { id: 5, title: '5-Star Rating Streak', icon: Award, color: 'text-orange-500', earned: false, progress: 8, target: 10 },
    { id: 6, title: '50 Clients Served', icon: Trophy, color: 'text-pink-500', earned: false, progress: 42, target: 50 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray/100 mb-2">Achievements</h1>
        <p className="text-gray/70">Track your milestones and accomplishments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                achievement.earned ? 'border-primary/70' : 'border-gray/30'
              }`}
            >
              <div className={`w-16 h-16 ${achievement.earned ? achievement.color : 'text-gray/40'} mb-4`}>
                <Icon className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-gray/100 mb-2">{achievement.title}</h3>
              {achievement.earned ? (
                <div>
                  <p className="text-sm text-green/60 font-semibold mb-1">✓ Earned</p>
                  <p className="text-xs text-gray/60">{new Date(achievement.date).toLocaleDateString()}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray/70">Progress</span>
                    <span className="text-sm font-semibold text-gray/100">
                      {achievement.progress}/{achievement.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray/300 rounded-full h-2">
                    <div
                      className="bg-primary/70 h-2 rounded-full"
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Achievements










