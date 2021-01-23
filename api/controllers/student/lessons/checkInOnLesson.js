import getCurrentUser from '@/middlewares/getCurrentUser'
import { findLesson } from '@/models/Lesson'

export default async function checkInOnLesson (req, res) {
  const student = await getCurrentUser(req)
  const lesson = findLesson({ uuid: req.params.uuid })

  lesson.checkInStudent(student.uuid)

  res.status(204).send()
}
