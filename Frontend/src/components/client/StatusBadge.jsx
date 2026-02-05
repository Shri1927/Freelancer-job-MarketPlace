import Tag from "./Tag"

// Normalizes common domain statuses into visual variants
const mapStatusToVariant = (status, type) => {
  const normalized = (status || "").toString().toLowerCase()

  // Allow explicit mapping by type (e.g. "invoice", "project")
  if (type === "invoice" || type === "payment") {
    if (normalized === "paid" || normalized === "successful") return "paid"
    if (normalized === "unpaid" || normalized === "pending") return "pending"
    if (normalized === "overdue" || normalized === "failed") return "overdue"
  }

  if (type === "project") {
    if (normalized === "active") return "in-progress"
    if (normalized === "in-progress") return "in-progress"
    if (normalized === "completed") return "completed"
    if (normalized === "in-review") return "pending"
    if (normalized === "on-hold") return "pending"
  }

  // Fallbacks
  if (normalized === "completed") return "completed"
  if (normalized === "overdue") return "overdue"
  if (normalized === "pending") return "pending"

  return "default"
}

const capitalizeWords = (value) =>
  value
    .toString()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

const StatusBadge = ({ status, type, children, className }) => {
  const label = children || capitalizeWords(status || "")
  const variant = mapStatusToVariant(status, type)

  return (
    <Tag variant={variant} className={className}>
      {label}
    </Tag>
  )
}

export default StatusBadge

