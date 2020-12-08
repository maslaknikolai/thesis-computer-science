import getCurrentUser from '../../../middlewares/getCurrentUser'
import { findTask } from '../../../models/Task'
import { storeWork } from '../../../models/Work'
import checkStudentAlreadySubmitWork from './checkStudentAlreadySubmitWork'

export default async function submitWork (req, res) {
  const student = await getCurrentUser(req)
  const task = findTask({ uuid: req.params.uuid })

  if (checkStudentAlreadySubmitWork(student, task)) {
    res.status(422)
    return res.json({
      message: 'Вы уже сдали эту работу'
    })
  }

  const work = storeWork({
    student,
    task,
    answers: req.body.answers,
    text: req.body.text
  })

  res.json({
    data: work
  })
}
