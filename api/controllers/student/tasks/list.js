import { findWork } from '@/models/Work'
import getCurrentUser from '@/middlewares/getCurrentUser'

export default async function list (req, res) {
  const student = await getCurrentUser(req)

  res.json({
    data: student.getSchoolClass().getTasks()
      .map(task => ({
        uuid: task.uuid,
        type: task.type,
        name: task.name,
        score: (() => {
          const work = findWork({
            studentUUID: student.uuid,
            taskUUID: task.uuid
          })

          return work.score
        })()
      }))
  })
}
