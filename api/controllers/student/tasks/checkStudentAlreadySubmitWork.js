export default function checkStudentAlreadySubmitWork (student, task) {
  return student.works.some(work => work.taskUUID === task.uuid)
}
