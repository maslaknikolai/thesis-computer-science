import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'

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
    name: data.name,
    type: data.type,
    schoolClass: findSchoolClass({ uuid: data.schoolClass }),
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
