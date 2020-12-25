import { getAllWorks } from '@/models/Work'

export default function allWorks (req, res) {
  const works = getAllWorks()

  res.json({
    data: works.map((work) => {
      return {
        uuid: work.uuid,
        score: work.score,
        student: (() => {
          const student = work.getStudent()
          return {
            uuid: student.uuid,
            name: student.name
          }
        })(),
        task: (() => {
          const task = work.getTask()
          return {
            uuid: task.uuid,
            name: task.name
          }
        })()
      }
    })
  })
}
