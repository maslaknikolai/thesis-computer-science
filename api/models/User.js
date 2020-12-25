import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'
import { getAllWorks } from './Work'

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
  schoolClassUUID
}) {
  return {
    uuid,
    login,
    name,
    type,
    schoolClassUUID,

    getSchoolClass () {
      return findSchoolClass({ uuid: schoolClassUUID })
    },

    getWorks () {
      return getAllWorks()
        .filter(work => work.studentUUID === uuid)
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

export function allStudents () {
  const users = db.getData('/users')
    .filter(student => student.type === 'student')

  return users.map(createUser)
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
