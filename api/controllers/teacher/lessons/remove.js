import { findLesson } from '@/models/Lesson'

export default function remove (req, res) {
  const lesson = findLesson({ uuid: req.params.uuid })
  lesson.remove()

  res.status(204).send()
}
