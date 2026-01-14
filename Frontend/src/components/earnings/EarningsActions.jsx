import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
  Loader2,
  Check
} from "lucide-react"
import { toast } from "sonner"

const EarningsActions = () => {
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all-time")
  const [isDownloading, setIsDownloading] = useState(null)

  const handleDownload = async format => {
    setIsDownloading(format)

    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsDownloading(null)
    toast.success(`Earnings report downloaded as ${format.toUpperCase()}`, {
      description: "Check your downloads folder",
      icon: <Check className="w-4 h-4 text-success" />
    })
  }

  return (
    <Card className="border-border bg-card shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Actions & Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter Earnings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Payment Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Date Range
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Download Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleDownload("pdf")}
              disabled={isDownloading !== null}
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              {isDownloading === "pdf" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2 text-destructive" />
              )}
              Export as PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload("csv")}
              disabled={isDownloading !== null}
              className="border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              {isDownloading === "csv" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-4 h-4 mr-2 text-success" />
              )}
              Export as CSV
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2">
          <Button className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow">
            <Download className="w-4 h-4 mr-2" />
            Download Full Earnings Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EarningsActions
