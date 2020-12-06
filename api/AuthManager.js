import jwt from './jwt'
import { findUser } from './models/User'

export function signInUser ({
  login,
  code
}) {
  const user = findUser({ login, code })

  return jwt.sign({
    uuid: user.uuid
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
