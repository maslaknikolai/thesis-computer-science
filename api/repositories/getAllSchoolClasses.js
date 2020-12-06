import db from '../dbProvider'

export default function getAllSchoolClasses () {
  return [
    ...(new Set(
      db.getData('/users')
        .filter(user => user.type === 'student')
        .map(user => user.schoolClass)
    ))
  ]
}
