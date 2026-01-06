// These interfaces are removed in JavaScript since JS doesn't have interfaces
// The types would be inferred at runtime based on usage

// If you need to document the expected structure, you could add JSDoc comments:
/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} avatar
 * @property {number} rating
 * @property {boolean} online
 * @property {string} lastSeen
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} conversationId
 * @property {string} senderId
 * @property {string} content
 * @property {Date} timestamp
 * @property {'sent' | 'delivered' | 'read'} status
 * @property {'text' | 'file' | 'image' | 'voice' | 'payment'} type
 * @property {Object} [attachment]
 * @property {string} attachment.name
 * @property {string} attachment.size
 * @property {string} attachment.url
 * @property {string} attachment.type
 * @property {Object} [paymentRequest]
 * @property {number} paymentRequest.amount
 * @property {string} paymentRequest.currency
 * @property {'pending' | 'paid' | 'declined'} paymentRequest.status
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {Client} client
 * @property {string} lastMessage
 * @property {Date} lastMessageTime
 * @property {number} unreadCount
 * @property {string} project
 * @property {boolean} isFavorite
 * @property {boolean} isArchived
 * @property {boolean} isGroup
 * @property {Message[]} messages
 */

/**
 * @typedef {Object} Call
 * @property {string} id
 * @property {string} conversationId
 * @property {string} clientName
 * @property {string} clientAvatar
 * @property {'incoming' | 'outgoing' | 'missed'} type
 * @property {'voice' | 'video'} callType
 * @property {string} time
 * @property {string} date
 * @property {string} [duration]
 */

/**
 * @typedef {'all' | 'unread' | 'favorites' | 'groups' | 'archived'} FilterTab
 */

// Or you could simply remove the interfaces entirely and rely on runtime validation
// or PropTypes if using React

// Alternative: Create validation schemas if needed
export const clientSchema = {
  id: 'string',
  name: 'string',
  avatar: 'string',
  rating: 'number',
  online: 'boolean',
  lastSeen: 'string'
};

export const messageSchema = {
  id: 'string',
  conversationId: 'string',
  senderId: 'string',
  content: 'string',
  timestamp: 'object',
  status: ['sent', 'delivered', 'read'],
  type: ['text', 'file', 'image', 'voice', 'payment'],
  attachment: 'object?',
  paymentRequest: 'object?'
};

// Export the JSDoc types if you want them to be available in other files
/**
 * @typedef {import('./types').Client} Client
 * @typedef {import('./types').Message} Message
 * @typedef {import('./types').Conversation} Conversation
 * @typedef {import('./types').Call} Call
 * @typedef {import('./types').FilterTab} FilterTab
 */