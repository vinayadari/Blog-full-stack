import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: data => api.post('/auth/register', data),
  login: data => api.post('/auth/login', data),
}

export const blogsAPI = {
  create: data => api.post('/blogs', data),
  getAll: () => api.get('/blogs'),
  getById: id => api.get(`/blogs/${id}`),
  update: (id, data) => api.patch(`/blogs/${id}`, data),
  delete: id => api.delete(`/blogs/${id}`),
  enhance: (id, data) => api.post(`/blogs/enhance/${id}`, data),
}

export const feedAPI = {
  getFeed: (page = 1) => api.get(`/feed?page=${page}`),
}

export const likesAPI = {
  toggleLike: id => api.post(`/blogs/likes/${id}/like`),
}

export const commentsAPI = {
  getComments: blogId => api.get(`/comments/${blogId}`),
  createComment: (blogId, data) => api.post(`/comments/${blogId}`, data),
  updateComment: (commentId, data) => api.patch(`/comments/${commentId}`, data),
  deleteComment: commentId => api.delete(`/comments/${commentId}`),
}

export default api
