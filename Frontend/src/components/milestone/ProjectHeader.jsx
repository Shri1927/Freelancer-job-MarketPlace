import { Briefcase, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/milestoneUtils';

const ProjectHeader = ({ project }) => {
  const completedMilestones = project.milestones.filter(
    (m) => m.status === 'completed' || m.status === 'paid'
  ).length;
  const totalTasks = project.milestones.reduce((acc, m) => acc + m.tasks.length, 0);
  const completedTasks = project.milestones.reduce(
    (acc, m) => acc + m.tasks.filter((t) => t.status === 'completed').length,
    0
  );
  const earnedAmount = project.milestones
    .filter((m) => m.status === 'paid')
    .reduce((acc, m) => acc + m.amount, 0);

  const stats = [
    {
      label: 'Total Value',
      value: formatCurrency(project.totalAmount, project.currency),
      icon: DollarSign,
      color: 'text-[#2A6BFF]',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Earned',
      value: formatCurrency(earnedAmount, project.currency),
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-accent/30',
    },
    {
      label: 'Milestones',
      value: `${completedMilestones}/${project.milestones.length}`,
      icon: Briefcase,
      color: 'text-[#2A6BFF]',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Tasks Done',
      value: `${completedTasks}/${totalTasks}`,
      icon: Calendar,
      color: 'text-success',
      bgColor: 'bg-accent/30',
    },
  ];

  return (
    <header className="animate-fade-in">
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground mb-1">Project</p>
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          Client: <span className="font-medium text-foreground">{project.clientName}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl p-4 transition-all duration-300 shadow-sm border border-border/90 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default ProjectHeader;