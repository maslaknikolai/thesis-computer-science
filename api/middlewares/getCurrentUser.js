import { getUserByToken } from '../AuthManager'

export default function getCurrentUser (req) {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split('Bearer ')[1]

  return getUserByToken(token)
}
