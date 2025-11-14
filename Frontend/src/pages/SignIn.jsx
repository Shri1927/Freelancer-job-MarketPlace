import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Briefcase, User, Building2 } from "lucide-react"
import { toast } from "sonner"

const SignIn = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState("")
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleUserTypeSelect = () => {
    if (!userType) {
      toast.error("Please select your user type")
      return
    }
    setShowLoginForm(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    // Save user info to localStorage (in a real app, this would come from the API)
    const userInfo = {
      email: formData.email,
      userType: userType,
      name: formData.email.split("@")[0] // Temporary: use email prefix as name
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    localStorage.setItem("isAuthenticated", "true")

    toast.success(`Welcome back, ${userType === "client" ? "Client" : "Freelancer"}!`)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FreelanceHub
            </span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">
            {showLoginForm ? "Welcome Back" : "Sign In"}
          </h1>
          <p className="text-muted-foreground">
            {showLoginForm
              ? "Sign in to your account"
              : "Select your account type to continue"}
          </p>
        </div>

        {!showLoginForm ? (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">
                I am a...
              </Label>
              <RadioGroup
                value={userType}
                onValueChange={setUserType}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="client"
                    id="client-signin"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="client-signin"
                    className={`flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${
                      userType === "client"
                        ? "border-primary bg-accent"
                        : "border-muted"
                    }`}
                  >
                    <Building2 className="mb-3 h-6 w-6" />
                    <span className="font-semibold">Client</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">
                      Looking to hire freelancers
                    </span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="freelancer"
                    id="freelancer-signin"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="freelancer-signin"
                    className={`flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${
                      userType === "freelancer"
                        ? "border-primary bg-accent"
                        : "border-muted"
                    }`}
                  >
                    <User className="mb-3 h-6 w-6" />
                    <span className="font-semibold">Freelancer</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">
                      Looking for work opportunities
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="button"
              onClick={handleUserTypeSelect}
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={!userType}
            >
              Continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link to="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowLoginForm(false)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                Sign In
              </Button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}

export default SignIn
