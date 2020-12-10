import { createWork } from '../models/Work'
import { findUser } from '../models/User'

export default function getAllWorks (studentUUID, taskUUID) {
  const student = findUser({ uuid: studentUUID })

  const work = student.works.find(work => work.taskUUID === taskUUID)

  if (!work) {
    return null
  }

  return createWork({
    ...work,
    student
  })
}
