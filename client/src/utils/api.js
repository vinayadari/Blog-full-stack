const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5500/api";

const getToken = () => {
  return localStorage.getItem("blog_token");
};

const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export async function register(name, email, password) {
  return apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email, password) {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getBlogs() {
  const data = await apiCall("/blogs");
  return data.blogs || [];
}

export async function createBlog({ title, content, tags = [] }) {
  const data = await apiCall("/blogs", {
    method: "POST",
    body: JSON.stringify({ title, content, tags }),
  });
  return data.blog;
}

export async function updateBlog(id, { title, content, tags }) {
  const data = await apiCall(`/blogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, content, tags }),
  });
  return data.blog;
}

export async function deleteBlog(id) {
  await apiCall(`/blogs/${id}`, {
    method: "DELETE",
  });
  return true;
}

export async function getFeed(page = 1) {
  return apiCall(`/feed?page=${page}`);
}

export async function toggleLike(blogId) {
  return apiCall(`/blogs/likes/${blogId}/like`, {
    method: "POST",
  });
}

export async function getComments(blogId) {
  const data = await apiCall(`/blogs/${blogId}/comments`);
  return data.comments || [];
}

export async function addComment(blogId, content) {
  const data = await apiCall(`/blogs/${blogId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
  return data.comment;
}

export async function deleteComment(blogId, commentId) {
  await apiCall(`/blogs/${blogId}/comments/${commentId}`, {
    method: "DELETE",
  });
  return true;
}
