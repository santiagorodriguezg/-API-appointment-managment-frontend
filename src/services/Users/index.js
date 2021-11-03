import axiosWithToken from '../../config/client/Axios';

export const GetMyProfileService = () => axiosWithToken.get('users/profile/');

export const UpdateMyProfileService = data => axiosWithToken.patch('users/profile/', data);

export const PasswordChangeService = data => axiosWithToken.patch('users/password/change/', data);

export const PasswordResetService = username => axiosWithToken.get(`users/${username}/password/reset/`);

export const UsersCreateService = data => axiosWithToken.post('users/', data);

export const UsersDetailService = username => axiosWithToken.get(`users/${username}/`);

export const UsersUpdateService = (username, data) => axiosWithToken.put(`users/${username}/`, data);

export const DoctorsListService = (params = {}) => axiosWithToken.get('users/doctors/', { params });

export const UsersListService = params => {
  return axiosWithToken.get('users/', {
    params,
  });
};
