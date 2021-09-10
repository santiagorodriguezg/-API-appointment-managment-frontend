import axiosWithToken from '../../libs/Axios';

export const AppointmentCreateService = (username, data) => {
  return axiosWithToken.post(`/users/${username}/appointments/`, data);
};

// export const AppointmentCreateService = (username, data) => {
//   const token = JSON.parse(localStorage.getItem('token')) || '';
//   return fetch(`${process.env.REACT_APP_API_URL}/users/${username}/appointments/`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
// };
