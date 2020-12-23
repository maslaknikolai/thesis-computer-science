import { findTask } from '@/models/Task'

export default function teacherTasks (req, res) {
  const task = findTask({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: task.uuid,
      name: task.name,
      forSchoolClasses: task.getSchoolClasses(),
      works: task.getWorks()
        .map(work => ({
          uuid: work.uuid,
          student: (() => {
            const student = work.getStudent()
            return {
              uuid: student.uuid,
              name: student.name,
              schoolClass: student.getSchoolClass()
            }
          })(),
          score: work.score
        }))
    }
  })
}
