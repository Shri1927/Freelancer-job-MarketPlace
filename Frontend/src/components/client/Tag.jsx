const Tag = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700 border-gray-200",
    pending: "bg-orange-100 text-orange-700 border-orange-200",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    overdue: "bg-red-100 text-red-700 border-red-200",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Tag
