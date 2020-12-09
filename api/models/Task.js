import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'
import calculateTaskScore from './calculateTaskScore'

export default function createTask ({
  uuid,
  name,
  file,
  type,
  forSchoolClasses,
  questions,
  user
}) {
  return {
    uuid,
    name,
    file,
    type,
    forSchoolClasses,
    questions,
    user,

    calculateTaskScore (answers) {
      return calculateTaskScore(this, answers)
    }
  }
}

export function findTask (data) {
  const tasks = db.getData('/tasks')
  const task = tasks.find((taskItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => taskItem[key] === value
      )
  })

  if (!task) {
    return false
  }

  return createTask(task)
}

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

  return createTask(task)
}
