export default {
  list (axios) {
    return axios.get('/api/teacher/students')
      .then(response => response.data.data)
  },
  show (axios, workUUID) {
    return axios.get(`api/teacher/students/${workUUID}`)
      .then(response => response.data.data)
  }
}
