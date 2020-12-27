import { findTask } from '@/models/Task'

export default function show (req, res) {
  const task = findTask({ uuid: req.params.uuid })

  res.json({
    data: {
      uuid: task.uuid,
      name: task.name,
      file: task.file ? `/api/task-files/${task.file}` : task.file,
      type: task.type,
      forSchoolClasses: task.forSchoolClasses,
      questions: task.questions ? task.questions.map(taskQuestion => ({
        text: taskQuestion.text,
        isMultiple: taskQuestion.isMultiple,
        options: taskQuestion.options.map(taskQuestionOption => ({
          text: taskQuestionOption.text
        }))
      })) : null,
      user: task.user
    }
  })
}
