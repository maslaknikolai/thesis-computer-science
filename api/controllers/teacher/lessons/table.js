import { allLessons } from '@/models/Lesson'

export default function table (req, res) {
  const lessons = allLessons()

  res.json({
    data: lessons.map(lesson => ({
      uuid: lesson.uuid,
      name: lesson.name,
      schoolClasses: lesson
        .getSchoolClasses()
        .map(schoolClass => ({
          uuid: schoolClass.uuid,
          name: schoolClass.name
        }))
    }))
  })
}
