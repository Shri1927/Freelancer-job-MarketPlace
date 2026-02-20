import PageHeader from "@/components/client/PageHeader"
import { MessagesLayout } from "@/components/messages/MessagesLayout"

const ClientMessages = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Chat with freelancers about your projects and proposals."
      />

      <div className="rounded-lg border border-green-200 bg-white overflow-hidden">
        <MessagesLayout />
      </div>
    </div>
  )
}

export default ClientMessages

