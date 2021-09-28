import axios from 'axios';
import TokenStorage from '../utils/TokenStorage';

const baseURL = process.env.REACT_APP_API_URL;

const conf = {
  baseURL,
  timeout: 8000,
};

const axiosWithoutToken = axios.create(conf);

const axiosWithToken = axios.create(conf);

axiosWithToken.interceptors.request.use(
  config => {
    const token = TokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const createAxiosResponseInterceptor = () => {
  const interceptor = axiosWithToken.interceptors.response.use(
    response => response,
    error => {
      const originalConfig = error.config;

      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case token refresh causes the 401 response
       */
      axiosWithToken.interceptors.response.eject(interceptor);
      const refreshToken = TokenStorage.getRefreshToken();

      return axiosWithToken
        .post('token/refresh/', {
          refresh: refreshToken,
        })
        .then(response => {
          TokenStorage.setAccessToken(response.data.access);
          TokenStorage.setRefreshToken(response.data.refresh);
          return axiosWithToken(originalConfig);
        })
        .catch(err => {
          TokenStorage.clear();
          window.location.replace('/accounts/login');
          return Promise.reject(err);
        })
        .finally(createAxiosResponseInterceptor);
    },
  );
};

createAxiosResponseInterceptor();

export { axiosWithoutToken };

export default axiosWithToken;
