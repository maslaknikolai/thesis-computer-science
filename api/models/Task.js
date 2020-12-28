import { v4 as uuidv4 } from 'uuid'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'
import { getAllWorks } from './Work'

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

    getWorks () {
      return getAllWorks()
        .filter(work => work.taskUUID === uuid)
    },

    getSchoolClasses () {
      return forSchoolClasses.map(
        schoolClassUUID => findSchoolClass({ uuid: schoolClassUUID })
      )
    },

    remove () {
      const index = db.getIndex('/tasks', uuid, 'uuid')
      db.delete(`/tasks[${index}]`, true)

      const works = this.getWorks()
      works.forEach(work => work.remove())
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
    return null
  }

  return createTask(task)
}

export function allTasks () {
  const tasks = db.getData('/tasks')

  return tasks.map(createTask)
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
