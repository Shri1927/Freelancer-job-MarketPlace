const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-green-200 bg-white py-10 px-6 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600 max-w-md">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export default EmptyState

