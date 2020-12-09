import createTaskQuestionResource from './taskQuestionResource'

export default function createTaskResource (task) {
  return {
    uuid: task.uuid,
    name: task.name,
    file: task.file ? `/files/${task.file}` : task.file,
    type: task.type,
    forSchoolClasses: task.forSchoolClasses,
    questions: task.questions ? task.questions.map(createTaskQuestionResource) : null,
    user: task.user
  }
}
