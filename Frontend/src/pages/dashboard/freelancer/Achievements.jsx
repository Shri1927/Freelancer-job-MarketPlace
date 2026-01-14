import { useState, useMemo } from 'react';
import { Trophy, Star, Award, Target, TrendingUp, DollarSign, Users } from 'lucide-react';
import { AchievementStatsCard } from '@/components/achievements/AchievementStatsCard';
import { AchievementFilters } from '@/components/achievements/AchievementFilters';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { AchievementDetailsModal } from '@/components/achievements/AchievementDetailsModal';

const Achievements = () => {
  // Mock achievements data - Replace with API calls
  const [achievements] = useState([
    // Earned Achievements
    {
      id: '1',
      title: 'First Project Completed',
      description: 'Successfully completed your first project on the platform. This is just the beginning of your journey!',
      category: 'projects',
      icon: 'Trophy',
      status: 'earned',
      earnedDate: '2023-01-15T10:00:00Z',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Easy',
      rarity: 'Common',
      rewards: [{ type: 'badge', description: 'First Project Badge' }],
      requirements: [
        { description: 'Complete 1 project', completed: true },
      ],
    },
    {
      id: '2',
      title: 'Top Rated Freelancer',
      description: 'Maintained a 4.8+ rating across 20+ completed projects. Your quality work speaks for itself!',
      category: 'ratings',
      icon: 'Star',
      status: 'earned',
      earnedDate: '2023-06-20T10:00:00Z',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Medium',
      rarity: 'Rare',
      rewards: [
        { type: 'badge', description: 'Top Rated Badge' },
        { type: 'points', description: '500 Points' },
      ],
      requirements: [
        { description: 'Maintain 4.8+ rating', completed: true },
        { description: 'Complete 20+ projects', completed: true },
      ],
    },
    {
      id: '3',
      title: '100 Projects Milestone',
      description: 'Reached the impressive milestone of 100 completed projects. You are a true professional!',
      category: 'milestones',
      icon: 'Target',
      status: 'earned',
      earnedDate: '2024-01-10T10:00:00Z',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Hard',
      rarity: 'Epic',
      rewards: [
        { type: 'badge', description: 'Century Badge' },
        { type: 'points', description: '1000 Points' },
      ],
      requirements: [
        { description: 'Complete 100 projects', completed: true },
      ],
    },
    {
      id: '4',
      title: 'Earned $10,000',
      description: 'Crossed the $10,000 earnings milestone. Your hard work is paying off!',
      category: 'earnings',
      icon: 'DollarSign',
      status: 'earned',
      earnedDate: '2024-02-01T10:00:00Z',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Medium',
      rarity: 'Rare',
      rewards: [
        { type: 'badge', description: 'Money Maker Badge' },
      ],
      requirements: [
        { description: 'Earn $10,000 total', completed: true },
      ],
    },
    {
      id: '5',
      title: '25 Clients Served',
      description: 'Successfully worked with 25 different clients. Building lasting relationships!',
      category: 'milestones',
      icon: 'Users',
      status: 'earned',
      earnedDate: '2024-02-05T10:00:00Z',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Easy',
      rarity: 'Common',
      rewards: [
        { type: 'badge', description: 'Network Builder Badge' },
      ],
      requirements: [
        { description: 'Work with 25 clients', completed: true },
      ],
    },
    // In Progress Achievements
    {
      id: '6',
      title: '5-Star Rating Streak',
      description: 'Maintain a perfect 5-star rating across 10 consecutive projects.',
      category: 'ratings',
      icon: 'Star',
      status: 'in_progress',
      progress: 8,
      target: 10,
      createdDate: '2024-01-01T10:00:00Z',
      difficulty: 'Hard',
      rarity: 'Epic',
      rewards: [
        { type: 'badge', description: 'Perfect Streak Badge' },
        { type: 'points', description: '750 Points' },
      ],
      requirements: [
        { description: 'Get 5-star rating 8/10 times', completed: false },
      ],
    },
    {
      id: '7',
      title: '50 Clients Served',
      description: 'Build your reputation by working with 50 different clients.',
      category: 'milestones',
      icon: 'Users',
      status: 'in_progress',
      progress: 42,
      target: 50,
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Medium',
      rarity: 'Rare',
      rewards: [
        { type: 'badge', description: 'Client Master Badge' },
      ],
      requirements: [
        { description: 'Work with 42/50 clients', completed: false },
      ],
    },
    {
      id: '8',
      title: 'Earned $25,000',
      description: 'Reach the $25,000 earnings milestone and join the elite earners club.',
      category: 'earnings',
      icon: 'DollarSign',
      status: 'in_progress',
      progress: 18500,
      target: 25000,
      createdDate: '2024-01-01T10:00:00Z',
      difficulty: 'Hard',
      rarity: 'Rare',
      rewards: [
        { type: 'badge', description: 'Elite Earner Badge' },
        { type: 'points', description: '1500 Points' },
      ],
      requirements: [
        { description: 'Earn $18,500/$25,000', completed: false },
      ],
    },
    {
      id: '9',
      title: '10 Projects in a Month',
      description: 'Complete 10 projects within a single month. Show your dedication!',
      category: 'projects',
      icon: 'Target',
      status: 'in_progress',
      progress: 6,
      target: 10,
      createdDate: '2024-02-01T10:00:00Z',
      difficulty: 'Hard',
      rarity: 'Epic',
      rewards: [
        { type: 'badge', description: 'Monthly Champion Badge' },
      ],
      requirements: [
        { description: 'Complete 6/10 projects this month', completed: false },
      ],
    },
    // Locked Achievements
    {
      id: '10',
      title: '200 Projects Milestone',
      description: 'Reach the extraordinary milestone of 200 completed projects.',
      category: 'milestones',
      icon: 'Trophy',
      status: 'locked',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Very Hard',
      rarity: 'Legendary',
      requirements: [
        { description: 'Complete 100 projects first', completed: true },
        { description: 'Complete 200 projects', completed: false },
      ],
      rewards: [
        { type: 'badge', description: 'Legendary Badge' },
        { type: 'points', description: '2500 Points' },
      ],
    },
    {
      id: '11',
      title: 'Earned $50,000',
      description: 'Join the top tier earners by reaching $50,000 in total earnings.',
      category: 'earnings',
      icon: 'TrendingUp',
      status: 'locked',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Very Hard',
      rarity: 'Legendary',
      requirements: [
        { description: 'Earn $25,000 first', completed: false },
        { description: 'Earn $50,000 total', completed: false },
      ],
      rewards: [
        { type: 'badge', description: 'Millionaire Path Badge' },
        { type: 'points', description: '3000 Points' },
      ],
    },
    {
      id: '12',
      title: '100 Clients Served',
      description: 'Build an impressive network by working with 100 different clients.',
      category: 'milestones',
      icon: 'Users',
      status: 'locked',
      createdDate: '2023-01-01T10:00:00Z',
      difficulty: 'Very Hard',
      rarity: 'Epic',
      requirements: [
        { description: 'Work with 50 clients first', completed: false },
        { description: 'Work with 100 clients', completed: false },
      ],
      rewards: [
        { type: 'badge', description: 'Network Master Badge' },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewFilter, setViewFilter] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = achievements.length;
    const earned = achievements.filter((a) => a.status === 'earned').length;
    const inProgress = achievements.filter((a) => a.status === 'in_progress').length;
    const locked = achievements.filter((a) => a.status === 'locked').length;
    const completionRate = total > 0 ? Math.round((earned / total) * 100) : 0;

    return {
      total,
      earned,
      inProgress,
      locked,
      completionRate,
    };
  }, [achievements]);

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    // Filter by view (status tabs)
    if (viewFilter !== 'all') {
      filtered = filtered.filter((a) => a.status === viewFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((a) => a.category === categoryFilter);
    }

    // Filter by status (additional filter)
    if (statusFilter !== 'all') {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description?.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query)
      );
    }

    // Sort: earned first, then in progress, then locked
    filtered.sort((a, b) => {
      const statusOrder = { earned: 0, in_progress: 1, locked: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    return filtered;
  }, [achievements, searchQuery, categoryFilter, statusFilter, viewFilter]);

  return (
    <div className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Achievements
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your milestones and accomplishments
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 md:mb-8">
          <AchievementStatsCard
            totalAchievements={stats.total}
            earnedAchievements={stats.earned}
            inProgressAchievements={stats.inProgress}
            completionRate={stats.completionRate}
          />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <AchievementFilters
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            statusFilter={statusFilter}
            viewFilter={viewFilter}
            onSearchChange={setSearchQuery}
            onCategoryFilterChange={setCategoryFilter}
            onStatusFilterChange={setStatusFilter}
            onViewFilterChange={setViewFilter}
            totalAchievements={filteredAchievements.length}
            earnedCount={stats.earned}
            inProgressCount={stats.inProgress}
            lockedCount={stats.locked}
          />
        </div>

        {/* Achievements Grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onView={setSelectedAchievement}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Trophy className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No achievements found
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Complete projects to unlock achievements'}
            </p>
          </div>
        )}

        {/* Achievement Details Modal */}
        <AchievementDetailsModal
          achievement={selectedAchievement}
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      </div>
    </div>
  );
};

export default Achievements;










