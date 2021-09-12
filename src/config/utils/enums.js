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

export const getRoleName = value => userRoles.find(obj => obj.value === value)?.text;
export const getRoleValue = text => userRoles.find(obj => obj.text === text)?.value;

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

export const getIdentificationTypeName = value => identificationTypes.find(obj => obj.value === value)?.text;
export const getIdentificationTypeValue = text => identificationTypes.find(obj => obj.text === text)?.value;

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

export const getAppointmentTypeName = value => appointmentTypes.find(obj => obj.value === value)?.text;
export const getAppointmentTypeValue = text => appointmentTypes.find(obj => obj.text === text)?.value;
export const getAppointmentTypeColor = value => {
  return appointmentTypesColors[appointmentTypes.indexOf(appointmentTypes.find(obj => obj.value === value))];
};
