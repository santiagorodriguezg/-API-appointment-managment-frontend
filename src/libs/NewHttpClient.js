import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`,
  timeout: 8000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('token')) || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalConfig = error.config;

    if (error.response.status === 401 && originalConfig.url === 'token/refresh/') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      const refreshToken = JSON.parse(localStorage.getItem('rf')) || '';
      if (refreshToken) {
        originalConfig._retry = true;

        try {
          const rs = await axiosInstance.post(`token/refresh/`, {
            refresh: refreshToken,
          });

          localStorage.setItem('token', JSON.stringify(rs.data.access));
          localStorage.setItem('rf', JSON.stringify(rs.data.refresh));

          return axiosInstance(originalConfig);
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('rf');
          localStorage.removeItem('username');
          localStorage.removeItem('role');
          window.location = '/accounts/login';
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
