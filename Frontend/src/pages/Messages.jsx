import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: "Client", text: "Hi, thanks for your proposal. Can we discuss timeline?" },
    { id: 2, from: "Freelancer", text: "Sure! I can deliver first milestone in 2 weeks." }
  ])
  const [input, setInput] = useState("")

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), from: "You", text: input.trim() }])
    setInput("")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Chat/Interview before hire</p>
        </div>

        <Card className="p-6 max-w-3xl">
          <div className="space-y-3 mb-4 max-h-[420px] overflow-auto">
            {messages.map(m => (
              <div key={m.id} className={`p-3 rounded-md ${m.from === "You" ? "bg-primary/10 ml-auto max-w-[80%]" : "bg-secondary/50 max-w-[80%]"}`}>
                <p className="text-xs text-muted-foreground mb-1">{m.from}</p>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Type a message" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <Button onClick={send}>Send</Button>
          </div>
        </Card>

        <div className="max-w-3xl mt-6 flex gap-3">
          <Button variant="outline" onClick={() => (window.location.href = "/contract")}>Create Contract</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Messages


