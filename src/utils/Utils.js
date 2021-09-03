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
