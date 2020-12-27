import { findWork } from '@/models/Work'

export default function checkStudentAlreadySubmitWork (student, task) {
  const work = findWork({
    studentUUID: student.uuid,
    taskUUID: task.uuid
  })

  return !!work
}
