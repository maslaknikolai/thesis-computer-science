import createValidationError from '@/utils/createValidationError'

export default {
  list ($axios) {
    return $axios.get('/api/teacher/classes')
      .then(response => response.data.data)
  },
  show (axios, uuid) {
    return axios.get(`api/teacher/classes/${uuid}`)
      .then(response => response.data.data)
  },
  store (axios, formData) {
    return axios.post('api/teacher/classes', formData)
      .catch(createValidationError)
  },
  update (axios, schoolClassUUID, formData) {
    return axios.put(`api/teacher/classes/${schoolClassUUID}`, formData)
      .catch(createValidationError)
  },
  remove (axios, uuid) {
    return axios.delete(`/api/teacher/classes/${uuid}`)
  }
}
