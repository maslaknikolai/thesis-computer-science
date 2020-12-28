export default function validateSaveRequest (requestBody, requestType = 'store') {
  let result = true
  const errors = {
    name: [],
    schoolClassUUID: [],
    login: [],
    password: []
  }

  if (!requestBody.name) {
    errors.name.push('Укажите ФИО ученика')
    result = false
  }

  if (!requestBody.schoolClassUUID) {
    errors.schoolClassUUID.push('Укажите в каком классе ученик')
    result = false
  }

  if (!requestBody.login) {
    errors.login.push('Укажите логин ученика')
    result = false
  }

  if (requestType === 'store' && !requestBody.password) {
    errors.password.push('Укажите пароль для кабинета ученика')
    result = false
  }

  return {
    result,
    errors
  }
}
