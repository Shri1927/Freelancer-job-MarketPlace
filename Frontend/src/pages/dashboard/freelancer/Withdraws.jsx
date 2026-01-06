import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Wallet, CreditCard, Landmark, ArrowRight } from 'lucide-react'

const Withdraws = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('bank')

  const withdrawMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, fee: '2%', time: '3-5 business days' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, fee: '3%', time: 'Instant' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, fee: '1.5%', time: '1-2 business days' },
  ]

  const recentWithdraws = [
    { id: 1, amount: 2000, method: 'Bank Transfer', date: '2024-02-01', status: 'completed' },
    { id: 2, amount: 1500, method: 'PayPal', date: '2024-01-28', status: 'completed' },
    { id: 3, amount: 3000, method: 'Bank Transfer', date: '2024-01-25', status: 'pending' },
    { id: 4, amount: 800, method: 'Digital Wallet', date: '2024-01-20', status: 'completed' },
  ]

  const availableBalance = 8200

  const handleWithdraw = (e) => {
    e.preventDefault()
    if (withdrawAmount && parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= availableBalance) {
      // Add withdraw logic here
      console.log('Withdrawing:', withdrawAmount, 'via', selectedMethod)
      setWithdrawAmount('')
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
        <h1 className="text-3xl font-bold text-gray/90 mb-2">Withdraws</h1>
        <p className="text-gray/80">Withdraw your earnings to your preferred method</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary/80 to-primary/90 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 mb-2">Available Balance</p>
            <p className="text-4xl font-bold">${availableBalance.toLocaleString()}</p>
          </div>
          <Wallet className="w-16 h-16 text-primary/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdraw Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray/30">
          <h2 className="text-xl font-bold text-gray/90 mb-4">Withdraw Funds</h2>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray/80 mb-2">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray/40 w-5 h-5" />
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  max={availableBalance}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60"
                  required
                />
              </div>
              <p className="text-xs text-gray/60 mt-1">Max: ${availableBalance.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray/70 mb-2">Withdrawal Method</label>
              <div className="space-y-2">
                {withdrawMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full p-4 border-2 rounded-lg transition-all ${
                        selectedMethod === method.id
                          ? 'border-primary/70 bg-primary/10'
                          : 'border-gray/40 hover:border-gray/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 ${
                            selectedMethod === method.id ? 'text-primary/70' : 'text-gray/60'
                          }`} />
                          <div className="text-left">
                            <p className="font-semibold text-gray/90">{method.name}</p>
                            <p className="text-xs text-gray/70">Fee: {method.fee} • {method.time}</p>
                          </div>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="w-5 h-5 bg-primary/80 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary/80 hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Withdraw Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Recent Withdraws */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray/40">
          <h2 className="text-xl font-bold text-gray/90 mb-4">Recent Withdraws</h2>
          <div className="space-y-3">
            {recentWithdraws.map((withdraw) => (
              <div
                key={withdraw.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray/30 hover:bg-gray/20 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray/90">{withdraw.method}</p>
                  <p className="text-sm text-gray/60">{new Date(withdraw.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray/90">${withdraw.amount.toLocaleString()}</p>
                  <span className={`text-xs font-semibold ${
                    withdraw.status === 'completed' ? 'text-green/70' : 'text-yellow/70'
                  }`}>
                    {withdraw.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Withdraws










