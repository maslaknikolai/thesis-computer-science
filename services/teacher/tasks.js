import jsonToFormData from 'json-form-data'

export default {
  table (axios) {
    return axios.get('/api/teacher/tasks')
      .then(response => response.data.data)
  },

  show (axios, uuid) {
    return axios.get(`/api/teacher/tasks/${uuid}`)
      .then(response => response.data.data)
  },

  store (axios, formData) {
    const requestBody = jsonToFormData(formData)

    return axios.post('/api/teacher/tasks', requestBody, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .catch((error) => {
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
      })
  }
}
