import { Outlet } from "react-router-dom"
import ClientSidebar from "@/components/client/ClientSidebar"
import ClientTopbar from "@/components/client/ClientTopbar"

const ClientLayout = () => {
   console.log("CLIENT LAYOUT MOUNTED")
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ClientSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ClientTopbar userName="Shruti Bandaswami" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ClientLayout
