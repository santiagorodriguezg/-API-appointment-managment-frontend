import axiosWithToken from '../../config/client/Axios';
import { userRoles } from '../../config/utils/enums';

export const AppointmentUserCreateService = (username, data) => {
  return axiosWithToken.post(`/users/${username}/appointments/`, data);
};

export const AppointmentUserListService = (username, role, params) => {
  if (role === userRoles[0].value) {
    return axiosWithToken.get(`/appointments/`, {
      params,
    });
  }

  return axiosWithToken.get(`/users/${username}/appointments/`, {
    params,
  });
};
