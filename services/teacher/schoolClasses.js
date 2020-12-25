export default {
  list ($axios) {
    return $axios.get('/api/teacher/classes')
      .then(response => response.data.data)
  },
  show (axios, uuid) {
    return axios.get(`api/teacher/classes/${uuid}`)
      .then(response => response.data.data)
  }
}
