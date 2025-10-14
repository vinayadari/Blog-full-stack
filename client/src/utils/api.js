const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5500';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth
  register: async (data) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Blogs
  getMyBlogs: async () => {
    const res = await fetch(`${API_URL}/api/blogs`, {
      headers: getAuthHeader(),
    });
    return res.json();
  },

  createBlog: async (data) => {
    const res = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateBlog: async (id, data) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteBlog: async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return res.json();
  },

  enhanceBlog: async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/enhance/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
    });
    return res.json();
  },

  // Feed
  getFeed: async (page = 1) => {
    const res = await fetch(`${API_URL}/api/feed?page=${page}`);
    return res.json();
  },

  // Likes
  toggleLike: async (id) => {
    const res = await fetch(`${API_URL}/api/blogs/likes/${id}/like`, {
      method: 'POST',
      headers: getAuthHeader(),
    });
    return res.json();
  },
};