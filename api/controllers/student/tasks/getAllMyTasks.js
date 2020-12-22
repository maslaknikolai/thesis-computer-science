import getCurrentUser from '../../../middlewares/getCurrentUser'
import { findWork } from '../../../models/Work'
import getStudentTasks from '../../../repositories/getStudentTasks'

export default async function getAllMyTasks (req, res) {
  const student = await getCurrentUser(req)

  res.json({
    data: getStudentTasks(student)
      .map(task => ({
        ...task,
        work: findWork({
          studentUUID: student.uuid,
          taskUUID: task.uuid
        })
      }))
  })
}
