import { allTasks } from '@/models/Task'

export default function teacherTasks (req, res) {
  const tasks = allTasks()

  res.json({
    data: tasks.map(task => ({
      uuid: task.uuid,
      name: task.name,
      createdAt: task.createdAt,
      isIndividual: task.isIndividual,
      forStudents: task.getForStudents().map(student => student.name),
      forSchoolClasses: task.getSchoolClasses().map(schoolClass => schoolClass.name)
    }))
  })
}
