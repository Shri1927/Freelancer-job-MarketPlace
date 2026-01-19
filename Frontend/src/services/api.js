import api from '../lib/api';

// ==================== AUTHENTICATION ====================
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
};

// ==================== CLIENT PROFILE ====================
export const clientProfileAPI = {
  create: (data) => api.post('/client/profile', data),
};

// ==================== FREELANCER PROFILE ====================
export const freelancerProfileAPI = {
  update: (data) => api.post('/freelancer/profile', data),
  addSkill: (skill) => api.post('/freelancer/skills/add', { skill }),
  removeSkill: (skillId) => api.delete(`/freelancer/skills/remove/${skillId}`),
  addLanguage: (data) => api.post('/freelancer/language', data),
  addExperience: (data) => api.post('/freelancer/experience', data),
  deleteExperience: (id) => api.delete(`/freelancer/experience/${id}`),
  addEducation: (data) => api.post('/freelancer/education', data),
  deleteEducation: (id) => api.delete(`/freelancer/education/${id}`),
};

// ==================== JOBS ====================
export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getById: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  apply: (jobId, data) => api.post(`/jobs/${jobId}/apply`, data),
};

// ==================== PROPOSALS ====================
export const proposalsAPI = {
  listForJob: (jobId) => api.get(`/client/jobs/${jobId}/proposals`),
  accept: (proposalId) => api.post(`/proposals/${proposalId}/accept`),
  // Get freelancer's proposals (may need to add this endpoint)
  getMyProposals: () => api.get('/freelancer/proposals'),
};

// ==================== PROJECTS ====================
export const projectsAPI = {
  getClientProjects: () => api.get('/client/projects'),
  getFreelancerProjects: () => api.get('/freelancer/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  updateStatus: (id, status) => api.post(`/projects/${id}/status`, { status }),
  updateProgress: (id, progress) => api.post(`/projects/${id}/progress`, { progress }),
};

// ==================== PROJECT FILES ====================
export const projectFilesAPI = {
  upload: (projectId, formData) => api.post(`/projects/${projectId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  list: (projectId) => api.get(`/projects/${projectId}/files`),
  download: (fileId) => api.get(`/files/${fileId}/download`, { responseType: 'blob' }),
};

// ==================== MESSAGES ====================
export const messagesAPI = {
  send: (data) => api.post('/messages/send', data),
  getByProject: (projectId) => api.get(`/messages/${projectId}`),
  getUnreadCount: () => api.get('/messages/unread/count'),
};

// ==================== ACTIVITIES ====================
export const activitiesAPI = {
  getAll: (params) => api.get('/activities', { params }),
};

// ==================== PAYMENTS ====================
export const paymentsAPI = {
  pay: (projectId, data) => api.post(`/projects/${projectId}/pay`, data),
  getClientPayments: () => api.get('/client/payments'),
  getFreelancerPayments: () => api.get('/freelancer/payments'),
  getEarnings: () => api.get('/freelancer/earnings'),
  getTotalEarnings: () => api.get('/freelancer/earnings/total'),
};

// ==================== WITHDRAWALS ====================
export const withdrawalsAPI = {
  withdraw: (data) => api.post('/freelancer/withdraw', data),
  getHistory: () => api.get('/freelancer/withdrawals'),
};

// ==================== TRANSACTIONS ====================
export const transactionsAPI = {
  getAll: (params) => api.get('/freelancer/transactions', { params }),
  getSummary: () => api.get('/freelancer/transactions/summary'),
};

// ==================== DASHBOARDS ====================
export const dashboardsAPI = {
  getClientDashboard: () => api.get('/client/dashboard'),
  getClientProjectStatus: () => api.get('/client/dashboard/project-status'),
  getClientSpendingTrend: () => api.get('/client/dashboard/spending-trend'),
  getClientRecentProjects: () => api.get('/client/dashboard/recent-projects'),
  getFreelancerDashboard: () => api.get('/freelancer/dashboard'),
};

