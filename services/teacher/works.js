export default {
  list (axios) {
    return axios.get('/api/teacher/works')
      .then(response => response.data.data)
  },
  show (axios, studentUUID, taskUUID) {
    return axios.get(`api/teacher/works/${studentUUID}/${taskUUID}`)
      .then(response => response.data.data)
  }
}
