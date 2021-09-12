import axios from 'axios';

const baseURL = `${process.env.REACT_APP_API_URL}/`;

const conf = {
  baseURL,
  timeout: 8000,
};

const axiosWithoutToken = axios.create(conf);

const axiosWithToken = axios.create(conf);

axiosWithToken.interceptors.request.use(
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

axiosWithToken.interceptors.response.use(
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
          const rs = await axiosWithToken.post('token/refresh/', {
            refresh: refreshToken,
          });

          localStorage.setItem('token', JSON.stringify(rs.data.access));
          localStorage.setItem('rf', JSON.stringify(rs.data.refresh));

          return axiosWithToken(originalConfig);
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('rf');
          localStorage.removeItem('role');
          localStorage.removeItem('username');
          localStorage.removeItem('name');
          window.location = '/accounts/login';
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);

export { axiosWithoutToken };

export default axiosWithToken;
