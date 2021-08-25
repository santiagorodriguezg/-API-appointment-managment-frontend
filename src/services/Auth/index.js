import { HttpClient } from '../../libs/HttpClient';

const api = HttpClient();

export const LoginService = data => api.post('login/', { body: data });

export const SignupService = data => api.post('signup/', { body: data });

export const PasswordResetService = data => api.post('password/reset/', { body: data });

export const PasswordResetCompleteService = data => api.patch('password/reset/complete/', { body: data });
