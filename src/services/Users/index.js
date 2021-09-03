import axiosWithToken from '../../libs/Axios';

export const GetMyProfileService = () => axiosWithToken.get('users/me/');

export const UpdateMyProfileService = data => axiosWithToken.patch('users/me/', data);

export const PasswordChangeService = data => axiosWithToken.patch('users/password/change/', data);
