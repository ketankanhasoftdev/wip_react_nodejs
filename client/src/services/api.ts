import axios from 'axios';

const jwtAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      // Optionally dispatch an action on token expiration
      // store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
