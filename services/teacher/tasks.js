const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

async function createRequestBody (formData) {
  return {
    ...formData,
    file: formData.file ? await toBase64(formData.file) : formData.file
  }
}

export default {
  table (axios) {
    return axios.get('/api/teacher/tasks')
      .then(response => response.data.data)
  },

  show (axios, uuid) {
    return axios.get(`/api/teacher/tasks/${uuid}`)
      .then(response => response.data.data)
  },

  async store (axios, formData) {
    const requestBody = await createRequestBody(formData)

    return axios.post('/api/teacher/tasks', requestBody)
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
