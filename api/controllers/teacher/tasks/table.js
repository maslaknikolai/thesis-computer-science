import { allTasks } from '@/models/Task'

export default function teacherTasks (req, res) {
  const tasks = allTasks()

  res.json({
    data: tasks.map(task => ({
      uuid: task.uuid,
      name: task.name,
      forSchoolClasses: task.getSchoolClasses().map(schoolClass => schoolClass.name)
    }))
  })
}
