import axios from 'axios';

// URL base da API
// Centraliza todas as requisições HTTP do frontend
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Adiciona automaticamente o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
