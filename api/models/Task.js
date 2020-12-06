import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'

// function createTask ({
//   uuid,
//   name,
//   file,
//   type,
//   questions,
//   user
// }) {
//   return {
//     uuid,
//     name,
//     file,
//     type,
//     questions,
//     user
//   }
// }

export function storeTask ({
  name,
  file,
  type,
  forSchoolClasses,
  questions,
  user
}) {
  const task = {
    uuid: uuidv4(),
    name,
    file,
    type,
    forSchoolClasses,
    questions,
    user: user.uuid
  }

  db.push('/tasks[]', task, true)

  return task
}
