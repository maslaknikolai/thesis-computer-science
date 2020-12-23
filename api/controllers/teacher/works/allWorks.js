import { getAllWorks } from '../../../models/Work'

export default function allWorks (req, res) {
  const works = getAllWorks()

  res.json({
    data: works.map((work) => {
      return {
        uuid: work.uuid,
        taskUUID: work.taskUUID,
        text: work.text,
        answers: work.answers,
        score: work.score,
        student: work.getStudent(),
        task: work.getTask()
      }
    })
  })
}
