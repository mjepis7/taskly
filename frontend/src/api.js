import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // A porta onde o seu motor está rodando
});

export default api;