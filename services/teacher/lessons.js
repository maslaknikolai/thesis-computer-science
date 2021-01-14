import createValidationError from '@/utils/createValidationError'

export default {
  list (axios) {
    return axios.get('/api/teacher/lessons')
      .then(response => response.data.data)
  },
  show (axios, lessonUUID) {
    return axios.get(`api/teacher/lessons/${lessonUUID}`)
      .then(response => response.data.data)
  },
  store (axios, formData) {
    return axios.post('api/teacher/lessons', {
      name: formData.name,
      date: new Date(formData.date),
      duration: formData.duration,
      forSchoolClasses: formData.forSchoolClasses
    })
      .catch(createValidationError)
  },
  update (axios, lessonUUID, formData) {
    return axios.put(`api/teacher/lessons/${lessonUUID}`, {
      name: formData.name,
      date: new Date(formData.date),
      duration: formData.duration,
      forSchoolClasses: formData.forSchoolClasses
    })
      .catch(createValidationError)
  },
  remove (axios, uuid) {
    return axios.delete(`/api/teacher/lessons/${uuid}`)
  }
}
