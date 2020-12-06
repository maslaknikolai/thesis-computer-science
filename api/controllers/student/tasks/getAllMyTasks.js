import getCurrentUser from '../../../middlewares/getCurrentUser'
import getStudentTasks from '../../../repositories/getStudentTasks'

export default async function getAllMyTasks (req, res) {
  const student = await getCurrentUser(req)

  res.json({
    data: getStudentTasks(student)
  })
}
