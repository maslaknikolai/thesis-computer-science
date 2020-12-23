import { findWork } from '../../../models/Work'

export default function getWork (req, res) {
  const work = findWork({ uuid: req.params.workuuid })

  res.json({
    data: {
      uuid: work.uuid,
      taskUUID: work.taskUUID,
      text: work.text,
      answers: work.answers,
      score: work.score,
      student: work.getStudent(),
      task: work.getTask()
    }
  })
}
