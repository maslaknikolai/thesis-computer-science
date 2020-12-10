import { findTask } from '../../../models/Task'
import getWork from '../../../repositories/getWork'

export default function allWorks (req, res) {
  const work = getWork(req.params.studentuuid, req.params.taskuuid)

  res.json({
    data: {
      taskUUID: work.taskUUID,
      text: work.text,
      answers: work.answers,
      score: work.score,

      student: work.student,
      task: findTask({ uuid: work.taskUUID })
    }
  })
}
