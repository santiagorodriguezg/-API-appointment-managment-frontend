import axiosInstance from '../../libs/NewHttpClient';

export const LoginService = data => axiosInstance.post('login/', data);

export const LogoutService = data => axiosInstance.post('logout/', data);

export const SignupService = data => axiosInstance.post('signup/', data);

export const PasswordResetService = data => axiosInstance.post('password/reset/', data);

export const PasswordResetCompleteService = data => axiosInstance.patch('password/reset/complete/', data);

export const VerifyTokenService = data => axiosInstance.post('token/verify/', data);

export const RefreshTokenService = data => axiosInstance.post('token/refresh/', data);
