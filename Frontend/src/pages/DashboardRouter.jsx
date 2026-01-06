import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ClientDashboard from "./dashboard/client/ClientDashboard"
import FreelancerDashboard from "./dashboard/freelancer/FreelancerDashboard"
import DashboardTest from "./DashboardTest"

const DashboardRouter = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const type = userInfo.userType

    console.log('DashboardRouter: userInfo =', userInfo)
    console.log('DashboardRouter: type =', type)

    if (!type) {
      // If no user type is set, redirect to sign in
      navigate("/signin")
      return
    }

    setUserType(type)
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (userType === "client") {
    return <ClientDashboard />
  } else if (userType === "freelancer") {
    return <FreelancerDashboard />
  }

  return <DashboardTest />
}

export default DashboardRouter

