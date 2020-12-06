import { signInUser } from '../../AuthManager'

export default function login (req, res) {
  const {
    login,
    code
  } = req.body

  if (!login || !code) {
    res.status(422)
    return res.json({
      errors: {
        login: ['Заполните поле "логин" и поле "код"'],
        code: ['Заполните поле "логин" и поле "код"']
      }
    })
  }

  const token = signInUser({ login, code })

  res.json({ token })
}
