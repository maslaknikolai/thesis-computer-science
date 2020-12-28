import getCurrentUser from '@/middlewares/getCurrentUser'

export default async function getUser (req, res) {
  const user = await getCurrentUser(req)

  if (!user) {
    res.status(422)
    return res.json({
      message: 'Пользователь не найден'
    })
  }

  res.json({ user })
}
