import db from '../dbProvider'

export function createWork (data) {
  return {
    ...data
  }
}

export function storeWork ({
  student,
  task,
  answers,
  text
}) {
  const work = task.type === 'test'
    ? {
      taskUUID: task.uuid,
      answers,
      score: task.calculateTaskScore(answers)
    }
    : {
      taskUUID: task.uuid,
      text
    }

  const studentIndex = db.getIndex('/users', student.uuid, 'uuid')

  db.push(`/users[${studentIndex}]/works[]`, work, true)

  return createWork(work)
}
