import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import db from '../dbProvider'
import calculateTaskScore from '../utils/calculateTaskScore'
import { findTask } from './Task'
import { findUser } from './User'

function updateWorkData (workUUID, data) {
  const index = db.getIndex('/works', workUUID, 'uuid')
  let workRaw = db.getData(`/works[${index}]`)

  workRaw = { ...workRaw, ...data }

  db.push(`/works[${index}]`, workRaw, true)
}

export function createWork ({
  uuid,
  studentUUID,
  taskUUID,
  answers,
  text,
  score,
  createdAt
}) {
  return {
    uuid,
    studentUUID,
    taskUUID,
    answers,
    text,
    score,
    createdAt: moment(createdAt).format('DD.MM.YYYY HH:mm:ss'),

    getStudent () {
      return findUser({ uuid: studentUUID })
    },
    getTask () {
      return findTask({ uuid: taskUUID })
    },

    setScore (score) {
      updateWorkData(uuid, { score })
      this.score = score
    },

    remove () {
      const index = db.getIndex('/works', uuid, 'uuid')
      db.delete(`/works[${index}]`, true)
    }
  }
}

export function getAllWorks () {
  const works = db.getData('/works')
  return works.map(createWork)
}

export function storeWork ({
  student,
  task,
  answers,
  text
}) {
  const work = task.type === 'test'
    ? {
      uuid: uuidv4(),
      studentUUID: student.uuid,
      taskUUID: task.uuid,
      answers,
      score: calculateTaskScore(task, answers),
      createdAt: new Date().valueOf()
    }
    : {
      uuid: uuidv4(),
      studentUUID: student.uuid,
      taskUUID: task.uuid,
      text,
      score: null,
      createdAt: new Date().valueOf()
    }

  db.push('/works[]', work, true)

  return createWork(work)
}

export function findWork (data) {
  const works = db.getData('/works')
  const work = works.find((workItem) => {
    return Object.entries(data)
      .every(
        ([key, value]) => workItem[key] === value
      )
  })

  if (!work) {
    return false
  }

  return createWork(work)
}
