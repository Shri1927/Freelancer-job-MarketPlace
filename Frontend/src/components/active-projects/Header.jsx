import { Search, Filter, Grid3X3, List, ChevronDown, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Header({
  projectCount,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange
}) {
  return (
    <header className="">
      <div className=" bg-gray-50">
       <div className="flex items-center justify-between pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Active Projects
              <span className="ml-2 text-[#2A6BFF]">({projectCount})</span>
            </h1>
            <p className="text-md text-gray-500 mt-2">
              Manage your ongoing work and track progress
            </p>
          </div>

        </div>
      </div>
      
      

        {/* Search and Filters Row */}
        <div className="flex items-center gap-3 bg-gray-50">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, clients..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A6BFF] focus:border-transparent text-sm"
            />
          </div>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-300">
                <Filter className="w-4 h-4" />
                {statusFilter === "all" ? "All Status" : statusFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusFilterChange("in-progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusFilterChange("pending-review")}
              >
                Pending Review
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusFilterChange("completed")}
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusFilterChange("on-hold")}>
                On Hold
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Priority Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-300">
                {priorityFilter === "all" ? "All Priority" : priorityFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem onClick={() => onPriorityFilterChange("all")}>
                All Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriorityFilterChange("high")}>
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onPriorityFilterChange("medium")}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPriorityFilterChange("low")}>
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
            <button
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-[#2A6BFF] text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "list"
                  ? "bg-[#2A6BFF] text-white"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
    </header>
  )
}
