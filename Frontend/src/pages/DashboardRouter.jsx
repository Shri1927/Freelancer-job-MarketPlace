import { Navigate } from "react-router-dom"

const DashboardRouter = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const userType = userInfo.userType

  if (!userType) {
    return <Navigate to="/signin" replace />
  }

  if (userType === "client") {
    return <Navigate to="/dashboard/client" replace />
  }

  if (userType === "freelancer") {
    return <Navigate to="/dashboard/freelancer" replace />
  }

  return <Navigate to="/" replace />
}

export default DashboardRouter
