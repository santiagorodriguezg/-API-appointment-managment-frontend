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
