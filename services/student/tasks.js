export default {
  index (axios) {
    return axios.get('/api/student/my-tasks')
      .then(response => response.data.data)
  },
  show (axios, uuid) {
    return axios.get(`/api/student/my-tasks/${uuid}`)
      .then(response => response.data.data)
  },
  submitWork (axios, formData, taskUUID) {
    return axios.post(`/api/student/my-tasks/${taskUUID}`, formData)
  }
}
