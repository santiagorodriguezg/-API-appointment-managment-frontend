import { axiosWithoutToken } from '../../config/client/Axios';

export const LoginService = data => axiosWithoutToken.post('login/', data);

export const LogoutService = data => axiosWithoutToken.post('logout/', data);

export const SignupService = data => axiosWithoutToken.post('signup/', data);

export const PasswordResetService = data => axiosWithoutToken.post('password/reset/', data);

export const PasswordResetCompleteService = data => axiosWithoutToken.patch('password/reset/complete/', data);

export const VerifyTokenService = data => axiosWithoutToken.post('token/verify/', data);

export const RefreshTokenService = data => axiosWithoutToken.post('token/refresh/', data);
