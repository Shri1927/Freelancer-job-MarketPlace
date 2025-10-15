import { Link } from "react-router-dom"
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
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

          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Browse Talent
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Find Work
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
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
