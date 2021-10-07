const getName = (array, value) => array.find(obj => obj.value === value)?.text;
const getValue = (array, text) => array.find(obj => obj.text === text)?.value;

export const userRoles = [
  {
    text: 'Administrador',
    value: 'ADMIN',
  },
  {
    text: 'Doctor',
    value: 'DOC',
  },
  {
    text: 'Usuario',
    value: 'USR',
  },
];

const roleColors = ['green', 'blue', 'purple'];

export const getRoleName = value => getName(userRoles, value);
export const getRoleValue = text => getValue(userRoles, text);
export const getRoleColor = value => roleColors[userRoles.indexOf(userRoles.find(obj => obj.value === value))];

export const identificationTypes = [
  {
    text: 'Cédula de Ciudadanía',
    value: 'CC',
  },
  {
    text: 'Cédula de Extranjería',
    value: 'CE',
  },
  {
    text: 'Nit',
    value: 'NIT',
  },
];

export const getIdentificationTypeName = value => getName(identificationTypes, value);
export const getIdentificationTypeValue = text => getValue(identificationTypes, text);

export const appointmentTypes = [
  {
    text: 'Psicosocial',
    value: 'PSY',
  },
  {
    text: 'Jurídica',
    value: 'LEG',
  },
];

const appointmentTypesColors = ['green', 'geekblue'];

export const getAppointmentTypeName = value => getName(appointmentTypes, value);
export const getAppointmentTypeValue = text => getValue(appointmentTypes, text);
export const getAppointmentTypeColor = value => {
  return appointmentTypesColors[appointmentTypes.indexOf(appointmentTypes.find(obj => obj.value === value))];
};

export const appointmentMultimedia = [
  {
    text: 'Imagen',
    value: 'IMG',
  },
  {
    text: 'Archivo PDF',
    value: 'PDF',
  },
  {
    text: 'Video',
    value: 'VIDEO',
  },
];

export const getAppointmentMultimediaName = value => getName(appointmentMultimedia, value);
export const getAppointmentMultimediaValue = text => getValue(appointmentMultimedia, text);
