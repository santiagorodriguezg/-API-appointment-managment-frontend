export const getFieldErrors = (res) => {
  const keys = Object.keys(res.data.errors)
  const errors = []

  keys.map(k => errors.push({
      name: k,
      errors: res.data.errors[k],
    }),
  )
  return errors
}
