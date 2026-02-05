import { useState } from "react"
import { User, Bell, Settings2, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PageHeader from "@/components/client/PageHeader"
import { useUser } from "@/contexts/UserContext.jsx"
import { toast } from "sonner"

export default function Settings() {
  console.log("Settings page rendered")
  const { user, updateUser, logout } = useUser()
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: user?.company || "",
    phone: user?.phone || "",
  })
  const [notifications, setNotifications] = useState({
    emailInvoices: true,
    emailMessages: true,
    emailProjectUpdates: true,
    pushNotifications: false,
  })
  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "Automatic",
    weeklySummary: true,
    darkMode: false,
  })
  const [creatingAccount, setCreatingAccount] = useState(false)
  const [newAccountStep, setNewAccountStep] = useState(1)
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    role: "client",
  })

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Configure your account, notifications, security, and workspace preferences."
      />

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-white border border-green-200 p-1 rounded-lg shadow-sm">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border data-[state=active]:border-green-200 rounded-md"
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border data-[state=active]:border-green-200 rounded-md"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border data-[state=active]:border-green-200 rounded-md"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border data-[state=active]:border-green-200 rounded-md"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-0">
          <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account settings
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="name" className="text-gray-700">
                  Full name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-gray-700">
                  Company
                </Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, company: e.target.value }))
                  }
                  className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  updateUser?.({
                    name: profile.name,
                    email: profile.email,
                    company: profile.company,
                    phone: profile.phone,
                  })
                  toast.success("Account settings saved")
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notification preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Invoice & payments</p>
                  <p className="text-sm text-gray-600">
                    Email when invoices are paid or due
                  </p>
                </div>
                <Switch
                  checked={notifications.emailInvoices}
                  onCheckedChange={(v) =>
                    setNotifications((n) => ({ ...n, emailInvoices: v }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Messages</p>
                  <p className="text-sm text-gray-600">
                    Email when you receive new messages
                  </p>
                </div>
                <Switch
                  checked={notifications.emailMessages}
                  onCheckedChange={(v) =>
                    setNotifications((n) => ({ ...n, emailMessages: v }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Project updates</p>
                  <p className="text-sm text-gray-600">
                    Email for milestones and status changes
                  </p>
                </div>
                <Switch
                  checked={notifications.emailProjectUpdates}
                  onCheckedChange={(v) =>
                    setNotifications((n) => ({ ...n, emailProjectUpdates: v }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push notifications</p>
                  <p className="text-sm text-gray-600">
                    Browser push for important updates
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(v) =>
                    setNotifications((n) => ({ ...n, pushNotifications: v }))
                  }
                />
              </div>
            </div>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              Save preferences
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
          <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Workspace preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-600">
                    Choose the language used across the interface
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {preferences.language}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Time zone</p>
                  <p className="text-sm text-gray-600">
                    Use your device time zone or select manually
                  </p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {preferences.timezone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly summary</p>
                  <p className="text-sm text-gray-600">
                    Receive a weekly email summarizing activity
                  </p>
                </div>
                <Switch
                  checked={preferences.weeklySummary}
                  onCheckedChange={(v) =>
                    setPreferences((p) => ({ ...p, weeklySummary: v }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark mode</p>
                  <p className="text-sm text-gray-600">
                    Use a darker color palette for low-light environments
                  </p>
                </div>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(v) =>
                    setPreferences((p) => ({ ...p, darkMode: v }))
                  }
                />
              </div>
            </div>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              Save preferences
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security & account actions
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-green-100">
                  <div>
                    <p className="font-medium text-gray-900">Change password</p>
                    <p className="text-sm text-gray-600">
                      Update your account password
                    </p>
                  </div>
                  <Button variant="outline" className="border-green-200">
                    Change password
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-green-100">
                  <div>
                    <p className="font-medium text-gray-900">Two-factor authentication</p>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="border-green-200">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger zone
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Closing your account is permanent. All projects, invoices, and
                data will be removed and cannot be recovered.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-400"
                  >
                    Close account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Close account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. All your projects, invoices,
                      and data will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-green-200">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        logout?.()
                        toast.success("Account closed (mock)")
                      }}
                    >
                      Yes, close account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create new account wizard */}
      <div>
        <Button
          variant="outline"
          className="border-green-200"
          onClick={() => {
            setNewAccountStep(1)
            setCreatingAccount(true)
          }}
        >
          Create new account
        </Button>
        <Dialog open={creatingAccount} onOpenChange={setCreatingAccount}>
          <DialogContent className="border-green-200 max-w-md">
            <DialogHeader>
              <DialogTitle>
                {newAccountStep === 1
                  ? "New account details"
                  : "Confirm new account"}
              </DialogTitle>
              <DialogDescription>
                {newAccountStep === 1
                  ? "Enter basic details for the new account (mock only)."
                  : "Review the information before creating the new account."}
              </DialogDescription>
            </DialogHeader>

            {newAccountStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-name">Full name</Label>
                  <Input
                    id="new-name"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount((a) => ({ ...a, name: e.target.value }))
                    }
                    className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newAccount.email}
                    onChange={(e) =>
                      setNewAccount((a) => ({ ...a, email: e.target.value }))
                    }
                    className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select
                    value={newAccount.role}
                    onValueChange={(v) =>
                      setNewAccount((a) => ({ ...a, role: v }))
                    }
                  >
                    <SelectTrigger className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Name:</span> {newAccount.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {newAccount.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span> {newAccount.role}
                </p>
                <p className="text-gray-500 mt-2">
                  This is a mock flow and will not actually create a new login,
                  but mimics a real SaaS experience.
                </p>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                className="border-green-200"
                onClick={() => setCreatingAccount(false)}
              >
                Cancel
              </Button>
              {newAccountStep === 1 ? (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setNewAccountStep(2)}
                  disabled={!newAccount.name || !newAccount.email}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    toast.success("New account created (mock)")
                    setCreatingAccount(false)
                  }}
                >
                  Create account
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
