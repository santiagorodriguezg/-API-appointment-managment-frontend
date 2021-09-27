import axiosWithToken from '../../config/client/Axios';

export const GetMyProfileService = () => axiosWithToken.get('users/me/');

export const UpdateMyProfileService = data => axiosWithToken.patch('users/me/', data);

export const PasswordChangeService = data => axiosWithToken.patch('users/password/change/', data);

export const PasswordResetService = username => axiosWithToken.get(`users/${username}/password/reset/`);

export const UsersListService = params => {
  return axiosWithToken.get('users/', {
    params,
  });
};

export const UsersDetailService = username => {
  return axiosWithToken.get(`users/${username}/`);
};
