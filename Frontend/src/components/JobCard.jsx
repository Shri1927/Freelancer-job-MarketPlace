import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, FileText, Star, CheckCircle } from "lucide-react"

const JobCard = ({ job }) => {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="p-6 hover:shadow-large transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in-up border-primary/20 hover:border-primary/40 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-all duration-300 group-hover:translate-x-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job.budget}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.duration}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {job.proposals} proposals
              </span>
            </div>
          </div>
          <Badge variant="secondary">{job.category}</Badge>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skillsRequired.slice(0, 5).map(skill => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {job.client.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium">{job.client.name}</p>
                {job.client.verified && (
                  <CheckCircle className="w-3 h-3 text-accent" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{job.client.rating}</span>
                <span>• {job.client.totalJobs} jobs</span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {job.experienceLevel}
          </Badge>
        </div>
      </Card>
    </Link>
  )
}

export default JobCard
