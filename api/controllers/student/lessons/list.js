import getCurrentUser from '@/middlewares/getCurrentUser'

export default async function list (req, res) {
  const student = await getCurrentUser(req)

  res.json({
    data: student.getLessons()
      .map(lesson => ({
        uuid: lesson.uuid,
        name: lesson.name,
        date: lesson.date,
        duration: lesson.duration,
        isCheckedIn: lesson.checkStudentCheckedIn(student.uuid)
      }))
  })
}
