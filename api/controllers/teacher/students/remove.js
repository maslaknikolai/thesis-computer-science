import { findUser } from '@/models/User'

export default function remove (req, res) {
  const student = findUser({ uuid: req.params.uuid })
  student.remove()

  res.status(204).send()
}
