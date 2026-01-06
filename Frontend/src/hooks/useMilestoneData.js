import { useState } from 'react';
import { mockProject, mockWorkPhases } from '@/data/mockDataaa';

export const useMilestoneData = () => {
  const [project, setProject] = useState(mockProject);
  const [workPhases, setWorkPhases] = useState(mockWorkPhases);
  const [selectedMilestone, setSelectedMilestone] = useState(
    mockProject.milestones.find((m) => m.status === 'active') || mockProject.milestones[0]
  );

  const updateTaskStatus = (milestoneId, taskId, newStatus) => {
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              tasks: milestone.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      status: newStatus,
                      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
                    }
                  : task
              ),
            }
          : milestone
      ),
    }));

    if (selectedMilestone?.id === milestoneId) {
      setSelectedMilestone((prev) =>
        prev
          ? {
              ...prev,
              tasks: prev.tasks.map((task) =>
                task.id === taskId
                  ? {
                      ...task,
                      status: newStatus,
                      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
                    }
                  : task
              ),
            }
          : null
      );
    }
  };

  const addTask = (milestoneId, task) => {
    const newTask = {
      ...task,
      id: `t${Date.now()}`,
      milestoneId,
      createdAt: new Date().toISOString(),
    };

    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, tasks: [...milestone.tasks, newTask] }
          : milestone
      ),
    }));

    if (selectedMilestone?.id === milestoneId) {
      setSelectedMilestone((prev) =>
        prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null
      );
    }
  };

  const deleteTask = (milestoneId, taskId) => {
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, tasks: milestone.tasks.filter((task) => task.id !== taskId) }
          : milestone
      ),
    }));

    if (selectedMilestone?.id === milestoneId) {
      setSelectedMilestone((prev) =>
        prev ? { ...prev, tasks: prev.tasks.filter((task) => task.id !== taskId) } : null
      );
    }
  };

  const updateDelivery = (milestoneId, delivery) => {
    setProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === milestoneId
          ? { ...milestone, delivery }
          : milestone
      ),
    }));

    if (selectedMilestone?.id === milestoneId) {
      setSelectedMilestone((prev) =>
        prev ? { ...prev, delivery } : null
      );
    }
  };

  const updatePhaseStatus = (phaseId, status) => {
    setWorkPhases((prev) =>
      prev.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              status,
              completedAt: status === 'completed' ? new Date().toISOString() : undefined,
            }
          : phase
      )
    );
  };

  const updateDeliverableStatus = (phaseId, deliverableId, completed) => {
    setWorkPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        
        const updatedDeliverables = phase.deliverables.map((d) =>
          d.id === deliverableId ? { ...d, completed } : d
        );
        
        // Auto-update phase status based on deliverables
        const allCompleted = updatedDeliverables.every((d) => d.completed);
        const someCompleted = updatedDeliverables.some((d) => d.completed);
        
        let newStatus = phase.status;
        if (allCompleted && phase.status !== 'completed') {
          // Keep as is - user needs to manually mark complete
        } else if (someCompleted && phase.status === 'not_started') {
          newStatus = 'in_progress';
        }
        
        return {
          ...phase,
          status: newStatus,
          deliverables: updatedDeliverables,
        };
      })
    );
  };

  const linkFileToDeliverable = (phaseId, deliverableId, fileId) => {
    setWorkPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        
        return {
          ...phase,
          deliverables: phase.deliverables.map((d) =>
            d.id === deliverableId
              ? { ...d, fileIds: [...(d.fileIds || []), fileId] }
              : d
          ),
        };
      })
    );
  };

  const unlinkFileFromDeliverable = (phaseId, deliverableId, fileId) => {
    setWorkPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        
        return {
          ...phase,
          deliverables: phase.deliverables.map((d) =>
            d.id === deliverableId
              ? { ...d, fileIds: (d.fileIds || []).filter((id) => id !== fileId) }
              : d
          ),
        };
      })
    );
  };

  const selectMilestone = (milestoneId) => {
    const milestone = project.milestones.find((m) => m.id === milestoneId);
    setSelectedMilestone(milestone || null);
  };

  // Get all files across all milestones
  const getAllFiles = () => {
    return project.milestones.flatMap((m) => m.delivery?.files || []);
  };

  return {
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
    linkFileToDeliverable,
    unlinkFileFromDeliverable,
    getAllFiles,
  };
};