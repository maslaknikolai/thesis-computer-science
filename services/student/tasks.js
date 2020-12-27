export default {
  index (axios) {
    return axios.get('/api/student/tasks')
      .then(response => response.data.data)
  },
  show (axios, uuid) {
    return axios.get(`/api/student/tasks/${uuid}`)
      .then(response => response.data.data)
  },
  submitWork (axios, formData, taskUUID) {
    return axios.post(`/api/student/tasks/${taskUUID}`, formData)
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          return Promise.reject(
            new Error(error.response.data.message)
          )
        }

        return Promise.reject(error)
      })
  }
}
