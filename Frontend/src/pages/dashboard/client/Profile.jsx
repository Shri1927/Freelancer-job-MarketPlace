import { useState } from "react"
import { User, Building2, Users, Globe, UserPlus, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/client/PageHeader"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useUser } from "@/contexts/UserContext.jsx"
import { toast } from "sonner"

const Profile = () => {
  const { user, updateUser } = useUser()

  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [inviteLoading, setInviteLoading] = useState(false)

  const [companyOpen, setCompanyOpen] = useState(false)
  const [company, setCompany] = useState({
    name: user?.company || "Acme Solutions Pvt Ltd",
    industry: user?.companyIndustry || "Technology",
    size: user?.companySize || "11-50 employees",
  })

  const [transferOpen, setTransferOpen] = useState(false)
  const [transferEmail, setTransferEmail] = useState("")
  const [transferLoading, setTransferLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)


  const primaryEmail = user?.email || "not-set@example.com"
  const billingEmail = user?.billingEmail || primaryEmail

  const handleInvite = async () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address")
      return
    }
    setInviteLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      toast.success(`Invitation sent to ${inviteEmail} as ${inviteRole}`)
      setInviteOpen(false)
      setInviteEmail("")
      setInviteRole("member")
    } catch {
      toast.error("Failed to send invite (mock error)")
    } finally {
      setInviteLoading(false)
    }
  }

  const handleSaveCompany = async () => {
    updateUser?.({
      company: company.name,
      companyIndustry: company.industry,
      companySize: company.size,
      billingEmail,
    })
    toast.success("Company details updated")
    setCompanyOpen(false)
  }

  const handleTransferOwnership = async () => {
    if (!transferEmail) {
      toast.error("Please enter the new owner’s email")
      return
    }
    setTransferLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      toast.success(`Ownership transfer initiated to ${transferEmail}`)
      setTransferOpen(false)
      setTransferEmail("")
    } catch {
      toast.error("Failed to transfer ownership (mock error)")
    } finally {
      setTransferLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="Manage your account details and company information."
        actions={
         <Button
  variant="outline"
  className="border-green-200"
  onClick={() => setEditOpen(true)}
>
  Edit profile
</Button>

        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <User className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Account info</h3>
          </div>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="font-medium text-gray-900">
                {user?.name || "Unnamed account"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Email</dt>
              <dd className="font-medium text-gray-900">{primaryEmail}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Role</dt>
              <dd className="font-medium text-gray-900">
                {user?.role || "Client"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Company details</h3>
          </div>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm text-gray-500">Company</dt>
              <dd className="font-medium text-gray-900">
                {company.name || "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Industry</dt>
              <dd className="font-medium text-gray-900">
                {company.industry || "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Size</dt>
              <dd className="font-medium text-gray-900">
                {company.size || "Not set"}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg border border-green-200 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-50">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Company contacts</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <div>
              <dt className="text-sm text-gray-500">Primary</dt>
              <dd className="font-medium text-gray-900">{primaryEmail}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Billing</dt>
              <dd className="font-medium text-gray-900">{billingEmail}</dd>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>Time zone: UTC +05:30 (India)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setInviteOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite teammate
        </Button>
        <Button
          variant="outline"
          className="border-green-200"
          onClick={() => setCompanyOpen(true)}
        >
          <Building2 className="w-4 h-4 mr-2" />
          Manage company
        </Button>
        <Button
          variant="outline"
          className="border-green-200"
          onClick={() => setTransferOpen(true)}
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Transfer ownership
        </Button>
      </div>

      {/* Invite teammate dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="border-green-200">
          <DialogHeader>
            <DialogTitle>Invite teammate</DialogTitle>
            <DialogDescription>
              Send an invitation to collaborate on your FreelanceHub projects.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
                placeholder="teammate@example.com"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={inviteRole}
                onValueChange={(v) => setInviteRole(v)}
              >
                <SelectTrigger className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="billing">Billing only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-green-200"
              onClick={() => setInviteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleInvite}
              disabled={inviteLoading}
            >
              {inviteLoading ? "Sending..." : "Send invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage company dialog */}
      <Dialog open={companyOpen} onOpenChange={setCompanyOpen}>
        <DialogContent className="border-green-200">
          <DialogHeader>
            <DialogTitle>Manage company</DialogTitle>
            <DialogDescription>
              Update your company details. Changes are saved for this account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="company-name">Company name</Label>
              <Input
                id="company-name"
                value={company.name}
                onChange={(e) =>
                  setCompany((c) => ({ ...c, name: e.target.value }))
                }
                className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <Label htmlFor="company-industry">Industry</Label>
              <Input
                id="company-industry"
                value={company.industry}
                onChange={(e) =>
                  setCompany((c) => ({ ...c, industry: e.target.value }))
                }
                className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <Label htmlFor="company-size">Company size</Label>
              <Input
                id="company-size"
                value={company.size}
                onChange={(e) =>
                  setCompany((c) => ({ ...c, size: e.target.value }))
                }
                className="mt-1 border-green-200 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-green-200"
              onClick={() => setCompanyOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSaveCompany}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer ownership confirmation */}
      <AlertDialog open={transferOpen} onOpenChange={setTransferOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer ownership</AlertDialogTitle>
            <AlertDialogDescription>
              Transfer account and billing ownership to another teammate. This
              action can be reversed only by the new owner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3 py-2">
            <Label htmlFor="transfer-email">New owner email</Label>
            <Input
              id="transfer-email"
              type="email"
              value={transferEmail}
              onChange={(e) => setTransferEmail(e.target.value)}
              className="border-green-200 focus:ring-green-500 focus:border-green-500"
              placeholder="owner@example.com"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-green-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleTransferOwnership}
              disabled={transferLoading}
            >
              {transferLoading ? "Transferring..." : "Confirm transfer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
           <Dialog open={editOpen} onOpenChange={setEditOpen}>
  <DialogContent className="border-green-200">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Update your personal account information.
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <Label>Full name</Label>
        <Input
          className="mt-1 border-green-200"
          defaultValue={user?.name || ""}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          className="mt-1 border-green-200"
          defaultValue={user?.email || ""}
        />
      </div>
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        className="border-green-200"
        onClick={() => setEditOpen(false)}
      >
        Cancel
      </Button>
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      
    </div>
  )
}

export default Profile
