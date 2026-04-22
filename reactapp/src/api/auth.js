import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});



export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
