import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, DollarSign, CheckCircle, X } from "lucide-react"

const BidCard = ({ bid, onAccept, onReject }) => {
  const getStatusBadge = () => {
    switch (bid.status) {
      case "accepted":
        return <Badge className="bg-accent">Accepted</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <Card className="p-6 hover:shadow-large transition-all duration-300 hover:scale-[1.02] animate-fade-in-up border-primary/20 hover:border-primary/40 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <img
            src={bid.freelancer.avatar}
            alt={bid.freelancer.name}
            className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:ring-2 group-hover:ring-primary"
          />
          <div>
            <h3 className="font-semibold text-lg mb-1">
              {bid.freelancer.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {bid.freelancer.rating}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                {bid.freelancer.completedProjects} projects
              </span>
            </div>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-accent" />
          <span className="font-semibold">{bid.amount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span>{bid.duration}</span>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 mb-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {bid.coverLetter}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Submitted on {new Date(bid.submittedDate).toLocaleDateString()}
        </p>

        {bid.status === "pending" && onAccept && onReject && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReject(bid.id)}
              className="gap-1"
            >
              <X className="w-4 h-4" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => onAccept(bid.id)}
              className="bg-gradient-accent gap-1"
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </Button>
            {/* Hire & Fund (demo) */}
            <a
              href={`/contract?jobId=${bid.jobId}&freelancerId=${bid.freelancer.id}&amount=${String(bid.amount).replace(/[^0-9.]/g,"")}`}
              className="inline-block"
            >
              <Button size="sm" className="bg-gradient-primary">Hire & Fund</Button>
            </a>
          </div>
        )}
      </div>
    </Card>
  )
}

export default BidCard
