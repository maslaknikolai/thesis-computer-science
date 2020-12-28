import { findWork } from '@/models/Work'

export default function setWorkScore (req, res) {
  const work = findWork({ uuid: req.params.uuid })

  work.setScore(req.body.score)

  res.status(204).send()
}
