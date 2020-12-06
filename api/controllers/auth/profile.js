import getCurrentUser from '../../middlewares/getCurrentUser'

export default async function getUser (req, res) {
  const user = await getCurrentUser(req)

  if (!user) {
    return res.json({
      message: 'Пользователь не найден'
    })
  }

  res.json({ user })
}
