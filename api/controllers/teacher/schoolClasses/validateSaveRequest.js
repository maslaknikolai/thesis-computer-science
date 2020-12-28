export default function validateSaveRequest (requestBody) {
  let result = true
  const errors = {
    name: []
  }

  if (!requestBody.name) {
    errors.name.push('Укажите имя ученика')
    result = false
  }

  return {
    result,
    errors
  }
}
