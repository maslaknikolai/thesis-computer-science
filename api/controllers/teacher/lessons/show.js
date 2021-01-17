import { findLesson } from '@/models/Lesson'

export default function show (req, res) {
  const lesson = findLesson({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: lesson.uuid,
      name: lesson.name,
      date: lesson.date,
      duration: lesson.duration,
      schoolClasses: lesson
        .getSchoolClasses()
        .map(schoolClass => ({
          uuid: schoolClass.uuid,
          name: schoolClass.name
        })),
      students: (() => {
        return lesson
          .getSchoolClasses()
          .reduce((acc, schoolClass) => {
            const students = schoolClass.getStudents()

            return [
              ...acc,
              ...students.map(student => ({
                uuid: student.uuid,
                name: student.name,
                schoolClass: {
                  uuid: schoolClass.uuid,
                  name: schoolClass.name
                },
                isPresent: lesson.checkStudentPresent(student.uuid)
              }))
            ]
          }, [])
      })()
    }
  })
}
