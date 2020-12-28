import passwordHash from 'password-hash'
import db from './dbProvider'
import jwt from './jwt'
import { findUser } from './models/User'

export function signInUser ({
  login,
  password
}) {
  const users = db.getData('/users')
  const userRaw = users.find(userItem => userItem.login === login)

  if (!userRaw || !passwordHash.verify(password, userRaw.password)) {
    return null
  }

  return jwt.sign({
    uuid: userRaw.uuid
  })
}

export function getUserByToken (token) {
  return jwt.verify(token)
    .then(({ data }) => {
      const { uuid } = data
      const user = findUser({ uuid })

      return user
    })
    .catch(() => {
      return false
    })
}
