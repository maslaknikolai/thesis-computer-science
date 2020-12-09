import { findTask } from '../../../models/Task'
import getAllWorks from '../../../repositories/getAllWorks'

export default function allWorks (req, res) {
  const works = getAllWorks()

  res.json({
    data: works.map((work) => {
      return {
        taskUUID: work.taskUUID,
        text: work.text,
        answers: work.answers,
        score: work.score,

        student: work.student,
        task: findTask({ uuid: work.taskUUID })
      }
    })
  })
}
