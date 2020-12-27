export default function createValidationError (error) {
  if (error.response && error.response.data && error.response.data.errors) {
    return Promise.reject(
      Object.assign(
        new Error('Validation error'),
        {
          messages: error.response.data.errors
        }
      )
    )
  }

  return Promise.reject(error)
}
