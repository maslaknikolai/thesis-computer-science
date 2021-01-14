export default function validateSaveRequest (requestBody, requestType = 'store') {
  let result = true
  const errors = {
    name: [],
    date: [],
    duration: [],
    forSchoolClasses: []
  }

  if (!requestBody.name) {
    errors.name.push('Укажите название урока')
    result = false
  }

  if (!requestBody.date) {
    errors.date.push('Укажите дату проведения')
    result = false
  }

  if (!requestBody.duration) {
    errors.duration.push('Укажите продолжительность')
    result = false
  }

  if (!requestBody.forSchoolClasses || !requestBody.forSchoolClasses.length) {
    errors.forSchoolClasses.push('Укажите для каких классов урок')
    result = false
  }

  return {
    result,
    errors
  }
}
