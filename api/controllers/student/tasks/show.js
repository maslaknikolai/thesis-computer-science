import getCurrentUser from '../../../middlewares/getCurrentUser'
import getStudentTask from '../../../repositories/getStudentTask'
import createTaskResource from '../taskResource'

export default async function show (req, res) {
  const student = await getCurrentUser(req)
  const task = getStudentTask(req.params.uuid, student)

  res.json({
    data: createTaskResource(task)
  })
}
