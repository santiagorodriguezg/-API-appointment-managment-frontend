import crypto from 'crypto';
import { message, Upload } from 'antd';

export const IMAGE_EXTENSIONS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export const getFieldErrors = errs => {
  const keys = Object.keys(errs);
  const errors = [];

  keys.map(k =>
    errors.push({
      name: k,
      errors: errs[k],
    }),
  );
  return errors;
};

export const getFullDate = date => {
  return new Date(date).toLocaleDateString('es-co', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const getShortDate = date => {
  return new Date(date).toLocaleDateString('es-co', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const validateFileBeforeUpload = (fileTypes, file) => {
  const isAllowedFile = fileTypes.includes(file.type);
  if (!isAllowedFile) message.error(`${file.name} no es un archivo permitido`);
  return isAllowedFile ? false : Upload.LIST_IGNORE;
};

export const arraysEquals = (array1, array2) => {
  const array1Sorted = array1.slice().sort();
  const array2Sorted = array2.slice().sort();
  return array1.length === array2.length && array1Sorted.every((value, index) => value === array2Sorted[index]);
};

export const getChatLink = (user, rooms) => {
  let isNewChat = false;
  let roomName = null;

  rooms.forEach(room => {
    if (room?.user_owner?.username === user.username || room?.user_receiver?.username === user.username) {
      roomName = room.name;
    }
  });

  if (!roomName) {
    roomName = crypto.randomBytes(16).toString('hex');
    isNewChat = true;
  }

  return {
    pathname: `/chat/${roomName}`,
    state: {
      chatRoom: {
        roomName,
        username: user.username,
        title: user.full_name,
        avatar: user.picture,
        isNewChat,
      },
    },
  };
};
