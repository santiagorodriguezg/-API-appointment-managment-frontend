import axiosWithToken from '../../config/client/Axios';

export const AppointmentUserCreateService = (username, data) => {
  return axiosWithToken.post(`/users/${username}/appointments/`, data);
};

export const AppointmentUserListService = (username, params) => {
  return axiosWithToken.get(`/users/${username}/appointments/`, {
    params,
  });
};
