import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Search, User, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useUser } from "@/contexts/UserContext.jsx"
import { apiFetch } from "@/lib/apiClient"
import ClientNotificationsDropdown from "@/components/client/ClientNotificationsDropdown"

const ClientTopbar = () => {
  const { user } = useUser()
  const [serverUser, setServerUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadUser = async () => {
      // Only try hitting backend if we appear to be authenticated
      const token = localStorage.getItem("authToken")
      if (!token) return

      setLoading(true)
      try {
        const data = await apiFetch("/client/settings", {
          method: "GET",
        })
        if (!isMounted) return

        // Prefer backend user object; keep profile/settings if needed elsewhere
        if (data?.user) {
          setServerUser(data.user)
        }
      } catch (err) {
        console.error("Failed to load client settings:", err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [])

  const effectiveUser = serverUser || user

  const displayName = effectiveUser?.name || "Client"
  const roleLabel = effectiveUser?.role || "Client"
  const avatar = effectiveUser?.avatar || user?.avatar || ""

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search projects, messages..."
              className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ClientNotificationsDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500">{roleLabel}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/client/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/client/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default ClientTopbar
