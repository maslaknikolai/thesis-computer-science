export default function sanitizeRequestData (requestBody) {
  const body = {
    name: requestBody.name,
    schoolClassUUID: requestBody.schoolClassUUID,
    login: requestBody.login,
    password: requestBody.password
  }

  return body
}
