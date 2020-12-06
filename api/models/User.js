import db from '../dbProvider'

function createUser (data) {
  return {
    uuid: data.uuid,
    login: data.login,
    type: data.type
  }
}

export function findUser (data) {
  const users = db.getData('/users')
  const user = users.find((userItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => userItem[key] === value
      )
  })

  if (!user) {
    return false
  }

  return createUser(user)
}
