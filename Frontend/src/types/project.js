/**
 * @typedef {'paid' | 'in-escrow' | 'pending' | 'requested'} MilestoneStatus
 */

/**
 * @typedef {Object} Milestone
 * @property {number} id
 * @property {string} title
 * @property {number} amount
 * @property {MilestoneStatus} status
 * @property {string} dueDate
 */
export {};

/**
 * @typedef {'client-brief' | 'reference' | 'deliverable' | 'feedback'} FileType
 */

/**
 * @typedef {Object} ProjectFile
 * @property {number} id
 * @property {string} name
 * @property {FileType} type
 * @property {string} date
 * @property {string} size
 * @property {string} [url]
 */

/**
 * @typedef {'freelancer' | 'client'} Sender
 */

/**
 * @typedef {Object} Message
 * @property {number} id
 * @property {Sender} sender
 * @property {string} content
 * @property {string} timestamp
 * @property {boolean} read
 */

/**
 * @typedef {'pending' | 'in-progress' | 'completed'} TaskStatus
 * @typedef {'high' | 'medium' | 'low'} Priority
 */

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {TaskStatus} status
 * @property {string} [dueDate]
 * @property {Priority} priority
 */

/**
 * @typedef {Object} Client
 * @property {string} name
 * @property {string} avatar
 * @property {number} rating
 * @property {number} totalProjects
 * @property {string} responseTime
 * @property {string} location
 * @property {string} memberSince
 */

/**
 * @typedef {'in-progress' | 'pending-review' | 'completed' | 'on-hold'} ProjectStatus
 * @typedef {'on-track' | 'needs-attention' | 'at-risk'} HealthStatus
 */

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {Client} client
 * @property {string} deadline
 * @property {ProjectStatus} status
 * @property {number} progress
 * @property {number} budget
 * @property {number} paid
 * @property {number} hoursSpent
 * @property {number} hoursEstimated
 * @property {Priority} priority
 * @property {HealthStatus} healthStatus
 * @property {string} lastActivity
 * @property {number} unreadMessages
 * @property {string[]} skills
 * @property {string[]} requirements
 * @property {string[]} deliverables
 * @property {Milestone[]} milestones
 * @property {ProjectFile[]} files
 * @property {Message[]} messages
 * @property {Task[]} tasks
 * @property {string} category
 */

/**
 * @typedef {'deadline' | 'payment' | 'message' | 'work' | 'approval'} NotificationType
 * @typedef {'urgent' | 'warning' | 'info'} NotificationLevel
 */

/**
 * @typedef {Object} Notification
 * @property {number} id
 * @property {NotificationType} type
 * @property {NotificationLevel} level
 * @property {string} title
 * @property {string} message
 * @property {number} [projectId]
 * @property {string} timestamp
 * @property {boolean} read
 */

/**
 * @typedef {'credit' | 'pending' | 'escrow'} TransactionType
 */

/**
 * @typedef {Object} Transaction
 * @property {number} id
 * @property {TransactionType} type
 * @property {number} amount
 * @property {string} projectTitle
 * @property {string} date
 */

/**
 * @typedef {Object} TimerState
 * @property {boolean} isRunning
 * @property {number|null} projectId
 * @property {string} projectTitle
 * @property {number|null} startTime
 * @property {number} elapsed
 */
