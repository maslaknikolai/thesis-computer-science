export default {
  list (axios) {
    return axios.get('/api/teacher/works')
      .then(response => response.data.data)
  }
}
