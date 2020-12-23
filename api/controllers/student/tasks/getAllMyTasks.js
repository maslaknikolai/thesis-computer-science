import getCurrentUser from '../../../middlewares/getCurrentUser'
import { findWork } from '../../../models/Work'

export default async function getAllMyTasks (req, res) {
  const student = await getCurrentUser(req)

  res.json({
    data: student.getSchoolClass().getTasks()
      .map(task => ({
        ...task,
        work: findWork({
          studentUUID: student.uuid,
          taskUUID: task.uuid
        })
      }))
  })
}
