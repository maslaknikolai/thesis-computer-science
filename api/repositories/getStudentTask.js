import createTask from '../models/Task'
import db from '../dbProvider'

export default function getStudentTask (uuid, student) {
  const task = db.getData('/tasks')
    .find(task => task.uuid === uuid && task.forSchoolClasses.includes(student.schoolClass))

  return task ? createTask(task) : task
}
