import jsonToFormData from 'json-form-data'
import createValidationError from '@/utils/createValidationError'

export default {
  list (axios) {
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
      .catch(createValidationError)
  },

  remove (axios, uuid) {
    return axios.delete(`/api/teacher/tasks/${uuid}`)
  }
}
