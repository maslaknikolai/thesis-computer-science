import { findTask } from '@/models/Task'
import createTaskResource from '../taskResource'

export default function show (req, res) {
  const task = findTask({ uuid: req.params.uuid })

  res.json({
    data: createTaskResource(task)
  })
}
