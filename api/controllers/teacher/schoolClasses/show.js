import { findSchoolClass } from '@/models/SchoolClass'

export default function show (req, res) {
  const schoolClass = findSchoolClass({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: schoolClass.uuid,
      name: schoolClass.name,
      students: schoolClass.getStudents().map(student => ({
        uuid: student.uuid,
        name: student.name
      })),
      tasks: schoolClass.getTasks().map(task => ({
        uuid: task.uuid,
        name: task.name
      }))
    }
  })
}
