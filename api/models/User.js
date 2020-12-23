import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'

function createTeacher ({
  uuid,
  login,
  type
}) {
  return {
    uuid,
    login,
    type
  }
}

function createStudent ({
  uuid,
  login,
  name,
  type,
  schoolClass
}) {
  return {
    uuid,
    login,
    name,
    type,
    schoolClass,

    getSchoolClass () {
      return findSchoolClass({ uuid: schoolClass })
    }
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
