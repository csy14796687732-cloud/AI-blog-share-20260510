import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getBySlug: (slug) => api.get(`/posts/slug/${slug}`),
  getById: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts', data),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
  getCategories: () => api.get('/posts/meta/categories'),
};

export const projectsAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getBySlug: (slug) => api.get(`/projects/slug/${slug}`),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const commentsAPI = {
  get: (params) => api.get('/comments', { params }),
  create: (data) => api.post('/comments', data),
  getAll: (params) => api.get('/comments/admin', { params }),
  update: (id, data) => api.put(`/comments/${id}`, data),
  delete: (id) => api.delete(`/comments/${id}`),
};

export const subscribersAPI = {
  subscribe: (email) => api.post('/subscribers', { email }),
  unsubscribe: (email) => api.post('/subscribers/unsubscribe', { email }),
  getAll: () => api.get('/subscribers'),
};

export const siteAPI = {
  get: () => api.get('/site'),
  update: (data) => api.put('/site', data),
};

export const uploadAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
