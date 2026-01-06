import { motion } from 'framer-motion'
import { DollarSign, ArrowDownRight, ArrowUpRight, Download, Filter, Calendar } from 'lucide-react'

const Transactions = () => {
  const transactions = [
    { id: 1, type: 'earning', amount: 2000, description: 'E-commerce Website Project', date: '2024-02-05', status: 'completed' },
    { id: 2, type: 'withdrawal', amount: -1500, description: 'Bank Transfer', date: '2024-02-03', status: 'completed' },
    { id: 3, type: 'earning', amount: 1200, description: 'Mobile App Design', date: '2024-02-01', status: 'completed' },
    { id: 4, type: 'withdrawal', amount: -800, description: 'PayPal Withdrawal', date: '2024-01-28', status: 'pending' },
    { id: 5, type: 'earning', amount: 400, description: 'Content Writing', date: '2024-01-25', status: 'completed' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray/100 mb-2">Transactions</h1>
        <p className="text-gray/30">View all your financial transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray/30 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-green-80">$12,450</p>
            </div>
            <ArrowUpRight className="w-10 h-10 text-green/70" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray/30 mb-1">Total Withdrawals</p>
              <p className="text-2xl font-bold text-red/80">$2,300</p>
            </div>
            <ArrowDownRight className="w-10 h-10 text-red/70" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray/30 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-gray/100">$10,150</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray/30 flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray/20 hover:bg-gray/30 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <select className="px-4 py-2 border border-gray/300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60">
          <option>All Types</option>
          <option>Earnings</option>
          <option>Withdrawals</option>
        </select>
        <select className="px-4 py-2 border border-gray/300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60">
          <option>All Time</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/70 hover:bg-primary/80 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray/30 border-b border-gray/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray/30 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray/30 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray/30 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray/30 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray/30 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray/30">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray/30">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray/100">{transaction.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.type === 'earning' ? 'bg-green-100 text-green/80' : 'bg-red/20 text-red/80'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold ${
                    transaction.amount > 0 ? 'text-green/40' : 'text-red/80'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'completed' ? 'bg-green-100 text-green/80' : 'bg-yellow/30 text-yellow/80'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default Transactions










