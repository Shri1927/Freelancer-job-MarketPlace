// Enums as string constants
export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const MilestoneStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAID: 'paid'
};

export const PaymentStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const DeliveryStatus = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  REVISION_REQUESTED: 'revision_requested',
  APPROVED: 'approved'
};

export const WorkPhaseStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  BLOCKED: 'blocked'
};

export const ExternalLinkType = {
  GOOGLE_DRIVE: 'google_drive',
  DROPBOX: 'dropbox',
  FIGMA: 'figma',
  GITHUB: 'github',
  OTHER: 'other'
};

// Helper function to create type-like validation (optional)
export function validateTaskStatus(status) {
  return Object.values(TaskStatus).includes(status);
}

export function validateTaskPriority(priority) {
  return Object.values(TaskPriority).includes(priority);
}

export function validateMilestoneStatus(status) {
  return Object.values(MilestoneStatus).includes(status);
}

export function validatePaymentStatus(status) {
  return Object.values(PaymentStatus).includes(status);
}

export function validateDeliveryStatus(status) {
  return Object.values(DeliveryStatus).includes(status);
}

export function validateWorkPhaseStatus(status) {
  return Object.values(WorkPhaseStatus).includes(status);
}

export function validateExternalLinkType(type) {
  return Object.values(ExternalLinkType).includes(type);
}

// Classes representing the interfaces
export class DeliveryFile {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.size = data.size || 0;
    this.type = data.type || '';
    this.url = data.url || '';
    this.version = data.version || 1;
    this.uploadedAt = data.uploadedAt || new Date().toISOString();
    this.folder = data.folder;
  }
}

export class DeliveryFolder {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.fileCount = data.fileCount || 0;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

export class PhaseDeliverable {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.completed = data.completed || false;
    this.fileIds = data.fileIds || [];
  }
}

export class WorkPhase {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.status = validateWorkPhaseStatus(data.status) ? data.status : WorkPhaseStatus.NOT_STARTED;
    this.order = data.order || 0;
    this.deliverables = (data.deliverables || []).map(d => new PhaseDeliverable(d));
    this.completedAt = data.completedAt;
  }
}

export class ExternalLink {
  constructor(data) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.url = data.url || '';
    this.type = validateExternalLinkType(data.type) ? data.type : ExternalLinkType.OTHER;
  }
}

export class Delivery {
  constructor(data) {
    this.id = data.id || '';
    this.milestoneId = data.milestoneId || '';
    this.status = validateDeliveryStatus(data.status) ? data.status : DeliveryStatus.DRAFT;
    this.files = (data.files || []).map(f => new DeliveryFile(f));
    this.links = (data.links || []).map(l => new ExternalLink(l));
    this.notes = data.notes || '';
    this.submittedAt = data.submittedAt;
    this.approvedAt = data.approvedAt;
    this.revisionNotes = data.revisionNotes;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

export class Payment {
  constructor(data) {
    this.id = data.id || '';
    this.milestoneId = data.milestoneId || '';
    this.amount = data.amount || 0;
    this.status = validatePaymentStatus(data.status) ? data.status : PaymentStatus.PENDING;
    this.method = data.method;
    this.transactionId = data.transactionId;
    this.paidAt = data.paidAt;
    this.createdAt = data.createdAt || new Date().toISOString();
  }
}

export class Task {
  constructor(data) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.status = validateTaskStatus(data.status) ? data.status : TaskStatus.PENDING;
    this.priority = validateTaskPriority(data.priority) ? data.priority : TaskPriority.MEDIUM;
    this.dueDate = data.dueDate || new Date().toISOString();
    this.milestoneId = data.milestoneId || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.completedAt = data.completedAt;
  }
}

export class Milestone {
  constructor(data) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.amount = data.amount || 0;
    this.status = validateMilestoneStatus(data.status) ? data.status : MilestoneStatus.PENDING;
    this.dueDate = data.dueDate || new Date().toISOString();
    this.tasks = (data.tasks || []).map(t => new Task(t));
    this.delivery = data.delivery ? new Delivery(data.delivery) : undefined;
    this.payment = data.payment ? new Payment(data.payment) : undefined;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.completedAt = data.completedAt;
  }
}

export class Project {
  constructor(data) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.clientName = data.clientName || '';
    this.milestones = (data.milestones || []).map(m => new Milestone(m));
    this.totalAmount = data.totalAmount || 0;
    this.currency = data.currency || 'USD';
  }
}

// Utility functions for type checking (optional)
export const TypeGuards = {
  isTaskStatus: (value) => Object.values(TaskStatus).includes(value),
  isTaskPriority: (value) => Object.values(TaskPriority).includes(value),
  isMilestoneStatus: (value) => Object.values(MilestoneStatus).includes(value),
  isPaymentStatus: (value) => Object.values(PaymentStatus).includes(value),
  isDeliveryStatus: (value) => Object.values(DeliveryStatus).includes(value),
  isWorkPhaseStatus: (value) => Object.values(WorkPhaseStatus).includes(value),
  isExternalLinkType: (value) => Object.values(ExternalLinkType).includes(value),
  
  isDeliveryFile: (obj) => obj instanceof DeliveryFile || (obj && typeof obj.id === 'string'),
  isTask: (obj) => obj instanceof Task || (obj && typeof obj.title === 'string' && typeof obj.milestoneId === 'string'),
  isMilestone: (obj) => obj instanceof Milestone || (obj && typeof obj.title === 'string' && typeof obj.amount === 'number'),
  isProject: (obj) => obj instanceof Project || (obj && typeof obj.title === 'string' && typeof obj.clientName === 'string')
};

// Export all as a single object if preferred
export default {
  TaskStatus,
  TaskPriority,
  MilestoneStatus,
  PaymentStatus,
  DeliveryStatus,
  WorkPhaseStatus,
  ExternalLinkType,
  
  DeliveryFile,
  DeliveryFolder,
  PhaseDeliverable,
  WorkPhase,
  ExternalLink,
  Delivery,
  Payment,
  Task,
  Milestone,
  Project,
  
  TypeGuards,
  
  // Validation functions
  validateTaskStatus,
  validateTaskPriority,
  validateMilestoneStatus,
  validatePaymentStatus,
  validateDeliveryStatus,
  validateWorkPhaseStatus,
  validateExternalLinkType
};