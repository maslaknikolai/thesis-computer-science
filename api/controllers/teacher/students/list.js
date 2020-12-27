import { allStudents } from '@/models/User'

export default function list (req, res) {
  const students = allStudents()

  res.json({
    data: students.map(student => ({
      uuid: student.uuid,
      name: student.name,
      login: student.login,
      schoolClass: (() => {
        const { uuid, name } = student.getSchoolClass()
        return {
          uuid,
          name
        }
      })()
    }))
  })
}
