import createValidationError from '@/utils/createValidationError'

export default {
  list (axios) {
    return axios.get('/api/teacher/students')
      .then(response => response.data.data)
  },
  show (axios, studentUUID) {
    return axios.get(`api/teacher/students/${studentUUID}`)
      .then(response => response.data.data)
  },
  store (axios, formData) {
    return axios.post('api/teacher/students', formData)
      .catch(createValidationError)
  },
  update (axios, studentUUID, formData) {
    return axios.put(`api/teacher/students/${studentUUID}`, formData)
      .catch(createValidationError)
  },
  remove (axios, uuid) {
    return axios.delete(`/api/teacher/students/${uuid}`)
  }
}
