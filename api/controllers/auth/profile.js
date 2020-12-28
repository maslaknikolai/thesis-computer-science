import getCurrentUser from '@/middlewares/getCurrentUser'

export default async function getUser (req, res) {
  const user = await getCurrentUser(req)

  if (!user) {
    res.status(422)
    return res.json({
      message: 'Пользователь не найден'
    })
  }

  if (user.type === 'student') {
    return res.json({
      user: {
        uuid: user.uuid,
        name: user.name,
        type: user.type,
        login: user.login,
        schoolClass: (() => {
          const { uuid, name } = user.getSchoolClass()
          return {
            uuid,
            name
          }
        })()
      }
    })
  }

  res.json({
    user: {
      uuid: user.uuid,
      type: user.type,
      login: user.login
    }
  })
}
