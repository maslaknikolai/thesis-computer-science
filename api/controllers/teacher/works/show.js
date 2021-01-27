import { findWork } from '@/models/Work'

export default function show (req, res) {
  const work = findWork({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: work.uuid,
      taskUUID: work.taskUUID,
      text: work.text,
      answers: work.answers,
      score: work.score,
      createdAt: work.createdAt,
      student: (() => {
        const student = work.getStudent()
        return {
          uuid: student.uuid,
          name: student.name,
          schoolClass: (() => {
            const schoolClass = student.getSchoolClass()
            return {
              uuid: schoolClass.uuid,
              name: schoolClass.name
            }
          })()
        }
      })(),
      task: (() => {
        const task = work.getTask()
        return {
          uuid: task.uuid,
          name: task.name,
          file: task.file,
          type: task.type,
          questions: task.questions
        }
      })()
    }
  })
}
