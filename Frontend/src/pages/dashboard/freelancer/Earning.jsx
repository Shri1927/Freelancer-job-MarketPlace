import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'

const Earning = () => {
  const earnings = [
    { month: 'January 2024', amount: 8500, projects: 3 },
    { month: 'February 2024', amount: 12450, projects: 4 },
    { month: 'March 2024', amount: 9800, projects: 2 },
    { month: 'April 2024', amount: 15200, projects: 5 },
  ]

  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0)
  const averageMonthly = totalEarnings / earnings.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray/90 mb-2">Earnings</h1>
        <p className="text-gray-600">Track your earnings and financial performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray/90">${totalEarnings.toLocaleString()}</p>
            </div>
            <DollarSign className="w-10 h-10 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray/90">$12,450</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Monthly</p>
              <p className="text-2xl font-bold text-gray/90">${Math.round(averageMonthly).toLocaleString()}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-2xl font-bold text-gray/90">$8,200</p>
            </div>
            <DollarSign className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray/90">Monthly Earnings</h2>
          <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
        <div className="space-y-4">
          {earnings.map((earning, index) => {
            const maxAmount = Math.max(...earnings.map(e => e.amount))
            const percentage = (earning.amount / maxAmount) * 100
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray/90">{earning.month}</p>
                    <p className="text-sm text-gray-500">{earning.projects} projects</p>
                  </div>
                  <p className="text-lg font-bold text-gray/90">${earning.amount.toLocaleString()}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary/80 h-3 rounded-full"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray/90 mb-4">Recent Earnings</h2>
        <div className="space-y-3">
          {[
            { project: 'E-commerce Website', amount: 2000, date: '2024-02-05', status: 'completed' },
            { project: 'Mobile App Design', amount: 1500, date: '2024-02-03', status: 'completed' },
            { project: 'Content Writing', amount: 400, date: '2024-02-01', status: 'completed' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray/90">{item.project}</p>
                <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray/90">${item.amount.toLocaleString()}</p>
                <span className="text-xs text-green-600 font-semibold">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Earning










