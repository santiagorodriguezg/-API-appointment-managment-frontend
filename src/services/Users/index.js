import axiosInstance from '../../libs/NewHttpClient';

export const GetMyProfileService = () => axiosInstance.get('users/me/');

export const UpdateMyProfileService = data => axiosInstance.patch('users/me/', data);
