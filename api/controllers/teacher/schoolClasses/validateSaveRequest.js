export default function validateSaveRequest (requestBody) {
  let result = true
  const errors = {
    name: []
  }

  if (!requestBody.name) {
    errors.name.push('Укажите ФИО обучающегося')
    result = false
  }

  return {
    result,
    errors
  }
}
