export default {
  index (axios) {
    return axios.get('/api/student/lessons')
      .then(response => response.data.data)
  },
  checkIn (axios, lessonUUID) {
    return axios.post(`/api/student/lessons/${lessonUUID}/check-in`)
  }
}
