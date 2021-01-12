export default {
  list (axios) {
    return axios.get('/api/teacher/lessons')
      .then(response => response.data.data)
  }
}
