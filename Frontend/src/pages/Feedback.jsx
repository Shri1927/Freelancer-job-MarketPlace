import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { toast } from "sonner"

const Feedback = () => {
  const [rating, setRating] = useState(0)
  const [notes, setNotes] = useState("")

  const submit = () => {
    if (rating === 0) return
    toast.success("Feedback submitted. Thank you!")
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Ratings & Feedback</h1>
          <p className="text-muted-foreground">Share your experience</p>
        </div>

        <Card className="p-6 max-w-xl">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Rate the freelancer</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <button key={i} onClick={() => setRating(i)} className={`p-2 rounded-md ${rating >= i ? "bg-yellow-100" : "bg-secondary/50"}`}>
                  <Star className={`w-5 h-5 ${rating >= i ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Feedback</p>
            <Textarea rows={5} placeholder="What went well? What can be improved?" value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div className="mt-4">
            <Button className="bg-gradient-primary" onClick={submit}>Submit Feedback</Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  )
}

export default Feedback


