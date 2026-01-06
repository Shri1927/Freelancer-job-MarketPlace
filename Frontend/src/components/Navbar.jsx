import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Briefcase, Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../store/auth"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, signOut } = useAuthStore()

  const isActive = path => location.pathname === path

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/jobs", label: "Find Jobs" },
    { path: "/post-job", label: "Post Job" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contracts", label: "Contracts" }

  ]

  const handleSignOut = () => {
    signOut()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center transition-transform duration-300 hover:rotate-6">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FreelanceHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                  isActive(link.path) ? "text-primary" : "text-foreground/60"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="px-3 py-2 text-sm font-medium text-foreground border border-input rounded-md bg-background" 
                />
                <Link to="/role" state={{ mode: 'signin' }}>
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/role" state={{ mode: 'signup' }}>
                  <Button className="bg-gradient-primary hover:opacity-90 transition-all duration-300 hover:scale-105">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="px-3 py-2 text-sm font-medium text-foreground border border-input rounded-md bg-background" 
                />
                <Link to="/messages">
                  <Button variant="ghost" className={isActive('/messages') ? 'text-primary' : ''}>
                    Messages
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className={isActive('/profile') ? 'text-primary' : ''}>
                    Profile
                  </Button>
                </Link>
                <Link to={user?.role === 'client' ? "/dashboard/client" : "/dashboard/freelancer"}>
                  <Button variant="ghost" className={isActive('/dashboard') ? 'text-primary' : ''}>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-foreground/60 hover:text-primary"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) ? "text-primary" : "text-foreground/60"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="px-3 py-2 text-sm font-medium text-foreground border border-input rounded-md bg-background" 
                  />
                  <Link to="/role" state={{ mode: 'signin' }} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/role" state={{ mode: 'signup' }} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-primary">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="px-3 py-2 text-sm font-medium text-foreground border border-input rounded-md bg-background" 
                  />
                  <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Messages
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Profile
                    </Button>
                  </Link>
                  <Link 
                    to={user?.role === 'client' ? "/dashboard/client" : "/dashboard/freelancer"} 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-foreground/60 hover:text-primary"
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar