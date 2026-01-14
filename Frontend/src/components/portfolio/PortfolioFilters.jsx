import { useState } from 'react';
import { Search, Filter, Grid3x3, List, X } from 'lucide-react';
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

export const PortfolioFilters = ({
  searchQuery = '',
  categoryFilter = 'all',
  skillFilter = 'all',
  viewMode = 'grid',
  categories = [],
  skills = [],
  onSearchChange,
  onCategoryFilterChange,
  onSkillFilterChange,
  onViewModeChange,
  totalProjects = 0,
}) => {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
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

          {/* Filters and View Mode */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Skill Filter */}
            {skills.length > 0 && (
              <Select value={skillFilter} onValueChange={onSkillFilterChange}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange?.('grid')}
                className="h-8"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange?.('list')}
                className="h-8"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(categoryFilter !== 'all' || skillFilter !== 'all' || searchQuery) && (
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
                Category: {categoryFilter}
                <button
                  onClick={() => onCategoryFilterChange?.('all')}
                  className="ml-1 hover:bg-muted rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {skillFilter !== 'all' && (
              <Badge variant="outline" className="gap-1">
                Skill: {skillFilter}
                <button
                  onClick={() => onSkillFilterChange?.('all')}
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
                onSkillFilterChange?.('all');
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
            Showing <span className="font-medium text-foreground">{totalProjects}</span> project{totalProjects !== 1 ? 's' : ''}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};









