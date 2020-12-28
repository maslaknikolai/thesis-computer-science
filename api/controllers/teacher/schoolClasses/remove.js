import { findSchoolClass } from '@/models/SchoolClass'

export default function remove (req, res) {
  const schoolClass = findSchoolClass({ uuid: req.params.uuid })
  schoolClass.remove()

  res.status(204).send()
}
