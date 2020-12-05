import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config'

export default {
  sign: (data) => {
    return jwt.sign({ data }, JWT_SECRET, { expiresIn: '1h' })
  },
  verify: (data) => {
    return new Promise((resolve, reject) => {
      jwt.verify(data, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err)
        }

        resolve(decoded)
      })
    })
  }
}
