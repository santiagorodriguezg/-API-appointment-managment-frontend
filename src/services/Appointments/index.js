import axiosWithToken from '../../libs/Axios';

export const AppointmentUserCreateService = (username, data) => {
  return axiosWithToken.post(`/users/${username}/appointments/`, data);
};

export const AppointmentUserListService = (username, params) => {
  return axiosWithToken.get(`/users/${username}/appointments/`, {
    params,
  });
};
