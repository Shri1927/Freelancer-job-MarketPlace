import {
  Phone,
  Video,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  RotateCcw,
  FileText
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip"

export function CallsHistory({ calls }) {
  // Group calls by date
  const groupedCalls = calls.reduce((acc, call) => {
    if (!acc[call.date]) {
      acc[call.date] = []
    }
    acc[call.date].push(call)
    return acc
  }, {})

  const getCallIcon = (type, callType) => {
    if (type === "missed") {
      return <PhoneMissed className="h-4 w-4 text-red-500" />
    }
    if (type === "incoming") {
      return callType === "video" ? (
        <Video className="h-4 w-4 text-status-online" />
      ) : (
        <PhoneIncoming className="h-4 w-4 text-status-online" />
      )
    }
    return callType === "video" ? (
      <Video className="h-4 w-4 text-primary" />
    ) : (
      <PhoneOutgoing className="h-4 w-4 text-primary" />
    )
  }

  const getCallLabel = type => {
    switch (type) {
      case "incoming":
        return "Incoming"
      case "outgoing":
        return "Outgoing"
      case "missed":
        return "Missed"
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border-l border-border">
      {/* Header */}
      <div className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Calls History</h2>
        </div>
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {Object.entries(groupedCalls).map(([date, dateCalls]) => (
          <div key={date}>
            <div className="px-4 py-2 bg-secondary/50">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {date}
              </span>
            </div>
            <div className="divide-y divide-border">
              {dateCalls.map(call => (
                <div
                  key={call.id}
                  className="p-4 hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={call.clientAvatar}
                        alt={call.clientName}
                      />
                      <AvatarFallback>
                        {call.clientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {call.clientName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {getCallIcon(call.type, call.callType)}
                        <span
                          className={cn(
                            "text-xs",
                            call.type === "missed"
                              ? "text-status-missed"
                              : "text-muted-foreground"
                          )}
                        >
                          {getCallLabel(call.type)}
                        </span>
                        {call.duration && (
                          <span className="text-xs text-muted-foreground">
                            ({call.duration})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {call.time}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Call back</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add note</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Phone className="h-4 w-4" />
          Start Voice Call
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Video className="h-4 w-4" />
          Start Video Call
        </Button>
      </div>
    </div>
  )
}
