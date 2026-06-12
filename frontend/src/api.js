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

// Em caso de token inválido/expirado (401), encerra a sessão e
// redireciona para o login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
