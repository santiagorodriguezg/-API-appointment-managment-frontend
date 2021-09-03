import axiosInstance from '../../libs/NewHttpClient';

export const GetMyProfileService = () => axiosInstance.get('users/me/');

export const UpdateMyProfileService = data => axiosInstance.patch('users/me/', data);

export const PasswordChangeService = data => axiosInstance.patch('users/password/change/', data);
