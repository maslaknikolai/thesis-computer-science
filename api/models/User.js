import db from '../dbProvider'

function createTeacher (data) {
  return {
    uuid: data.uuid,
    login: data.login,
    type: data.type
  }
}

function createStudent (data) {
  return {
    uuid: data.uuid,
    login: data.login,
    type: data.type,
    schoolClass: data.schoolClass,
    works: data.works
  }
}

function createUser (user) {
  if (user.type === 'student') {
    return createStudent(user)
  } else {
    return createTeacher(user)
  }
}

export function findUser (data) {
  const users = db.getData('/users')
  const user = users.find((userItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => userItem[key] === value
      )
  })

  if (!user) {
    return false
  }

  return createUser(user)
}
