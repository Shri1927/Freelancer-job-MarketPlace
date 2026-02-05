import { Link, useLocation } from "react-router-dom"
import {
  Briefcase,
  CreditCard,
  FileText,
  BarChart3,
  Activity,
  User,
  Settings,
  FileBarChart,
  MessageSquare,
  FilePlus2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ClientSidebar = () => {
  const location = useLocation()

  const menuItems = [
    {
      group: "Main Menu",
      items: [
        {
          icon: Briefcase,
          label: "Projects",
          path: "/dashboard/client/projects",
        },
        {
          icon: FilePlus2,
          label: "Post Job",
          path: "/dashboard/client/post-job",
        },
        {
          icon: MessageSquare,
          label: "Messages",
          path: "/dashboard/client/messages",
        },
      ],
    },
    {
      group: "Financial",
      items: [
        {
          icon: CreditCard,
          label: "Billing & Payments",
          path: "/dashboard/client/billing",
        },
        {
          icon: FileText,
          label: "Invoices",
          path: "/dashboard/client/invoices",
        },
      ],
    },
    {
      group: "Reports",
      items: [
        {
          icon: FileBarChart,
          label: "Reports",
          path: "/dashboard/client/reports",
        },
        {
          icon: BarChart3,
          label: "Analytics",
          path: "/dashboard/client/analytics",
        },
        {
          icon: Activity,
          label: "Activity Log",
          path: "/dashboard/client/activity",
        },
      ],
    },
    {
      group: "Account",
      items: [
        {
          icon: User,
          label: "Profile",
          path: "/dashboard/client/profile",
        },
        {
          icon: Settings,
          label: "Settings",
          path: "/dashboard/client/settings",
        },
      ],
    },
  ]

  const isActive = (path) => {
    if (path === "/dashboard/client") {
      return location.pathname === path
    }
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <aside className="w-64 bg-white border-r border-green-200 h-screen sticky top-0 overflow-y-auto">
      <Link
        to="/dashboard/client"
        className="block p-6 border-b border-green-200 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">FreelanceHub</h2>
            <p className="text-xs text-gray-500">Client Portal</p>
          </div>
        </div>
      </Link>

      <nav className="p-4 space-y-6">
        {menuItems.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon
                const active = isActive(item.path)
                const disabled = item.disabled

                return (
                  <li key={itemIndex}>
                    {disabled ? (
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          active
                            ? "bg-green-50 text-green-700 font-medium border border-green-200"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default ClientSidebar
