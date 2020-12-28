import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import db from '../dbProvider'
import { findSchoolClass } from './SchoolClass'
import { getAllWorks } from './Work'

function updateTaskData (taskUUID, data) {
  const index = db.getIndex('/tasks', taskUUID, 'uuid')
  let taskRaw = db.getData(`/tasks[${index}]`)

  taskRaw = { ...taskRaw, ...data }

  db.push(`/tasks[${index}]`, taskRaw, true)
}

export default function createTask ({
  uuid,
  name,
  file,
  type,
  forSchoolClasses,
  questions,
  user,
  createdAt
}) {
  return {
    uuid,
    name,
    file,
    type,
    forSchoolClasses,
    questions,
    user,
    createdAt: moment(createdAt).format('DD.MM.YYYY HH:mm:ss'),

    getWorks () {
      return getAllWorks()
        .filter(work => work.taskUUID === uuid)
    },

    getSchoolClasses () {
      return forSchoolClasses.map(
        schoolClassUUID => findSchoolClass({ uuid: schoolClassUUID })
      )
    },

    setForSchoolClasses (forSchoolClasses) {
      updateTaskData(uuid, { forSchoolClasses })
      this.forSchoolClasses = forSchoolClasses
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
    user: user.uuid,
    createdAt: new Date().valueOf()
  }

  db.push('/tasks[]', task, true)

  return createTask(task)
}
