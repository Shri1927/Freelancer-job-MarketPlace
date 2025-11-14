import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Briefcase, User, Building2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const SignUp = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Client fields
    companyName: "",
    industry: "",
    companySize: "",
    // Freelancer fields
    skills: "",
    hourlyRate: "",
    experienceLevel: "",
    portfolio: "",
    location: ""
  })

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match")
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!userType) {
        toast.error("Please select your user type")
        return
      }
      setStep(3)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Validate based on user type
    if (userType === "client") {
      if (!formData.companyName || !formData.industry || !formData.companySize) {
        toast.error("Please fill in all required fields")
        return
      }
    } else if (userType === "freelancer") {
      if (!formData.skills || !formData.hourlyRate || !formData.experienceLevel) {
        toast.error("Please fill in all required fields")
        return
      }
    }

    // Save user info to localStorage
    const userInfo = {
      name: formData.name,
      email: formData.email,
      userType: userType,
      ...(userType === "client"
        ? {
            companyName: formData.companyName,
            industry: formData.industry,
            companySize: formData.companySize
          }
        : {
            skills: formData.skills,
            hourlyRate: formData.hourlyRate,
            experienceLevel: formData.experienceLevel,
            location: formData.location,
            portfolio: formData.portfolio
          })
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
    localStorage.setItem("isAuthenticated", "true")

    toast.success("Account created successfully!")
    navigate("/dashboard")
  }

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={e =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <Button
            type="button"
            onClick={handleNext}
            className="w-full bg-gradient-primary hover:opacity-90"
          >
            Continue
          </Button>
        </div>
      )
    } else if (step === 2) {
      return (
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
                  id="client"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="client"
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
                  id="freelancer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="freelancer"
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

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-gradient-primary hover:opacity-90"
              disabled={!userType}
            >
              Continue
            </Button>
          </div>
        </div>
      )
    } else if (step === 3) {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          {userType === "client" ? (
            <>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={e =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={value =>
                    setFormData({ ...formData, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select
                  value={formData.companySize}
                  onValueChange={value =>
                    setFormData({ ...formData, companySize: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="React, Node.js, TypeScript"
                  value={formData.skills}
                  onChange={e =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="50"
                  value={formData.hourlyRate}
                  onChange={e =>
                    setFormData({ ...formData, hourlyRate: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={value =>
                    setFormData({ ...formData, experienceLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                    <SelectItem value="expert">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={e =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio URL (optional)</Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={e =>
                    setFormData({ ...formData, portfolio: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              Create Account
            </Button>
          </div>
        </form>
      )
    }
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
            {step === 1 && "Create Account"}
            {step === 2 && "Choose Your Role"}
            {step === 3 && userType === "client" ? "Client Information" : "Freelancer Information"}
          </h1>
          <p className="text-muted-foreground">
            {step === 1 && "Join FreelanceHub today"}
            {step === 2 && "Tell us about yourself"}
            {step === 3 && "Complete your profile"}
          </p>
          {step > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`h-2 w-2 rounded-full ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {renderStepContent()}

        {step === 1 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        )}
      </Card>
    </div>
  )
}

export default SignUp
