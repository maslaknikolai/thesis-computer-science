import { allSchoolClasses } from '../../../models/SchoolClass'

export default function fetchKnown (req, res) {
  const schoolClasses = allSchoolClasses()

  res.json({
    data: schoolClasses
  })
}
