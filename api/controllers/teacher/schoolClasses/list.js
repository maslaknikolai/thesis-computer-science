import { allSchoolClasses } from '@/models/SchoolClass'

export default function list (req, res) {
  const schoolClasses = allSchoolClasses()

  res.json({
    data: schoolClasses.map(schoolClass => ({
      uuid: schoolClass.uuid,
      name: schoolClass.name,
      studentsCount: schoolClass.getStudents().length
    }))
  })
}
