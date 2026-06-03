import api from './api';

export const authService = {
  register: async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      console.log('Register response:', response);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  getCurrentUser: () => api.get('/auth/me')
};

export const projectService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/projects', { params });
      console.log('Projects response:', response);
      return response;
    } catch (error) {
      console.error('Get projects error:', error);
      return { data: { data: [], total: 0 } };
    }
  },
  getById: (projectId) => api.get(`/projects/${projectId}`),
  create: (data) => api.post('/projects', data),
  update: (projectId, data) => api.patch(`/projects/${projectId}`, data),
  delete: (projectId) => api.delete(`/projects/${projectId}`)
};

export const issueService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/issues', { params });
      console.log('Issues response:', response);
      return response;
    } catch (error) {
      console.error('Get issues error:', error);
      return { data: { data: [], total: 0 } };
    }
  },
  getById: (issueId) => api.get(`/issues/${issueId}`),
  create: (data) => api.post('/issues', data),
  update: (issueId, data) => api.patch(`/issues/${issueId}`, data),
  delete: (issueId) => api.delete(`/issues/${issueId}`),
  assign: (issueId, userId) => api.patch(`/issues/${issueId}/assign`, { userId }),
  updateStatus: (issueId, status) => api.patch(`/issues/${issueId}/status`, { status })
};

export const commentService = {
  getAll: async (params) => {
    try {
      const response = await api.get('/comments', { params });
      return response;
    } catch (error) {
      console.error('Get comments error:', error);
      return { data: { data: [], total: 0 } };
    }
  },
  getById: (commentId) => api.get(`/comments/${commentId}`),
  create: (data) => api.post('/comments', data),
  delete: (commentId) => api.delete(`/comments/${commentId}`)
};

export const analyticsService = {
  getIssueAnalytics: async () => {
    try {
      const response = await api.get('/analytics/issues');
      console.log('Analytics response:', response);
      return response;
    } catch (error) {
      console.error('Get analytics error:', error);
      return { data: { data: { totalIssues: 0, openIssues: 0, inProgressIssues: 0, testingIssues: 0, resolvedIssues: 0, closedIssues: 0 } } };
    }
  },
  getProjectAnalytics: () => api.get('/analytics/projects'),
  getDeveloperAnalytics: () => api.get('/analytics/developers')
};
