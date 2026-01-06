import MilestoneCard from './MilestoneCard';

const MilestoneList = ({
  milestones,
  selectedMilestoneId,
  onSelectMilestone,
  currency,
}) => {
  return (
    <div className="bg-card/30 rounded-2xl p-4 border border-border/30">
      <h2 className="font-display font-semibold text-lg text-foreground mb-4 px-1">
        Milestones
      </h2>
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <MilestoneCard
              milestone={milestone}
              isSelected={selectedMilestoneId === milestone.id}
              onSelect={() => onSelectMilestone(milestone.id)}
              currency={currency}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneList;