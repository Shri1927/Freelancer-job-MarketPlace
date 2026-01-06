// Import the constants from the models file
// Adjust the import path as needed for your project structure
import { 
  MilestoneStatus, 
  TaskStatus, 
  TaskPriority 
} from '../types/milestone';

/**
 * Get color class/token for milestone status
 * @param {string} status - Milestone status
 * @returns {string} Color identifier
 */
export const getMilestoneStatusColor = (status) => {
  // Validate status is valid
  if (!Object.values(MilestoneStatus).includes(status)) {
    return 'secondary';
  }
  
  switch (status) {
    case MilestoneStatus.PENDING:
      return 'pending';
    case MilestoneStatus.ACTIVE:
      return 'active';
    case MilestoneStatus.COMPLETED:
      return 'completed';
    case MilestoneStatus.PAID:
      return 'paid';
    default:
      return 'secondary';
  }
};

/**
 * Get color class/token for task status
 * @param {string} status - Task status
 * @returns {string} Color identifier
 */
export const getTaskStatusColor = (status) => {
  // Validate status is valid
  if (!Object.values(TaskStatus).includes(status)) {
    return 'secondary';
  }
  
  switch (status) {
    case TaskStatus.PENDING:
      return 'pending';
    case TaskStatus.IN_PROGRESS:
      return 'active';
    case TaskStatus.COMPLETED:
      return 'completed';
    default:
      return 'secondary';
  }
};

/**
 * Get color class/token for task priority
 * @param {string} priority - Task priority
 * @returns {string} Color identifier
 */
export const getTaskPriorityColor = (priority) => {
  // Validate priority is valid
  if (!Object.values(TaskPriority).includes(priority)) {
    return 'secondary';
  }
  
  switch (priority) {
    case TaskPriority.HIGH:
      return 'destructive';
    case TaskPriority.MEDIUM:
      return 'warning-light';
    case TaskPriority.LOW:
      return 'secondary';
    default:
      return 'secondary';
  }
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  // Validate inputs
  if (typeof amount !== 'number' || isNaN(amount)) {
    amount = 0;
  }
  
  if (typeof currency !== 'string') {
    currency = 'USD';
  }
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback for invalid currency codes
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
};

/**
 * Format date string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  // Validate input
  if (!dateString || typeof dateString !== 'string') {
    return 'Invalid date';
  }
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a status string to readable label
 * @param {string} status - Status string (e.g., 'in_progress')
 * @returns {string} Formatted label (e.g., 'In Progress')
 */
export const formatStatusLabel = (status) => {
  if (!status || typeof status !== 'string') {
    return '';
  }
  
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Calculate progress percentage for a milestone based on its tasks
 * @param {Array} tasks - Array of task objects
 * @returns {number} Progress percentage (0-100)
 */
export const calculateMilestoneProgress = (tasks) => {
  // Validate input
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 0;
  }
  
  // Filter for completed tasks
  const completedTasks = tasks.filter((task) => {
    // Check if task has status property and it equals 'completed'
    return task && 
           typeof task === 'object' && 
           task.status === TaskStatus.COMPLETED;
  }).length;
  
  // Calculate percentage and round to nearest integer
  const percentage = (completedTasks / tasks.length) * 100;
  return Math.round(percentage);
};

/**
 * Format file size in bytes to human readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  // Validate input
  if (typeof bytes !== 'number' || bytes < 0) {
    return '0 B';
  }
  
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Ensure we don't go beyond available sizes
  const index = Math.min(i, sizes.length - 1);
  
  return parseFloat((bytes / Math.pow(k, index)).toFixed(1)) + ' ' + sizes[index];
};

/**
 * Format a date to relative time (e.g., "2 days ago", "in 3 hours")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return 'Invalid date';
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  // For future dates
  if (diffInSeconds < 0) {
    const futureDiff = Math.abs(diffInSeconds);
    
    if (futureDiff < 60) return 'in a few seconds';
    if (futureDiff < 3600) return `in ${Math.floor(futureDiff / 60)} minutes`;
    if (futureDiff < 86400) return `in ${Math.floor(futureDiff / 3600)} hours`;
    if (futureDiff < 2592000) return `in ${Math.floor(futureDiff / 86400)} days`;
    if (futureDiff < 31536000) return `in ${Math.floor(futureDiff / 2592000)} months`;
    return `in ${Math.floor(futureDiff / 31536000)} years`;
  }
  
  // For past dates
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') {
    return '??';
  }
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Format phone number (US format)
 * @param {string} phone - Phone number string
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the number looks like a US phone number
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  }
  
  // Return original if not 10 digits
  return phone;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Generate a random ID
 * @param {number} length - Length of ID (default: 8)
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
};

// Export all utility functions
export default {
  getMilestoneStatusColor,
  getTaskStatusColor,
  getTaskPriorityColor,
  formatCurrency,
  formatDate,
  formatStatusLabel,
  calculateMilestoneProgress,
  formatFileSize,
  formatRelativeTime,
  getInitials,
  truncateText,
  isValidEmail,
  formatPhoneNumber,
  capitalizeWords,
  generateId,
  deepClone
};