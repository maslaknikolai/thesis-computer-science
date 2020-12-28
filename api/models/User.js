import { v4 as uuidv4 } from 'uuid'
import passwordHash from 'password-hash'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'
import { getAllWorks } from './Work'

function updateUserData (workUUID, data) {
  const index = db.getIndex('/users', workUUID, 'uuid')
  let userRaw = db.getData(`/users[${index}]`)

  userRaw = { ...userRaw, ...data }

  db.push(`/users[${index}]`, userRaw, true)
}

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
    },

    setLogin (login) {
      updateUserData(uuid, { login })
      this.login = login
    },

    setName (name) {
      updateUserData(uuid, { name })
      this.name = name
    },

    setSchoolClassUUID (schoolClassUUID) {
      updateUserData(uuid, { schoolClassUUID })
      this.schoolClassUUID = schoolClassUUID
    },

    setPassword (password) {
      updateUserData(uuid, { password: passwordHash.generate(password) })
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

export function storeStudent ({
  name,
  login,
  password,
  schoolClassUUID
}) {
  const student = {
    uuid: uuidv4(),
    name,
    login,
    password: passwordHash.generate(password),
    schoolClassUUID,
    type: 'student'
  }

  db.push('/users[]', student, true)

  return createUser(student)
}
