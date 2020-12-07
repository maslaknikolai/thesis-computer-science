import db from '../dbProvider'

export default function getStudentTasks (student) {
  return db.getData('/tasks')
    .filter(task => task.forSchoolClasses.includes(student.schoolClass))
}