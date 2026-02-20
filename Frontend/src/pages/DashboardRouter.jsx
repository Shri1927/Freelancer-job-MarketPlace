import { Navigate } from "react-router-dom"

const DashboardRouter = () => {
  let userInfo = {}

  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  } catch (error) {
    console.error("[DashboardRouter] Failed to parse userInfo from localStorage:", error)
    userInfo = {}
  }

  const rawUserType = userInfo.userType || userInfo.role
  const userType = typeof rawUserType === "string" ? rawUserType.toLowerCase() : null

  console.log("[DashboardRouter] userInfo:", userInfo)
  console.log("[DashboardRouter] resolved userType:", userType)

  if (!userType) {
    console.warn("[DashboardRouter] Missing userType, redirecting to /signin")
    return <Navigate to="/signin" replace />
  }

  if (userType === "client") {
    console.log("[DashboardRouter] Redirecting to /dashboard/client")
    return <Navigate to="/dashboard/client" replace />
  }

  if (userType === "freelancer") {
    console.log("[DashboardRouter] Redirecting to /dashboard/freelancer")
    return <Navigate to="/dashboard/freelancer" replace />
  }

  console.warn("[DashboardRouter] Invalid userType, redirecting to /signin")
  return <Navigate to="/signin" replace />
}

export default DashboardRouter
