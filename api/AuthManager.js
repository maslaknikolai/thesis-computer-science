import db from './dbProvider'
import jwt from './jwt'

export function SignInUser ({
  login,
  code
}) {
  const users = db.getData('/users')
  const user = users.find(user => user.login === login && user.code === code)

  return jwt.sign({
    login: user.login,
    type: user.type
  })
}
