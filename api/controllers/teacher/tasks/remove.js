import { findTask } from '@/models/Task'

export default function remove (req, res) {
  const task = findTask({ uuid: req.params.uuid })
  task.remove()

  res.status(204).send()
}
