export default {
  list (axios) {
    return axios.get('/api/teacher/works')
      .then(response => response.data.data)
  },
  show (axios, workUUID) {
    return axios.get(`api/teacher/works/${workUUID}`)
      .then(response => response.data.data)
  },
  setScore (axios, workUUID, score) {
    return axios.post(`api/teacher/works/${workUUID}/set-score`, { score })
      .then(response => response.data.data)
  }
}
