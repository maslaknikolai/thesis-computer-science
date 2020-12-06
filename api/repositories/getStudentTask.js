import db from '../dbProvider'

export default function getStudentTask (uuid, student) {
  return db.getData('/tasks')
    .find(task => task.uuid === uuid && task.forSchoolClasses.includes(student.schoolClass))
}
