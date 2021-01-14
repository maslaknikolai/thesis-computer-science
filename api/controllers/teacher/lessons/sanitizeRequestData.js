export default function sanitizeRequestData (requestBody) {
  const body = {
    name: requestBody.name,
    date: requestBody.date,
    duration: requestBody.duration,
    forSchoolClasses: requestBody.forSchoolClasses
  }

  return body
}
