import { signInUser } from '@/AuthManager'

export default function login (req, res) {
  const {
    login,
    password
  } = req.body

  if (!login || !password) {
    res.status(422)
    return res.json({
      errors: {
        login: ['Заполните поле "логин" и поле "пароль"'],
        password: ['Заполните поле "логин" и поле "пароль"']
      }
    })
  }

  const token = signInUser({ login, password })

  if (!token) {
    res.status(422)
    return res.json({
      message: 'Пользователь не найден'
    })
  }

  res.json({ token })
}
