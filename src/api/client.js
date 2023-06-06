import axios from 'axios';
import { json } from 'react-router-dom';

window.config = JSON.stringify(process.env);


const client = axios.create({
   baseURL: process.env.REACT_APP_API_BASE_URL,
  
});

client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    return Promise.reject(error);
  },
);

export default client;

export const setAuthorizationHeader = async token => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

export const getMe = async () => {
  const url = '/api/auth/me';
  return await client.get(url);
};
