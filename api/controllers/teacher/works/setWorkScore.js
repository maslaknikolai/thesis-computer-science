import { findWork } from '../../../models/Work'

export default function setWorkScore (req, res) {
  const work = findWork({ uuid: req.params.workuuid })

  work.setScore(req.body.score)

  res.json({
    data: {
      uuid: work.uuid,
      taskUUID: work.taskUUID,
      text: work.text,
      answers: work.answers,
      score: work.score,
      student: work.student,
      task: work.task
    }
  })
}
