// Interfaces do not have a direct equivalent in JavaScript.
// You can use JSDoc comments for type hinting if needed, or just use plain objects.

/**
 * @typedef {Object} ProfileInfo
 * @property {string} name
 * @property {string} title
 * @property {string} email
 * @property {string} phone
 * @property {string} location
 * @property {string[]} skills
 * @property {string} avatarUrl
 */

/**
 * @typedef {Object} WorkExperience
 * @property {string} id
 * @property {string} title
 * @property {string} company
 * @property {string} location
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} description
 */

/**
 * @typedef {Object} Education
 * @property {string} id
 * @property {string} degree
 * @property {string} institution
 * @property {string} field
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} description
 */

/**
 * @typedef {Object} Language
 * @property {string} id
 * @property {string} name
 * @property {'Native' | 'Conversational' | 'Basic'} proficiency
 */

/**
 * @typedef {Object} PersonalDetails
 * @property {string} dateOfBirth
 * @property {string} country
 * @property {string} streetAddress
 * @property {string} aptSuite
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 */

/**
 * @typedef {Object} Resume
 * @property {string} fileName
 * @property {string} fileUrl
 * @property {string} uploadedAt
 */