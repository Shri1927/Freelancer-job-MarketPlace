import { Filter, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'projects', label: 'Projects' },
  { value: 'earnings', label: 'Earnings' },
  { value: 'ratings', label: 'Ratings' },
  { value: 'milestones', label: 'Milestones' },
  { value: 'skills', label: 'Skills' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'earned', label: 'Earned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'locked', label: 'Locked' },
];

export const AchievementFilters = ({
  searchQuery = '',
  categoryFilter = 'all',
  statusFilter = 'all',
  viewFilter = 'all',
  onSearchChange,
  onCategoryFilterChange,
  onStatusFilterChange,
  onViewFilterChange,
  totalAchievements = 0,
  earnedCount = 0,
  inProgressCount = 0,
  lockedCount = 0,
}) => {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* View Tabs */}
        <div className="mt-4 pt-4 border-t">
          <Tabs value={viewFilter} onValueChange={onViewFilterChange}>
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="all">
                All ({totalAchievements})
              </TabsTrigger>
              <TabsTrigger value="earned">
                Earned ({earnedCount})
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                In Progress ({inProgressCount})
              </TabsTrigger>
              <TabsTrigger value="locked">
                Locked ({lockedCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Active Filters */}
        {(categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="gap-1">
                Search: {searchQuery}
                <button
                  onClick={() => onSearchChange?.('')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {categoryFilter !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Category: {categoryOptions.find(o => o.value === categoryFilter)?.label}
                <button
                  onClick={() => onCategoryFilterChange?.('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {statusFilter !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Status: {statusOptions.find(o => o.value === statusFilter)?.label}
                <button
                  onClick={() => onStatusFilterChange?.('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSearchChange?.('');
                onCategoryFilterChange?.('all');
                onStatusFilterChange?.('all');
              }}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{totalAchievements}</span> achievement{totalAchievements !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};









