export default function validateSaveRequest (requestBody, requestType = 'store') {
  let result = true
  const errors = {
    name: [],
    schoolClassUUID: [],
    login: [],
    password: []
  }

  if (!requestBody.name) {
    errors.name.push('Укажите ФИО обучающегося')
    result = false
  }

  if (!requestBody.schoolClassUUID) {
    errors.schoolClassUUID.push('Укажите в каком классе обучающийся')
    result = false
  }

  if (!requestBody.login) {
    errors.login.push('Укажите логин обучающегося')
    result = false
  }

  if (requestType === 'store' && !requestBody.password) {
    errors.password.push('Укажите пароль для кабинета обучающегося')
    result = false
  }

  return {
    result,
    errors
  }
}
