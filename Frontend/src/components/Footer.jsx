import { Link } from "react-router-dom"
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20 animate-fade-in-up">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in-up">
            <Link to="/" className="flex items-center gap-2 mb-4 transition-all duration-300 hover:scale-105">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center transition-transform duration-300 hover:rotate-6">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FreelanceHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect with talented freelancers and find your next great
              project.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold mb-4 text-foreground">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Browse Talent
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-semibold mb-4 text-foreground">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Find Work
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-block hover:translate-x-1"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-semibold mb-4 text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
