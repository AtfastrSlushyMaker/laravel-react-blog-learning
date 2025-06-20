import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const postsAPI = {
  getAllPosts: () => api.get('/posts'),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
};
export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  getCurrentUser: () => api.get('/users/me'),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  registerUser: (userData) => api.post('/users/', userData),
};