import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTodo, Package, DollarSign } from 'lucide-react';
import ProjectHeader from '@/components/milestone/ProjectHeader';
import MilestoneList from '@/components/milestone/MilestoneList';
import TaskPanel from '@/components/milestone/TaskPanel';
import DeliveryPanel from '@/components/milestone/DeliveryPanel';
import PaymentTracker from '@/components/milestone/PaymentTracker';
import { useMilestoneData } from '@/hooks/useMilestoneData';

const MilestonesPage = () => {
  const {
    project,
    workPhases,
    selectedMilestone,
    selectMilestone,
    updateTaskStatus,
    addTask,
    deleteTask,
    updateDelivery,
    updatePhaseStatus,
    updateDeliverableStatus,
    getAllFiles,
  } = useMilestoneData();

  const [activeTab, setActiveTab] = useState('tasks');

  const allFiles = getAllFiles();

  return (
    <div className="p-6  bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Project Header */}
        <ProjectHeader project={project} />

        {/* Main Content */}
        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row gap-6">
          {/* Milestone List */}
          <div className="lg:w-[380px] lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-auto">
            <MilestoneList
              milestones={project.milestones}
              selectedMilestoneId={selectedMilestone?.id || null}
              onSelectMilestone={selectMilestone}
              currency={project.currency}
            />
          </div>

          {/* Right Panel with Tabs */}
          <div className="flex-1 min-h-[500px] lg:min-h-[600px]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="tasks" className="gap-2">
                  <ListTodo className="h-4 w-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="delivery" className="gap-2">
                  <Package className="h-4 w-4" />
                  Delivery
                </TabsTrigger>
                <TabsTrigger value="payments" className="gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tasks" className="h-[calc(100%-60px)]">
                <TaskPanel
                  milestone={selectedMilestone}
                  currency={project.currency}
                  onTaskStatusChange={updateTaskStatus}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                />
              </TabsContent>

              <TabsContent value="delivery" className="h-[calc(100%-60px)]">
                {selectedMilestone ? (
                  <DeliveryPanel
                    milestone={selectedMilestone}
                    workPhases={workPhases}
                    allFiles={allFiles}
                    onDeliveryUpdate={updateDelivery}
                    onPhaseStatusUpdate={updatePhaseStatus}
                    onDeliverableToggle={updateDeliverableStatus}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-card/30 rounded-2xl border border-border/30 p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        Select a Milestone
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Choose a milestone to manage deliverables
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="payments" className="h-[calc(100%-60px)] overflow-auto">
                <PaymentTracker
                  milestones={project.milestones}
                  currency={project.currency}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestonesPage;