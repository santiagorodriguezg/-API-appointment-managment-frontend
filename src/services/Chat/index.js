import axiosWithToken from '../../config/client/Axios';

export const GetMyChatsService = username => axiosWithToken.get(`users/${username}/rooms/`);

export const GetMyChatMessagesService = (username, room) => {
  return axiosWithToken.get(`users/${username}/rooms/${room}/messages`);
};
