export default {
  fetchKnown ($axios) {
    return $axios.get('/api/teacher/known-school-classes')
      .then(response => response.data.data)
  }
}
