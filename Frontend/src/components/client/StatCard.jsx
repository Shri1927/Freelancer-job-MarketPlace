const StatCard = ({ icon: Icon, label, value, change, changeType = "positive" }) => {
  return (
    <div className="bg-white rounded-lg border border-green-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-green-50">
          <Icon className="w-5 h-5 text-green-600" />
        </div>
        {change && (
          <span
            className={`text-xs font-medium ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  )
}

export default StatCard
