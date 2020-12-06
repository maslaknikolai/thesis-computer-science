export default {
  fetchKnown ($axios) {
    return $axios.get('/api/known-school-classes')
      .then(response => response.data.data)
  }
}
